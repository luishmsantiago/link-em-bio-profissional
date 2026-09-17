import React from 'react';
import {
  Instagram,
  Facebook,
  Heart,
  Mail,
} from 'lucide-react';
import { fixImageUrl, handleImageError } from '../utils/imageUtils';
import { BioBlock, ProfileData, ThemeConfig } from '../types';
import { THEMES } from '../data/defaultBioData';
import { AVATAR_FALLBACK, IMAGE_FALLBACK } from '../config/siteContent';
import { BioBlockItem } from './BioBlockItem';
import { DisplayName } from './DisplayName';

interface BioPreviewProps {
  profile: ProfileData;
  blocks: BioBlock[];
  onOpenAppointment: (serviceName?: string) => void;
  onOpenGallery: (images: { id: string; url: string; caption?: string }[], index: number) => void;
  onOpenVideo: (youtubeId?: string, title?: string) => void;
  onOpenAbout?: () => void;
}

export const BioPreview: React.FC<BioPreviewProps> = ({
  profile,
  blocks,
  onOpenAppointment,
  onOpenGallery,
  onOpenVideo,
  onOpenAbout,
}) => {
  const theme: ThemeConfig = THEMES[profile.theme] || THEMES['dark-navy'];

  const socials = profile.socials || {};

  return (
    <div className={`w-full min-h-screen ${theme.bgClass} text-white font-sans transition-colors duration-300 flex flex-col relative overflow-x-hidden`}>
      {/* Background Soft Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex-1 w-full max-w-md mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Header Section */}
        <header className="flex flex-col items-center text-center pt-2">
          {/* Avatar Container */}
          <div className="relative mb-4 group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 blur-sm opacity-50 group-hover:opacity-80 transition duration-500" />
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-800 flex items-center justify-center">
              <img
                src={fixImageUrl(profile.avatarUrl, AVATAR_FALLBACK)}
                alt={profile.name}
                className="w-full h-full object-cover object-center"
                onError={(e) => handleImageError(e, AVATAR_FALLBACK, IMAGE_FALLBACK)}
              />
            </div>
          </div>

          {/* Name & Specialty */}
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight max-w-xs sm:max-w-md mx-auto leading-tight text-center break-words ${theme.textPrimary}`}>
            <DisplayName name={profile.name} />
          </h1>

          <p className="mt-2 px-3 py-1 text-xs font-bold uppercase tracking-widest text-sky-400 bg-sky-500/10 rounded-full border border-sky-500/20">
            {profile.specialty}
          </p>

          {/* CREFITO Credentials */}
          {profile.crefito && (
            <div className={`mt-2 flex items-center justify-center text-[11px] font-mono tracking-widest uppercase opacity-80 ${theme.textSecondary}`}>
              <span>CREFITO 10 {profile.crefito}</span>
            </div>
          )}

          {/* Bio Description */}
          {profile.bio && (
            <p className={`mt-3 text-xs sm:text-sm leading-relaxed max-w-xs sm:max-w-sm px-2 ${theme.textSecondary}`}>
              {profile.bio}
            </p>
          )}

          {/* Social Links Row */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-400 border border-white/10 transition-all hover:scale-110 active:scale-95"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {socials.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-400 border border-white/10 transition-all hover:scale-110 active:scale-95"
              >
                <Facebook className="w-5 h-5" />
              </a>
            )}
            {socials.whatsapp && (
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-all hover:scale-110 active:scale-95"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.285-.143-1.689-.833-1.95-.928-.261-.095-.451-.143-.641.143-.19.285-.736.928-.902 1.118-.166.19-.332.214-.617.071-.285-.143-1.204-.444-2.293-1.415-.847-.755-1.42-1.688-1.586-1.973-.166-.285-.018-.439.125-.581.128-.127.285-.332.428-.499.143-.166.19-.285.285-.475.095-.19.048-.356-.024-.499-.071-.143-.641-1.545-.878-2.115-.231-.555-.466-.479-.641-.488-.166-.008-.356-.01-.546-.01s-.5.071-.76.356c-.261.285-.997.974-.997 2.376 0 1.402 1.021 2.756 1.164 2.946.143.19 2.01 3.07 4.87 4.307.68.294 1.21.469 1.624.6.683.217 1.305.186 1.796.113.548-.081 1.689-.689 1.926-1.354.237-.665.237-1.225.166-1.354-.071-.128-.261-.2-.546-.343z" />
                </svg>
              </a>
            )}
            {socials.email && (
              <a
                href={`mailto:${socials.email}`}
                aria-label="Email"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-400 border border-white/10 transition-all hover:scale-110 active:scale-95"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
          </div>
        </header>

        {/* Dynamic Blocks Container */}
        <main className="grid grid-cols-2 gap-3.5 w-full">
          {blocks.map((block) => (
            <BioBlockItem
              key={block.id}
              block={block}
              theme={theme}
              onOpenAppointment={onOpenAppointment}
              onOpenGallery={onOpenGallery}
              onOpenVideo={onOpenVideo}
              onOpenAbout={onOpenAbout}
            />
          ))}
        </main>

        {/* Footer Section */}
        <footer className="mt-auto pt-6 pb-4 flex flex-col items-center justify-center text-center gap-3 border-t border-white/10">
          <p className={`text-xs font-medium ${theme.textSecondary}`}>
            {profile.footerText || 'Obrigado por sua visita!'}
          </p>

          <a
            href={profile.footerBrandUrl || 'https://ldue.app'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>Feito com carinho por <strong className="text-sky-400">{profile.footerBrand || 'LDue'}</strong></span>
            <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
          </a>
        </footer>
      </div>
    </div>
  );
};
