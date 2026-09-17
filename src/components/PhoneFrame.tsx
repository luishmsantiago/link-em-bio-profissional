import React, { useState } from 'react';
import { Smartphone, Monitor, Share2, Copy, Check, Settings, Sparkles, Eye } from 'lucide-react';
import { BioBlock, ProfileData } from '../types';
import { THEMES } from '../data/defaultBioData';
import { BioPreview } from './BioPreview';

interface PhoneFrameProps {
  profile: ProfileData;
  blocks: BioBlock[];
  onOpenAppointment: (serviceName?: string) => void;
  onOpenGallery: (images: { id: string; url: string; caption?: string }[], index: number) => void;
  onOpenVideo: (youtubeId?: string, title?: string) => void;
  onToggleEditor: () => void;
  onSelectTheme: (themeKey: string) => void;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  profile,
  blocks,
  onOpenAppointment,
  onOpenGallery,
  onOpenVideo,
  onToggleEditor,
  onSelectTheme,
}) => {
  const [viewMode, setViewMode] = useState<'phone' | 'full'>('phone');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
            Bio
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              {profile.name}
              <span className="text-[10px] font-semibold bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded-full border border-sky-500/30">
                Link in Bio
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">{profile.specialty}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex items-center gap-1">
            <button
              onClick={() => setViewMode('phone')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'phone'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Modo Celular"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Celular</span>
            </button>
            <button
              onClick={() => setViewMode('full')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'full'
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Modo Tela Cheia"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Tela Cheia</span>
            </button>
          </div>

          {/* Quick Theme Selector Dropdown */}
          <div className="relative group hidden sm:block">
            <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Tema</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 hidden group-hover:block z-50">
              <div className="text-[10px] font-bold text-slate-400 px-2 py-1 uppercase">Escolher Tema</div>
              {Object.values(THEMES).map((t) => (
                <button
                  key={t.id}
                  onClick={() => onSelectTheme(t.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                    profile.theme === t.id
                      ? 'bg-sky-500/20 text-sky-400'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{t.name}</span>
                  <div
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: t.accentColor }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700 text-slate-200 flex items-center gap-1.5 transition-all active:scale-95"
            title="Copiar Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-300" />}
            <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Compartilhar'}</span>
          </button>

          {/* Open Editor Button */}
          <button
            onClick={onToggleEditor}
            className="px-3.5 py-1.5 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-sky-500/20 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Editar Bio</span>
          </button>
        </div>
      </header>

      {/* Main Display Area */}
      <main className="w-full flex-1 flex items-center justify-center p-4 sm:p-8">
        {viewMode === 'phone' ? (
          /* Phone Outer Frame Container */
          <div className="relative mx-auto my-auto transition-all duration-500">
            {/* Ambient Background Glow behind phone */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/30 to-emerald-500/20 blur-[90px] rounded-full pointer-events-none" />

            {/* Smartphone Shell */}
            <div className="relative w-[360px] sm:w-[390px] h-[780px] bg-slate-950 rounded-[3rem] p-3 border-4 border-slate-800/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 flex flex-col overflow-hidden">
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 w-28 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-2 border border-slate-800/80">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
                <div className="w-10 h-1.5 rounded-full bg-slate-800" />
              </div>

              {/* Phone Inner Screen Scroll Container */}
              <div className="w-full h-full rounded-[2.25rem] overflow-y-auto no-scrollbar scrollbar-hide relative bg-slate-900">
                <BioPreview
                  profile={profile}
                  blocks={blocks}
                  onOpenAppointment={onOpenAppointment}
                  onOpenGallery={onOpenGallery}
                  onOpenVideo={onOpenVideo}
                />
              </div>

              {/* Home Indicator Bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-30" />
            </div>
          </div>
        ) : (
          /* Fullscreen Standalone Page View */
          <div className="w-full max-w-xl mx-auto rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 my-4 min-h-[85vh]">
            <BioPreview
              profile={profile}
              blocks={blocks}
              onOpenAppointment={onOpenAppointment}
              onOpenGallery={onOpenGallery}
              onOpenVideo={onOpenVideo}
            />
          </div>
        )}
      </main>
    </div>
  );
};
