export type BlockType =
  | 'LINK_ICON'
  | 'LINK_IMAGE'
  | 'GRID_CARDS'
  | 'LARGE_HIGHLIGHT'
  | 'MIXED_LIST'
  | 'SERVICES_LIST'
  | 'SERVICES_ICONS'
  | 'SERVICES_IMAGES'
  | 'LOCATION_MAP'
  | 'FEATURED_VIDEO'
  | 'BUTTON_BAR'
  | 'SINGLE_BUTTON'
  | 'WHATSAPP_CARD'
  | 'PHOTO_GALLERY'
  | 'PRO_TITLE'
  | 'PRO_TEXT'
  | 'DIVIDER'
  | 'APPOINTMENT_DETAILS';

export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  whatsapp?: string;
  email?: string;
  youtube?: string;
}

export interface ProfileData {
  name: string;
  specialty: string;
  crefito: string;
  bio: string;
  avatarUrl: string;
  socials: SocialLinks;
  theme: 'dark-navy' | 'clean-medical' | 'luxury-gold' | 'minimal-dusk' | 'emerald-health';
  footerText: string;
  footerBrand: string;
  footerBrandUrl: string;
  aboutText?: string;
  aboutImageUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  imageUrl?: string;
}

export interface BioBlock {
  id: string;
  type: BlockType;
  enabled: boolean;
  title?: string;
  subtitle?: string;
  text?: string;
  url?: string;
  iconName?: string;
  imageUrl?: string;
  buttonText?: string;
  secondaryButtonText?: string;
  secondaryUrl?: string;
  badgeAccentColor?: string;
  
  // Specific data structures for complex blocks
  gridItems?: {
    id: string;
    title: string;
    subtitle: string;
    text: string;
    imageUrl: string;
    url?: string;
  }[];
  
  services?: ServiceItem[];
  
  galleryImages?: {
    id: string;
    url: string;
    caption?: string;
  }[];
  
  mapAddress?: string;
  mapEmbedUrl?: string;
  
  videoYoutubeId?: string;
  videoThumbnailUrl?: string;
  videoUrl?: string;
  
  appointmentBadges?: string[];
  appointmentButtonText?: string;
  
  carouselItems?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  }[];
  
  videoItems?: {
    id: string;
    title: string;
    videoYoutubeId?: string;
    videoThumbnailUrl?: string;
    videoUrl?: string;
  }[];
}

export interface ThemeConfig {
  id: string;
  name: string;
  bgClass: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  buttonBg: string;
  buttonText: string;
}
