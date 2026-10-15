import { describe, expect, it } from 'vitest';
import { validate } from './forms';

const contacto = { nome: ['Ana'], email: ['ana@exemplo.pt'], assunto: ['Legionella'], mensagem: ['Olá'] };

describe('validate', () => {
  it('aceita um contacto válido e gera o email', () => {
    const r = validate('contacto', contacto);
    expect(r.errors).toBeUndefined();
    expect(r.subject).toBe('Contacto pelo site – Ana');
    expect(r.replyTo).toBe('ana@exemplo.pt');
    expect(r.text).toContain('Mensagem\nOlá');
  });

  it('rejeita formulário desconhecido, campos em falta, email inválido e opções fora da lista', () => {
    expect(validate('outro', contacto).errors).toHaveLength(1);
    expect(validate('contacto', { ...contacto, mensagem: [' '] }).errors).toEqual(['Mensagem: campo obrigatório.']);
    expect(validate('contacto', { ...contacto, email: ['x@'] }).errors).toEqual(['E-mail: endereço inválido.']);
    expect(validate('contacto', { ...contacto, assunto: ['Spam'] }).errors).toEqual(['Assunto: opção inválida.']);
    expect(validate('contacto', { ...contacto, nome: ['a'.repeat(301)] }).errors).toEqual(['Nome: texto demasiado longo.']);
  });

  it('PPL: campos condicionais só são obrigatórios quando visíveis', () => {
    const base = {
      nome: ['Ana'], morada: ['Rua X'], telefone: ['912345678'], email: ['ana@exemplo.pt'],
      origem: ['Rede Pública'], reservatorios: ['Não'], aqs: ['Não'], rega: ['Não'], incendios: ['Não'], avac: ['Não'], aerossois: ['Não'],
    };
    expect(validate('ppl', base).errors).toBeUndefined();
    // resposta "Sim" torna obrigatórios os campos dependentes
    expect(validate('ppl', { ...base, reservatorios: ['Sim'] }).errors).toEqual([
      'Qual a localização do(s) reservatório(s)?: campo obrigatório.',
      'Quantos reservatórios?: campo obrigatório.',
    ]);
    // campos de secções escondidas são ignorados no email
    const r = validate('ppl', { ...base, reservatorios_local: ['cave'] });
    expect(r.text).not.toContain('cave');
    // checkbox com várias opções
    const avac = validate('ppl', { ...base, avac: ['Sim'], avac_tipos: ['UTA', 'UTAN'], torres: ['Não'] });
    expect(avac.text).toContain('UTA, UTAN');
  });
});
