// Definição única dos formulários: usada pelas páginas (render) e pelo Worker (validação).

export type Field = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox';
  required?: boolean;
  options?: string[];
  // campo condicional: só aparece / só é obrigatório quando outro campo tem este valor
  showIf?: { field: string; value: string };
};

export type Section = { title: string; fields: Field[] };

const simNao = ['Sim', 'Não'];
const origens = ['Rede Pública', 'Subterrânea (Poço, Furo ou Mina)', 'Outra'];

export const contactoFields: Field[] = [
  { name: 'nome', label: 'Nome', type: 'text', required: true },
  { name: 'email', label: 'E-mail', type: 'email', required: true },
  { name: 'assunto', label: 'Assunto', type: 'select', required: true, options: ['Qualidade do Ar Interior', 'Qualidade da Água', 'Legionella', 'Outro'] },
  { name: 'mensagem', label: 'Mensagem', type: 'textarea', required: true },
];

export const pplSections: Section[] = [
  {
    title: 'Identificação',
    fields: [
      { name: 'nome', label: 'Nome', type: 'text', required: true },
      { name: 'morada', label: 'Morada da Intervenção', type: 'text', required: true },
      { name: 'telefone', label: 'Contacto Telefónico', type: 'tel', required: true },
      { name: 'email', label: 'E-mail', type: 'email', required: true },
      { name: 'observacoes', label: 'Observações Úteis', type: 'textarea' },
    ],
  },
  {
    title: 'Origem da água e reservatórios',
    fields: [
      { name: 'origem', label: 'Origem da Água', type: 'radio', required: true, options: ['Rede Pública', 'Subterrânea (Poço, Furo ou Mina)', 'Outro'] },
      { name: 'reservatorios', label: 'Tem reservatórios de água fria?', type: 'radio', required: true, options: simNao },
      { name: 'reservatorios_local', label: 'Qual a localização do(s) reservatório(s)?', type: 'text', required: true, showIf: { field: 'reservatorios', value: 'Sim' } },
      { name: 'reservatorios_qtd', label: 'Quantos reservatórios?', type: 'text', required: true, showIf: { field: 'reservatorios', value: 'Sim' } },
    ],
  },
  {
    title: 'Águas Quentes Sanitárias (AQS)',
    fields: [
      { name: 'aqs', label: 'Tem Águas Quentes Sanitárias (AQS)?', type: 'radio', required: true, options: simNao },
      { name: 'balnearios', label: 'Tem Balneários?', type: 'radio', required: true, options: simNao, showIf: { field: 'aqs', value: 'Sim' } },
      { name: 'balnearios_qtd', label: 'Quantos balneários existem? E quantos chuveiros existem por balneário?', type: 'text', required: true, showIf: { field: 'balnearios', value: 'Sim' } },
      { name: 'termoacumuladores', label: 'Tem Termoacumuladores ou Depósitos de Água Quente?', type: 'radio', required: true, options: simNao, showIf: { field: 'aqs', value: 'Sim' } },
      { name: 'termoacumuladores_qtd', label: 'Quantos termoacumuladores ou depósitos?', type: 'text', required: true, showIf: { field: 'termoacumuladores', value: 'Sim' } },
    ],
  },
  {
    title: 'Rega',
    fields: [
      { name: 'rega', label: 'Tem sistema de Rega?', type: 'radio', required: true, options: simNao },
      { name: 'rega_tipo', label: 'Qual o tipo de Rega?', type: 'radio', required: true, options: ['Aspersão', 'Gota a Gota', 'Outra'], showIf: { field: 'rega', value: 'Sim' } },
      { name: 'rega_tipo_outra', label: 'Qual?', type: 'text', required: true, showIf: { field: 'rega_tipo', value: 'Outra' } },
      { name: 'rega_origem', label: 'Qual a Origem da Água da rega?', type: 'radio', required: true, options: origens, showIf: { field: 'rega', value: 'Sim' } },
    ],
  },
  {
    title: 'Rede de Incêndios',
    fields: [
      { name: 'incendios', label: 'Tem rede de Incêndios?', type: 'radio', required: true, options: simNao },
      { name: 'incendios_origem', label: 'Qual a Origem da Água da rede de incêndios?', type: 'radio', required: true, options: origens, showIf: { field: 'incendios', value: 'Sim' } },
      { name: 'incendios_qtd', label: 'Quantos Carretéis e Hidrantes?', type: 'text', required: true, showIf: { field: 'incendios', value: 'Sim' } },
    ],
  },
  {
    title: 'Climatização (AVAC)',
    fields: [
      { name: 'avac', label: 'Tem sistemas de condicionamento do ar? (AVAC)', type: 'radio', required: true, options: simNao },
      { name: 'avac_tipos', label: 'Quais os tipos de sistemas existentes?', type: 'checkbox', options: ['Ar Condicionado', 'Humidificadores', 'UTA', 'UTAN', 'Outros'], showIf: { field: 'avac', value: 'Sim' } },
      { name: 'torres', label: 'Tem Torres de Arrefecimento?', type: 'radio', required: true, options: simNao, showIf: { field: 'avac', value: 'Sim' } },
      { name: 'torres_origem', label: 'Qual a Origem da Água das torres?', type: 'radio', required: true, options: origens, showIf: { field: 'torres', value: 'Sim' } },
      { name: 'torres_qtd', label: 'Quantos circuitos ou torres existem?', type: 'text', required: true, showIf: { field: 'torres', value: 'Sim' } },
    ],
  },
  {
    title: 'Outros sistemas',
    fields: [
      { name: 'aerossois', label: 'Existem outros sistemas que possam produzir aerossóis?', type: 'radio', required: true, options: simNao },
      { name: 'aerossois_quais', label: 'Quais?', type: 'text', required: true, showIf: { field: 'aerossois', value: 'Sim' } },
    ],
  },
];

export const forms = {
  contacto: { subject: 'Contacto pelo site', fields: contactoFields },
  ppl: { subject: 'Questionário PPL (Legionella)', fields: pplSections.flatMap((s) => s.fields) },
} as const;

export type FormId = keyof typeof forms;

const MAX = { textarea: 5000, other: 300 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Data = Record<string, string[]>;

const visible = (f: Field, data: Data) => !f.showIf || (data[f.showIf.field] ?? []).includes(f.showIf.value);

/** Valida os dados submetidos. Devolve erros ou as linhas do email (só campos visíveis e conhecidos). */
export function validate(id: string, data: Data) {
  if (!(id in forms)) return { errors: ['Formulário desconhecido.'] };
  const form = forms[id as FormId];
  const errors: string[] = [];
  const lines: string[] = [];
  for (const f of form.fields) {
    if (!visible(f, data)) continue;
    const values = (data[f.name] ?? []).map((v) => v.trim()).filter(Boolean);
    if (!values.length) {
      if (f.required) errors.push(`${f.label}: campo obrigatório.`);
      continue;
    }
    const max = f.type === 'textarea' ? MAX.textarea : MAX.other;
    if (values.some((v) => v.length > max)) errors.push(`${f.label}: texto demasiado longo.`);
    if (f.type === 'email' && !EMAIL_RE.test(values[0])) errors.push(`${f.label}: endereço inválido.`);
    if (f.options && values.some((v) => !f.options!.includes(v))) errors.push(`${f.label}: opção inválida.`);
    lines.push(`${f.label}\n${values.join(', ')}\n`);
  }
  if (errors.length) return { errors };
  const nome = (data.nome?.[0] ?? '').replace(/\s+/g, ' ').trim();
  return { subject: `${form.subject} – ${nome}`, replyTo: data.email?.[0]?.trim(), text: lines.join('\n') };
}
