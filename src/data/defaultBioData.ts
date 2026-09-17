import { BioBlock, ProfileData, ThemeConfig } from '../types';
import {
  PROFILE,
  GALLERY_IMAGES,
  therapyCarouselItems,
  therapyVideoItems,
  LOCATIONS,
  whatsappLink,
} from '../config/siteContent';

/**
 * Perfil e blocos iniciais.
 * Todo o conteúdo vem de src/config/siteContent.ts — não edite valores aqui.
 */
export const INITIAL_PROFILE: ProfileData = {
  name: PROFILE.name,
  specialty: PROFILE.specialty,
  crefito: PROFILE.crefito,
  bio: PROFILE.bio,
  avatarUrl: PROFILE.avatarUrl,
  socials: PROFILE.socials,
  theme: PROFILE.theme,
  footerText: PROFILE.footerText,
  footerBrand: PROFILE.footerBrand,
  footerBrandUrl: PROFILE.footerBrandUrl,
  aboutText: PROFILE.aboutText,
  aboutImageUrl: PROFILE.aboutImageUrl,
};

export const INITIAL_BLOCKS: BioBlock[] = [
  {
    id: 'sb1',
    type: 'LINK_IMAGE',
    enabled: true,
    title: 'Sobre meu trabalho',
    subtitle: 'Conheça minha trajetória, especialização e atendimento',
    url: '#sobre_mim',
    imageUrl: PROFILE.aboutImageUrl,
  },
  {
    id: 'sb2',
    type: 'LINK_IMAGE',
    enabled: true,
    title: 'Meu Site Oficial (em construção)',
    subtitle: 'Acesse drluisfisio.vercel.app',
    url: 'https://drluisfisio.vercel.app',
    imageUrl: '/images/logo_luis.png',
  },
  {
    id: 'sb5',
    type: 'LARGE_HIGHLIGHT',
    enabled: true,
    title: 'Terapias',
    carouselItems: therapyCarouselItems(),
  },
  {
    id: 'sb6',
    type: 'MIXED_LIST',
    enabled: true,
    title: 'Fisioterapia Integrativa',
    subtitle: 'Anos estudando sobre o corpo de maneira integral. Como o intestino influencia a mente, como dores afetam as emoções ou como órgãos influenciam nas articulações. Essas e muitas outras associações são analisadas nas minhas consultas.',
    imageUrl: '/images/saude_integral.jpg',
    buttonText: 'Acessar',
    url: '#diferencial',
  },
  {
    id: 'sb8',
    type: 'LOCATION_MAP',
    enabled: true,
    title: 'Localização',
    mapAddress: LOCATIONS.map((l) => l.name).join(' e '),
  },
  {
    id: 'sb9',
    type: 'FEATURED_VIDEO',
    enabled: true,
    title: 'Terapias em Vídeo',
    videoItems: therapyVideoItems(),
  },
  {
    id: 'sb12',
    type: 'WHATSAPP_CARD',
    enabled: true,
    title: 'Fale Comigo',
    subtitle: 'Atendimento via WhatsApp',
    url: whatsappLink('Olá, gostaria de agendar uma consulta'),
  },
  {
    id: 'sb13',
    type: 'PHOTO_GALLERY',
    enabled: true,
    title: 'Galeria de Fotos',
    subtitle: 'Com fotos de seus profissionais ou seu lugar de atendimento',
    galleryImages: GALLERY_IMAGES,
  },
  {
    id: 'sb15',
    type: 'PRO_TITLE',
    enabled: true,
    title: 'Título Especial',
  },
  {
    id: 'sb16',
    type: 'PRO_TEXT',
    enabled: true,
    title: 'Sobre mim',
    subtitle: 'Formado em Fisioterapia pela Universidade do Vale do Itajaí em 2016. Experiência abrangente em prevenção, diagnóstico e tratamento nas diversas áreas da fisioterapia. Diversas formações em Microfisioterapia e terapias integrativas, com foco no alívio de dores musculoesqueléticas, melhoria das funções viscerais e neurais, além de suporte emocional. Já atuem em APAE no tratamento neurofuncional, voltado a melhoria da qualidade de vida de pessoas com deficiências físicas, intelectuais e Transtorno do Espectro Autista (TEA). Atualmente, trabalho de forma autônoma em várias clínicas parceiras da região, utilizando as técnicas Microfisioterapia, Osteopatia e outras abordagens manuais para tratar casos  pediátricos, ortopédicos e com queixas emocionais.',
  },
  {
    id: 'sb17',
    type: 'PRO_TEXT',
    enabled: true,
    title: 'Formações',
    subtitle: `• Pós-graduação em Osteopatia Clínica Integrada – Faculdade Inspirar
• Formação sobre Transtorno de Espectro Autista – Fundação Catarinense de Educação Especial (EAD) 
• Formações em Microfisioterapia (P1 ao PI e MKE) – Instituto Salgado de Saúde Integral em Londrina (PR)
• Formação em Fisioterapia Integrativa (Módulos online e presencial) – Instituto Salgado de Saúde Integral
• Workshop Internacional em de Introdução a Biodecodage – Instituto Cintia Chiarelli
• Curso de DNM – Dermoneuromodulação e Neurociência da Dor – Instituto Salgado de Saúde Integral (PR)
• SMT-1: High Velocity Low-Amplitude Thrust Manipulation of Cervical, Thoracic, Lumbar & SI Joint (Curso Internacional: Formação em Técnicas Manipulativas na Coluna Vertebral – Thrust) – Faculdade Inspirar em Balneário Camboriú (SC)
• Formação em Reiki (níveis 1, 2 e 3) – Facilitadora: Cleusa Regina Berndt Cruz
• Drenagem linfática – Instituto Fisiomar em Itajaí (SC)`,
  },
  {
    id: 'sb18',
    type: 'DIVIDER',
    enabled: true,
  },
  {
    id: 'sb23',
    type: 'APPOINTMENT_DETAILS',
    enabled: true,
    title: 'Detalhes Gerais',
    appointmentBadges: ['Particular', 'Atendimento Individualizado', 'Pacote de tratamento', 'Fisioterapia Integrativa', 'Técnicas manuais e osteopáticas', 'Microfisioterapia'],
    appointmentButtonText: 'Agendar Horário',
  },
];

export const THEMES: Record<string, ThemeConfig> = {
  'dark-navy': {
    id: 'dark-navy',
    name: 'LDue Escuro (Original)',
    bgClass: 'bg-[#060b17]',
    cardBg: 'bg-[#0b1428]',
    cardBorder: 'border-slate-800/80 hover:border-slate-700',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    accentColor: '#38bdf8', // sky blue
    buttonBg: 'bg-[#38bdf8]',
    buttonText: 'text-white',
  },
  'clean-medical': {
    id: 'clean-medical',
    name: 'Clínica Clean (Claro)',
    bgClass: 'bg-slate-50',
    cardBg: 'bg-white',
    cardBorder: 'border-slate-200 shadow-sm hover:border-teal-300',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    accentColor: '#0d9488', // teal-600
    buttonBg: 'bg-teal-600',
    buttonText: 'text-white',
  },
  'emerald-health': {
    id: 'emerald-health',
    name: 'Verde Esmeralda',
    bgClass: 'bg-[#021d17]',
    cardBg: 'bg-[#072c23]',
    cardBorder: 'border-emerald-800/60 hover:border-emerald-600',
    textPrimary: 'text-emerald-50',
    textSecondary: 'text-emerald-200/80',
    accentColor: '#10b981',
    buttonBg: 'bg-emerald-500',
    buttonText: 'text-white',
  },
  'luxury-gold': {
    id: 'luxury-gold',
    name: 'Luxo Premium (Ouro)',
    bgClass: 'bg-[#121212]',
    cardBg: 'bg-[#1e1e1e]',
    cardBorder: 'border-amber-900/40 hover:border-amber-500/50',
    textPrimary: 'text-amber-100',
    textSecondary: 'text-amber-200/70',
    accentColor: '#f59e0b',
    buttonBg: 'bg-amber-500',
    buttonText: 'text-stone-950',
  },
  'minimal-dusk': {
    id: 'minimal-dusk',
    name: 'Minimal Indigo',
    bgClass: 'bg-slate-900',
    cardBg: 'bg-slate-800/90',
    cardBorder: 'border-indigo-900/50 hover:border-indigo-500/50',
    textPrimary: 'text-indigo-50',
    textSecondary: 'text-slate-300',
    accentColor: '#6366f1',
    buttonBg: 'bg-indigo-600',
    buttonText: 'text-white',
  },
};
