import { validate } from '../src/data/forms';

interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY: string;
  TURNSTILE_SECRET: string;
  MAIL_TO: string;
  MAIL_FROM: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== '/api/contact') return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return errorPage(['Pedido inválido.']);
    }

    const ok = await verifyTurnstile(form.get('cf-turnstile-response'), request.headers.get('CF-Connecting-IP'), env.TURNSTILE_SECRET);
    if (!ok) return errorPage(['Falhou a verificação anti-spam. Atualize a página e tente novamente.']);

    const data: Record<string, string[]> = {};
    for (const [k, v] of form) if (typeof v === 'string') (data[k] ??= []).push(v);

    const result = validate(String(form.get('form') ?? ''), data);
    if ('errors' in result && result.errors) return errorPage(result.errors);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: env.MAIL_FROM, to: [env.MAIL_TO], reply_to: result.replyTo, subject: result.subject, text: result.text }),
    });
    if (!res.ok) {
      console.error('Resend', res.status, await res.text());
      return errorPage([`Não foi possível enviar a mensagem. Tente novamente ou contacte-nos por email (${env.MAIL_TO}).`], 502);
    }
    return Response.redirect(new URL('/obrigado/', url).toString(), 303);
  },
} satisfies ExportedHandler<Env>;

async function verifyTurnstile(token: File | string | null, ip: string | null, secret: string) {
  if (typeof token !== 'string' || !token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const json = (await res.json()) as { success: boolean };
  return json.success === true;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function errorPage(errors: string[], status = 400) {
  const html = `<!doctype html><html lang="pt-PT"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Erro no envio – AnambConsul</title>
<body style="font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem;line-height:1.5">
<h1>Não foi possível enviar</h1><ul>${errors.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
<p><a href="javascript:history.back()">← Voltar ao formulário</a></p></body></html>`;
  return new Response(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}
