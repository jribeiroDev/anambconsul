import iconAguas from '../assets/icons/aguas.png';
import iconLegionella from '../assets/icons/legionella.png';
import iconControlo from '../assets/icons/controlo.png';
import iconAr from '../assets/icons/ar.png';

export const empresa = {
  nome: 'AnambConsul – Consultoria e Análises Ambientais, Lda',
  email: 'geral@anambconsul.pt',
  telefone: '+351 252 378 031',
  morada: ['Rua do Comércio, lote 30, nº 541', '4760-739 Vilarinho das Cambas', 'Vila Nova de Famalicão'],
  facebook: 'https://m.facebook.com/p/AnambConsul-Lda-100066604586596/',
  linkedin: 'https://pt.linkedin.com/company/anambconsul-lda',
  mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.0399109136006!2d-8.547848923440228!3d41.37321759687327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24599f2db8b5d9%3A0xf00060239aa9703a!2sAnambConsul%2C%20Consultoria%20e%20An%C3%A1lises%20Ambientais%2C%20Lda!5e0!3m2!1spt-PT!2spt!4v1707902258613!5m2!1spt-PT!2spt',
};

// Os 4 serviços principais: menu "Serviços" e cartões da página inicial
export const servicos = [
  {
    href: '/tratamento-de-aguas/',
    titulo: 'Tratamento de Águas',
    icon: iconAguas,
    resumo: 'Dimensionamento, instalação, arranque e manutenção de sistemas de tratamento para consumo humano, de processos industriais e de piscinas.',
  },
  {
    href: '/qualidade-do-ar-interior/',
    titulo: 'Qualidade do Ar Interior',
    icon: iconAr,
    resumo: 'Medição de Parâmetros Físico-Químicos e Microbiológicos no Ar. Avaliação Qualitativa dos Agentes Químicos nos Postos de Trabalho. Classificação de Salas Limpas.',
  },
  {
    href: '/prevencao-de-legionella/',
    titulo: 'Prevenção de Legionella',
    icon: iconLegionella,
    resumo: 'Realização de auditorias aos sistemas de distribuição de águas. Elaboração do Plano de Prevenção, de Riscos e de Monitorização/Controlo de Legionella.',
  },
  {
    href: '/controlo-remoto/',
    titulo: 'Controlo Remoto',
    icon: iconControlo,
    resumo: 'Monitorização remota de equipamentos. Ajuste de parâmetros de controladores. Geração de Alarmes. Envio de Alarmes por email e SMS. Análise de dados.',
  },
];

export const nav = [
  { href: '/about-us/', label: 'Sobre' },
  { href: '/contactos/', label: 'Contactos' },
];

export const assuntos = ['Qualidade do Ar Interior', 'Qualidade da Água', 'Legionella', 'Outro'];
