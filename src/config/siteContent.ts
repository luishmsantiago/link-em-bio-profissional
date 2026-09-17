import type { BioBlock } from '../types';

/**
 * ============================================================================
 *  CONTEÚDO DO SITE — EDITE TUDO POR AQUI
 * ============================================================================
 *  Este é o ÚNICO arquivo que você precisa alterar para trocar textos, fotos,
 *  vídeos, endereços, redes sociais e terapias exibidas na página.
 *
 *  Os demais arquivos apenas montam a interface a partir daqui.
 * ============================================================================
 */

/* ------------------------------------------------------------------ */
/*  Imagens de reserva (usadas quando uma imagem falha ao carregar)    */
/* ------------------------------------------------------------------ */
export const IMAGE_FALLBACK = '/images/logo_luis.png';
export const AVATAR_FALLBACK = '/images/avatar.jpg';
export const ABOUT_IMAGE_FALLBACK = '/images/sobre_eu.jpg';

/* ------------------------------------------------------------------ */
/*  Contato                                                            */
/* ------------------------------------------------------------------ */
export const CONTACT = {
  /** Somente números, com DDI + DDD.  */
  whatsappNumber: '5547999383804',
  email: 'drluisfisio@hotmail.com',
};

/** Monta um link do WhatsApp (com mensagem opcional já codificada). */
export function whatsappLink(message?: string, number: string = CONTACT.whatsappNumber): string {
  const digits = number.replace(/\D/g, '');
  return message
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${digits}`;
}

/* ------------------------------------------------------------------ */
/*  Perfil do profissional                                             */
/* ------------------------------------------------------------------ */
export const PROFILE = {
  name: 'Dr. Luis Henrique de Melo Santiago',
  /**
   * Trecho final do nome que deve aparecer numa segunda linha no cabeçalho.
   * Deixe '' (string vazia) para exibir o nome inteiro numa linha só.
   */
  nameSecondLine: 'Melo Santiago',

  specialty: 'Fisioterapeuta',
  /** Número do conselho (aparece como "CREFITO 10 <valor>"). */
  crefito: '250684-F',

  bio: 'Profissional renomado com ampla experiência, focado em diagnósticos precisos e tratamentos humanizados para sua saúde e bem-estar.',

  avatarUrl: '/images/avatar.jpg',
  aboutImageUrl: '/images/sobre_eu.jpg',

  /** Texto completo da página "Sobre meu trabalho" (use \n\n para parágrafos). */
  aboutText:
    'Olá! Sou o Dr. Luis Henrique de Melo Santiago, fisioterapeuta especializado em reabilitação física, alívio de dores e melhoria da qualidade de vida.\n\n' +
    'Atuo com uma abordagem humanizada e tratamentos personalizados para cada paciente, unindo técnicas fisioterapêuticas avançadas e acompanhamento contínuo.\n\n' +
    'Meu objetivo principal é restaurar sua mobilidade, tratar a causa das suas dores e garantir que você retome suas atividades diárias com conforto e segurança.',

  /** Tema visual inicial (veja as chaves em THEMES, no defaultBioData.ts). */
  theme: 'dark-navy' as const,

  footerText: 'Obrigado por sua visita!',
  footerBrand: 'LDue',
  footerBrandUrl: 'https://ldue.app',

  /** Redes sociais — deixe '' para esconder o ícone. */
  socials: {
    instagram: 'https://instagram.com/dr.luishenriquesantiago',
    facebook: 'https://facebook.com/DR.LUISHENRIQUESANTIAGO/',
    linkedin: '',
    twitter: '',
    youtube: '',
    whatsapp: whatsappLink(),
    email: CONTACT.email,
  },
};

/* ------------------------------------------------------------------ */
/*  Terapias                                                           */
/*  Uma única lista alimenta o carrossel de terapias E o carrossel     */
/*  de vídeos.                                                         */
/* ------------------------------------------------------------------ */
export interface Therapy {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
}

export const THERAPIES: Therapy[] = [
  {
    id: 'microfisioterapia',
    title: 'Microfisioterapia',
    description:
      'Técnica de terapia manual desenvolvida na França que identifica e trata a causa primária de sintomas físicos e emocionais por meio de palpações suaves na pele.',
    imageUrl: '/images/microfisio.jpeg',
    videoUrl: '/videos/microfisio.mp4',
  },
  {
    id: 'tecnicas-osteopaticas',
    title: 'Técnicas Osteopáticas',
    description:
      'Sistema de avaliação e tratamento manual focado no alinhamento postural, mobilidade articular e reequilíbrio global do organismo para alívio de dores.',
    imageUrl: '/images/osteo.png',
    videoUrl: '/videos/osteo.mp4',
  },
  {
    id: 'terapia-manual',
    title: 'Terapia Manual',
    description:
      'Conjunto de técnicas especializadas com as mãos direcionadas ao alívio de dores musculares, liberação miofascial e recuperação funcional dos movimentos.',
    imageUrl: '/images/terapia_manual.jpeg',
    videoUrl: '/videos/terapia_manual.mp4',
  },
  {
    id: 'dnm',
    title: 'Dermoneuromodulação (DNM)',
    description:
      'Método terapêutico não invasivo focado na modulação do sistema nervoso através da pele para redução imediata e duradoura de dores agudas e crônicas.',
    imageUrl: '/images/dmn.jpeg',
    videoUrl: '/videos/dnm.mp4',
  },
];

type CarouselItem = NonNullable<BioBlock['carouselItems']>[number];
type VideoItem = NonNullable<BioBlock['videoItems']>[number];

/** Itens do carrossel de terapias (imagem + descrição). */
export const therapyCarouselItems = (): CarouselItem[] =>
  THERAPIES.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    imageUrl: t.imageUrl,
  }));

/** Itens do carrossel de vídeos (usa a foto da terapia como capa). */
export const therapyVideoItems = (): VideoItem[] =>
  THERAPIES.map((t) => ({
    id: t.id,
    title: t.title,
    videoUrl: t.videoUrl,
    videoThumbnailUrl: t.imageUrl,
  }));

/* ------------------------------------------------------------------ */
/*  Localizações (mapa)                                                */
/* ------------------------------------------------------------------ */
export interface SiteLocation {
  name: string;
  address: string;
  embedUrl: string;
  mapsUrl: string;
}

export const LOCATIONS: SiteLocation[] = [
  {
    name: 'Balneário Camboriú',
    address: 'R. 3000, 265 - Sl 05 - Centro, Balneário Camboriú - SC',
    embedUrl:
      'https://maps.google.com/maps?q=R.%203000%2C%20265%20-%20Sl%2005%20-%20Centro%2C%20Balne%C3%A1rio%20Cambori%C3%BA%20-%20SC&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=R.+3000,+265+-+Sl+05+-+Centro,+Balne%C3%A1rio+Cambori%C3%BA+-+SC',
  },
  {
    name: 'Balneário Piçarras',
    address: 'R. 230, 273 - Centro, Balneário Piçarras - SC',
    embedUrl:
      'https://maps.google.com/maps?q=R.%20230%2C%20273%20-%20Centro%2C%20Balne%C3%A1rio%20Pi%C3%A7arras%20-%20SC&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=R.+230,+273+-+Centro,+Balne%C3%A1rio+Pi%C3%A7arras+-+SC',
  },
];

/* ------------------------------------------------------------------ */
/*  Galeria de fotos                                                   */
/* ------------------------------------------------------------------ */
export const GALLERY_IMAGES = [
  { id: 'g1', url: '/gallery/avlombar.jpeg', caption: 'Avaliação da coluna lombar' },
  { id: 'g2', url: '/gallery/avombro.png', caption: 'Avaliação do ombro' },
  { id: 'g3', url: '/gallery/avpelvesacro.jpeg', caption: 'Avaliação da função do sacro e da pelve' },
  { id: 'g4', url: '/gallery/avtorax.png', caption: 'Avaliação da coluna torácica' },
  { id: 'g5', url: '/gallery/mobfigado.jpeg', caption: 'Mobilização do fígado' },
  { id: 'g6', url: '/gallery/mobintestinos.jpeg', caption: 'Mobilização dos intestinos' },
];

/* ------------------------------------------------------------------ */
/*  Modal de agendamento                                               */
/* ------------------------------------------------------------------ */
export const APPOINTMENT_SERVICES = [
  { value: 'Fisioterapia', label: 'Fisioterapia Manual' },
  { value: 'Osteopatia', label: 'Atendimento de Osteopatia' },
  { value: '<Microfisioterapia>', label: 'Atendimento de Microfisioterapia' },
];

