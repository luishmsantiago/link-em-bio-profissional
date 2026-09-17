import React from 'react';
import { ArrowLeft, Sparkles, MessageCircle, Calendar } from 'lucide-react';
import { ProfileData, ThemeConfig } from '../types';
import { THEMES } from '../data/defaultBioData';
import { AVATAR_FALLBACK, IMAGE_FALLBACK, PROFILE } from '../config/siteContent';
import { fixImageUrl, handleImageError } from '../utils/imageUtils';
import { DisplayName } from './DisplayName';

interface AboutMeViewProps {
  profile: ProfileData;
  onBack: () => void;
  onOpenAppointment: () => void;
}

export const AboutMeView: React.FC<AboutMeViewProps> = ({
  profile,
  onBack,
  onOpenAppointment,
}) => {
  const theme: ThemeConfig = THEMES[profile.theme] || THEMES['dark-navy'];
  const text = profile.aboutText || PROFILE.aboutText;

  return (
    <div className={`w-full min-h-screen ${theme.bgClass} text-white font-sans transition-colors duration-300 flex flex-col relative overflow-x-hidden`}>
      {/* Background Soft Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex-1 w-full max-w-md mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold transition-all active:scale-95 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </button>
        </div>

        {/* Profile Card Header */}
        <header className="flex flex-col items-center text-center pt-2">
          {/* Avatar Container */}
          <div className="relative mb-4 group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 blur-sm opacity-60 transition duration-500" />
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-800 flex items-center justify-center">
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

          {/* CREFITO */}
          {profile.crefito && (
            <div className={`mt-2 text-[11px] font-mono tracking-widest uppercase opacity-80 ${theme.textSecondary}`}>
              <span>CREFITO 10 {profile.crefito}</span>
            </div>
          )}
        </header>

        {/* About Content Card Container */}
        <main className="flex flex-col gap-4 w-full">
          <div className={`p-5 sm:p-6 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} shadow-lg backdrop-blur-sm relative overflow-hidden`}>
            <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-white/10">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className={`text-base sm:text-lg font-bold ${theme.textPrimary}`}>
                Sobre Meu Trabalho
              </h2>
            </div>

            <div className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line ${theme.textSecondary}`}>
              {text}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 mt-2">
            <button
              onClick={onOpenAppointment}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Consulta</span>
            </button>

            {profile.socials?.whatsapp && (
              <a
                href={profile.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Falar no WhatsApp</span>
              </a>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-4 pb-2 text-center text-[10px] text-slate-500">
          <p>{profile.name} • Todos os direitos reservados</p>
        </footer>
      </div>
    </div>
  );
};
