import React, { useState, useEffect } from 'react';
import { Share2, Check } from 'lucide-react';
import { BioBlock, ProfileData } from './types';
import { INITIAL_PROFILE, INITIAL_BLOCKS } from './data/defaultBioData';
import { AVATAR_FALLBACK, ABOUT_IMAGE_FALLBACK } from './config/siteContent';
import { fixImageUrl } from './utils/imageUtils';
import { BioPreview } from './components/BioPreview';
import { AboutMeView } from './components/AboutMeView';
import { EditorDrawer } from './components/EditorDrawer';
import { AppointmentModal } from './components/AppointmentModal';
import { GalleryLightbox } from './components/GalleryLightbox';
import { VideoModal } from './components/VideoModal';

/* --------------------------------------------------------------- */
/*  Armazenamento local                                             */
/*  Ao mudar a estrutura dos blocos/perfil, aumente STORAGE_VERSION */
/*  para descartar dados antigos salvos no navegador.              */
/* --------------------------------------------------------------- */
const STORAGE = {
  profile: 'ldue_profile',
  blocks: 'ldue_blocks',
  version: 'ldue_schema',
};
const STORAGE_VERSION = '2';

const isSchemaCurrent = () => {
  try {
    return localStorage.getItem(STORAGE.version) === STORAGE_VERSION;
  } catch {
    return false;
  }
};

function loadProfile(): ProfileData {
  try {
    const saved = isSchemaCurrent() && localStorage.getItem(STORAGE.profile);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<ProfileData>;
      return {
        ...INITIAL_PROFILE,
        ...parsed,
        avatarUrl: fixImageUrl(parsed.avatarUrl, AVATAR_FALLBACK),
        aboutImageUrl: fixImageUrl(parsed.aboutImageUrl, ABOUT_IMAGE_FALLBACK),
      };
    }
  } catch (e) {
    console.error('Erro ao ler o perfil salvo', e);
  }
  return INITIAL_PROFILE;
}

function loadBlocks(): BioBlock[] {
  try {
    const saved = isSchemaCurrent() && localStorage.getItem(STORAGE.blocks);
    if (saved) return JSON.parse(saved) as BioBlock[];
  } catch (e) {
    console.error('Erro ao ler os blocos salvos', e);
  }
  return INITIAL_BLOCKS;
}

function persist(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(STORAGE.version, STORAGE_VERSION);
  } catch (e) {
    console.error('Erro ao salvar no navegador', e);
  }
}

/* --------------------------------------------------------------- */
/*  Navegação por hash (#sobre_mim)                                 */
/* --------------------------------------------------------------- */
const isAboutHash = () =>
  typeof window !== 'undefined' &&
  (window.location.pathname + window.location.hash).includes('sobre_mim');

export default function App() {
  const [currentView, setCurrentView] = useState<'main' | 'sobre_mim'>(() =>
    isAboutHash() ? 'sobre_mim' : 'main',
  );

  useEffect(() => {
    const handleHashChange = () => setCurrentView(isAboutHash() ? 'sobre_mim' : 'main');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [profile, setProfile] = useState<ProfileData>(loadProfile);
  const [blocks, setBlocks] = useState<BioBlock[]>(loadBlocks);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Consulta Geral');

  const [galleryState, setGalleryState] = useState<{
    isOpen: boolean;
    images: { id: string; url: string; caption?: string }[];
    index: number;
  }>({ isOpen: false, images: [], index: 0 });

  const [videoState, setVideoState] = useState<{
    isOpen: boolean;
    youtubeId?: string;
    videoUrl?: string;
    title?: string;
  }>({ isOpen: false, title: 'Vídeo em Destaque' });

  /* Persistência: normaliza os caminhos de imagem antes de salvar */
  useEffect(() => {
    persist(STORAGE.profile, {
      ...profile,
      avatarUrl: fixImageUrl(profile.avatarUrl, AVATAR_FALLBACK),
      aboutImageUrl: fixImageUrl(profile.aboutImageUrl, ABOUT_IMAGE_FALLBACK),
    });
  }, [profile]);

  useEffect(() => {
    persist(
      STORAGE.blocks,
      blocks.map((b) => ({
        ...b,
        imageUrl: b.imageUrl ? fixImageUrl(b.imageUrl) : b.imageUrl,
        carouselItems: b.carouselItems?.map((it) => ({ ...it, imageUrl: fixImageUrl(it.imageUrl) })),
        videoThumbnailUrl: b.videoThumbnailUrl ? fixImageUrl(b.videoThumbnailUrl) : b.videoThumbnailUrl,
        videoItems: b.videoItems?.map((v) => ({
          ...v,
          videoThumbnailUrl: fixImageUrl(v.videoThumbnailUrl),
        })),
      })),
    );
  }, [blocks]);

  /* Ações */
  const handleOpenAppointment = (serviceName?: string) => {
    if (serviceName) setSelectedService(serviceName);
    setIsAppointmentOpen(true);
  };

  const handleOpenAbout = () => {
    window.location.hash = '#sobre_mim';
    setCurrentView('sobre_mim');
  };

  const handleBackToMain = () => {
    if (window.location.hash.includes('sobre_mim')) {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
    setCurrentView('main');
  };

  const handleOpenGallery = (
    images: { id: string; url: string; caption?: string }[],
    index: number,
  ) => setGalleryState({ isOpen: true, images, index });

  const handleOpenVideo = (youtubeId?: string, title?: string, videoUrl?: string) =>
    setVideoState({ isOpen: true, youtubeId, videoUrl, title: title || 'Vídeo em Destaque' });

  const handleResetDefaults = () => {
    setProfile(INITIAL_PROFILE);
    setBlocks(INITIAL_BLOCKS);
    try {
      localStorage.removeItem(STORAGE.profile);
      localStorage.removeItem(STORAGE.blocks);
      localStorage.removeItem(STORAGE.version);
    } catch {
      /* ignore */
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen font-sans text-white antialiased relative">
      {currentView === 'sobre_mim' ? (
        <AboutMeView
          profile={profile}
          onBack={handleBackToMain}
          onOpenAppointment={() => handleOpenAppointment('Atendimento - Sobre Meu Trabalho')}
        />
      ) : (
        <BioPreview
          profile={profile}
          blocks={blocks}
          onOpenAppointment={handleOpenAppointment}
          onOpenGallery={handleOpenGallery}
          onOpenVideo={handleOpenVideo}
          onOpenAbout={handleOpenAbout}
        />
      )}

      {/* Floating Share Button */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          onClick={handleCopyLink}
          className="p-3 bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-white rounded-full shadow-2xl backdrop-blur-md border border-white/10 transition-all active:scale-95"
          title="Compartilhar / Copiar Link"
        >
          {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Editor Drawer */}
      <EditorDrawer
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        profile={profile}
        onUpdateProfile={setProfile}
        blocks={blocks}
        onUpdateBlocks={setBlocks}
        onResetDefaults={handleResetDefaults}
      />

      {/* Interactive Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        profile={profile}
        preselectedService={selectedService}
      />

      {/* Photo Gallery Lightbox */}
      <GalleryLightbox
        isOpen={galleryState.isOpen}
        onClose={() => setGalleryState((prev) => ({ ...prev, isOpen: false }))}
        images={galleryState.images}
        currentIndex={galleryState.index}
        onNavigate={(idx) => setGalleryState((prev) => ({ ...prev, index: idx }))}
      />

      {/* Featured Video Player Modal */}
      <VideoModal
        isOpen={videoState.isOpen}
        onClose={() => setVideoState((prev) => ({ ...prev, isOpen: false }))}
        youtubeId={videoState.youtubeId}
        videoUrl={videoState.videoUrl}
        title={videoState.title}
      />
    </div>
  );
}
