# AnambConsul – site

Site estático em [Astro](https://astro.build) + Tailwind CSS, servido por um Cloudflare Worker (static assets). O Worker só trata `POST /api/contact` (formulário de contacto e questionário PPL → email via [Resend](https://resend.com), protegido por Cloudflare Turnstile).

## Desenvolvimento

```bash
npm install
npm run dev        # Astro em http://localhost:4321 (formulários não enviam)
npm run preview    # build + wrangler dev em http://localhost:8787 (site + Worker)
npm test           # validação dos formulários
```

Para `npm run preview`, copiar `.dev.vars.example` para `.dev.vars` (chaves de teste).

## Estrutura

- `src/content/servicos/*.md` – páginas de serviço (texto em Markdown; `cards`, `banner` e `cta` no frontmatter)
- `src/pages/politica-*.md` – textos legais
- `src/data/site.ts` – contactos, menu, serviços da página inicial
- `src/data/forms.ts` – campos dos formulários (usado pelas páginas **e** pela validação no Worker)
- `src/assets/clientes/` – logótipos de clientes (adicionar ficheiro + nome em `ClientLogos.astro`)
- `worker/index.ts` – endpoint `/api/contact`

## Deploy (Cloudflare Workers)

1. **Turnstile**: Cloudflare dashboard → Turnstile → criar widget (hostnames: `anambconsul.<subdominio>.workers.dev` e mais tarde `anambconsul.pt`, `www.anambconsul.pt`).
2. **Resend**: criar conta, verificar o domínio `anambconsul.pt` (registos SPF/DKIM no DNS atual) e criar uma API key.
   Até o domínio estar verificado, pôr `MAIL_FROM` = `onboarding@resend.dev` em `wrangler.jsonc` (só entrega ao email da conta Resend).
3. Secrets do Worker:
   ```bash
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put TURNSTILE_SECRET
   ```
4. Variáveis de build (`.env` local ou *Build variables* no Workers Builds): `PUBLIC_TURNSTILE_SITE_KEY` e, opcionalmente, `PUBLIC_CF_ANALYTICS_TOKEN` (Cloudflare → Web Analytics → adicionar site).
5. Deploy manual: `npm run deploy`. Ou ligar o repositório GitHub em *Workers & Pages → anambconsul → Settings → Builds* (build: `npm run build`, deploy: `npx wrangler deploy`).

## Migração do domínio (depois de validar em workers.dev)

1. Adicionar `anambconsul.pt` à Cloudflare e **recriar os registos MX/email existentes antes** de mudar os nameservers.
2. Worker → *Settings → Domains & Routes* → Custom Domain `anambconsul.pt` e `www.anambconsul.pt` (+ Redirect Rule de um para o outro).
3. Redirects 301 para URLs antigas sem equivalente (`/noticias/*`, slugs dos artigos, `/feed/`) → `/` via Redirect Rules.
4. Submeter `https://www.anambconsul.pt/sitemap-index.xml` na Google Search Console.
