/**
 * Configurações globais do site.
 * Único lugar onde dados de contato, navegação e metadados devem ser alterados.
 */

export const site = {
  name: 'Gavie',
  tagline: 'Camisetas femininas com caimento leve e acabamento cuidadoso.',
  description:
    'Gavie — camisetas e regatas femininas com caimento leve e acabamento cuidadoso. Loja física em Goiânia e envio para todo o Brasil.',
  url: 'https://gavie.com.br',
  locale: 'pt-BR',

  // TODO: substituir pelo número real da loja (formato internacional, só dígitos).
  whatsapp: '5562000000000',

  address: {
    street: 'R. 67-A, Setor Norte Ferroviário',
    complement: 'Galeria Via Goiânia, Loja A-14',
    city: 'Goiânia',
    state: 'GO',
    zip: '74063-321',
  },

  nav: [
    { label: 'Coleção', href: '#colecao' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ],

  marquee: [
    'Camisetas femininas',
    'Caimento leve e impecável',
    'Feito com cuidado',
    'Envio para todo o Brasil',
  ],

  hero: {
    title: 'Gavie',
    subtitle:
      'Peças leves, femininas e cheias de detalhes para fazer parte dos seus dias',
    highlight: 'Feita para acompanhar você.',
    image: 'hero',
    alt: 'Modelo usando regata Gavie em ambiente com luz natural',
  },

  about: {
    title: 'Do seu jeito',
    text: 'Acreditamos que se vestir é também uma forma de se expressar. Por isso, criamos uma seleção que acompanha sua rotina, seus momentos e, principalmente, quem você é.',
    cta: 'Fale com a gente',
    image: 'sobre',
    alt: 'Cliente segurando sacolas da Gavie na loja',
    // object-position vertical extraído do enquadramento do Figma
    focus: '41%',
  },

  footer: {
    columns: [
      {
        title: 'Loja',
        links: [
          { label: 'Coleção', href: '#colecao' },
          { label: 'Sobre nós', href: '#sobre' },
        ],
      },
      {
        title: 'Ajuda',
        links: [
          { label: 'Falar no WhatsApp', href: '{{whatsapp}}', external: true },
          { label: 'Guia de tamanhos', action: 'size-guide' },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Gavie. Todos os direitos reservados.`,
  },
};

/** Monta um link wa.me com mensagem pré-preenchida. */
export function whatsappLink(message) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
