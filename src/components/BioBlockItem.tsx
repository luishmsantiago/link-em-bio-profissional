import React, { useState } from 'react';
import {
  Link2,
  Stethoscope,
  MapPin,
  Play,
  ArrowRight,
  Phone,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Briefcase,
  ExternalLink,
  MessageCircle,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  Heart,
  Award,
  User,
} from 'lucide-react';
import { BioBlock, ThemeConfig } from '../types';
import { fixImageUrl, handleImageError, handleCarouselImageError } from '../utils/imageUtils';
import {
  therapyCarouselItems,
  therapyVideoItems,
  LOCATIONS,
  CONTACT,
  IMAGE_FALLBACK,
  ABOUT_IMAGE_FALLBACK,
} from '../config/siteContent';

const FeaturedCarouselBlock: React.FC<{
  block: BioBlock;
  theme: ThemeConfig;
  onOpenAppointment?: (serviceName?: string) => void;
}> = ({ block, theme, onOpenAppointment }) => {
  const items = block.carouselItems?.length ? block.carouselItems : therapyCarouselItems();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const currentItem = items[currentIndex] || items[0];
  const isExpanded = !!expandedItems[currentItem.id];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedItems((prev) => ({ ...prev, [currentItem.id]: !prev[currentItem.id] }));
  };

  return (
    <div className="col-span-2">
      <div
        className={`relative overflow-hidden transition-all shadow-md rounded-2xl border ${theme.cardBg} ${theme.cardBorder} flex flex-col`}
      >
        {/* Header Title */}
        <div className="flex items-center justify-between p-3.5 pb-2.5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-sky-400" />
            <h4 className={`font-extrabold text-sm sm:text-base ${theme.textPrimary}`}>
              {block.title || 'Terapias'}
            </h4>
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-sky-400 border border-slate-700/80">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        {/* Carousel Image Container */}
        <div className="relative h-48 sm:h-52 w-full bg-slate-900 overflow-hidden group">
          <img
            src={fixImageUrl(currentItem.imageUrl, IMAGE_FALLBACK)}
            alt={currentItem.title}
            className="w-full h-full object-cover transition-all duration-500"
            onError={handleCarouselImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all active:scale-90 shadow-lg z-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all active:scale-90 shadow-lg z-10"
            aria-label="Próximo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Title Overlay on Image */}
          <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
            <span className="inline-block px-2.5 py-0.5 mb-1 text-[10px] font-bold uppercase tracking-wider text-sky-300 bg-sky-950/80 rounded-md border border-sky-500/30 backdrop-blur-sm">
              Atuação Especializada
            </span>
            <h3 className="text-base sm:text-lg font-black text-white drop-shadow-md">
              {currentItem.title}
            </h3>
          </div>
        </div>

        {/* Carousel Indicators / Dots */}
        <div className="flex items-center justify-center gap-1.5 py-2 bg-slate-900/60 border-b border-white/5">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx
                  ? 'w-6 bg-sky-400'
                  : 'w-1.5 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Content & Description */}
        <div className="p-3.5 flex flex-col gap-2.5">
          <p
            className={`text-xs leading-relaxed transition-all ${
              theme.textSecondary
            } ${isExpanded ? '' : 'line-clamp-2'}`}
          >
            {currentItem.description}
          </p>

          <div className="flex items-center justify-between pt-1 gap-2 border-t border-white/5">
            <button
              onClick={toggleExpand}
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 underline underline-offset-2 transition-colors py-1"
            >
              <span>{isExpanded ? 'Ver menos' : 'Saiba mais'}</span>
            </button>

            {onOpenAppointment && (
              <button
                onClick={() => onOpenAppointment()}
                className="px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5 text-white hover:brightness-110"
                style={{ backgroundColor: theme.accentColor }}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendar Consulta</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedVideoCarouselBlock: React.FC<{
  block: BioBlock;
  theme: ThemeConfig;
  onOpenVideo: (youtubeId?: string, title?: string, videoUrl?: string) => void;
}> = ({ block, theme, onOpenVideo }) => {
  const items = block.videoItems?.length ? block.videoItems : therapyVideoItems();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = items[currentIndex] || items[0];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="col-span-2">
      <div
        className={`relative overflow-hidden transition-all shadow-md rounded-2xl border ${theme.cardBg} ${theme.cardBorder} flex flex-col`}
      >
        {/* Header Title */}
        <div className="flex items-center justify-between p-3.5 pb-2.5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-rose-500 fill-rose-500" />
            <h4 className={`font-extrabold text-sm sm:text-base ${theme.textPrimary}`}>
              {block.title || 'Terapias em Vídeo'}
            </h4>
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-400 border border-slate-700/80">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        {/* Video Thumbnail Area */}
        <div
          onClick={() => onOpenVideo(currentItem.videoYoutubeId, currentItem.title, currentItem.videoUrl)}
          className="relative h-48 sm:h-52 w-full bg-black overflow-hidden group cursor-pointer"
        >
          <img
            src={fixImageUrl(
              currentItem.videoThumbnailUrl,
              `https://i.ytimg.com/vi/${currentItem.videoYoutubeId || 'dQw4w9WgXcQ'}/hqdefault.jpg`
            )}
            alt={currentItem.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            onError={handleCarouselImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-black/30 to-transparent" />

          {/* Central Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-rose-500 transition-all border-2 border-white/40 backdrop-blur-sm">
              <Play className="w-7 h-7 fill-white ml-1" />
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all active:scale-90 shadow-lg z-10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all active:scale-90 shadow-lg z-10"
            aria-label="Próximo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-1.5 py-2 bg-slate-900/60 border-b border-white/5">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx
                  ? 'w-6 bg-rose-500'
                  : 'w-1.5 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Ir para vídeo ${idx + 1}`}
            />
          ))}
        </div>

        {/* Therapy Name Display below Video */}
        <div className="p-3 flex flex-col items-center justify-center gap-1 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/60 px-2.5 py-0.5 rounded-md border border-rose-500/30">
            Demonstração em Vídeo
          </span>
          <h3 className={`text-base sm:text-lg font-black ${theme.textPrimary}`}>
            {currentItem.title}
          </h3>
        </div>
      </div>
    </div>
  );
};

const LocationMapBlock: React.FC<{
  block: BioBlock;
  theme: ThemeConfig;
}> = ({ block, theme }) => {
  const locations = LOCATIONS;

  const [activeLocIndex, setActiveLocIndex] = useState(0);
  const currentLoc = locations[activeLocIndex] || locations[0];

  return (
    <div className="col-span-2">
      <div
        className={`relative overflow-hidden transition-all shadow-sm rounded-2xl border ${theme.cardBg} ${theme.cardBorder} flex flex-col`}
      >
        <div className="text-center p-3.5 pb-2">
          <h4 className={`font-bold text-sm sm:text-base ${theme.textPrimary}`}>
            {block.title || 'Localização'}
          </h4>

          {/* Location Selector Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-2.5 mb-1">
            {locations.map((loc, idx) => (
              <button
                key={loc.name}
                onClick={() => setActiveLocIndex(idx)}
                className={`py-2 px-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 border ${
                  activeLocIndex === idx
                    ? 'bg-sky-500 text-slate-950 border-sky-400 font-black shadow-md scale-[1.02]'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-800'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{loc.name}</span>
              </button>
            ))}
          </div>

          <p className="text-xs mt-2 px-1 leading-snug font-medium text-sky-400">
            {currentLoc.address}
          </p>
        </div>

        <div className="h-56 w-full bg-slate-800 relative border-t border-b border-white/5">
          <iframe
            title={`Mapa - ${currentLoc.name}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src={currentLoc.embedUrl}
            allowFullScreen
          />
        </div>

        <div className="p-3 flex flex-col gap-2">
          <a
            href={currentLoc.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl font-black text-xs uppercase tracking-[0.12em] shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 hover:brightness-110 text-white text-center"
            style={{ backgroundColor: theme.accentColor }}
          >
            <Navigation className="w-4 h-4 shrink-0 text-sky-200" />
            <div className="flex flex-col items-center justify-center leading-tight">
              <span>Abrir no GPS</span>
              <span className="text-[10px] font-bold tracking-normal normal-case opacity-90 text-sky-100">
                ({currentLoc.name})
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

interface BioBlockItemProps {
  block: BioBlock;
  theme: ThemeConfig;
  onOpenAppointment: (serviceName?: string) => void;
  onOpenGallery: (images: { id: string; url: string; caption?: string }[], index: number) => void;
  onOpenVideo: (youtubeId?: string, title?: string, videoUrl?: string) => void;
  onOpenAbout?: () => void;
}

export const BioBlockItem: React.FC<BioBlockItemProps> = ({
  block,
  theme,
  onOpenAppointment,
  onOpenGallery,
  onOpenVideo,
  onOpenAbout,
}) => {
  if (!block.enabled) return null;

  const renderIcon = (name?: string, className = 'w-5 h-5') => {
    switch (name) {
      case 'User':
        return <User className={className} />;
      case 'Stethoscope':
        return <Stethoscope className={className} />;
      case 'Phone':
        return <Phone className={className} />;
      case 'MapPin':
        return <MapPin className={className} />;
      case 'Briefcase':
        return <Briefcase className={className} />;
      case 'Calendar':
        return <Calendar className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Link2':
      default:
        return <Link2 className={className} />;
    }
  };

  const handleClick = (e: React.MouseEvent, url?: string) => {
    if (url === '#agendar' || url === '#appointment') {
      e.preventDefault();
      onOpenAppointment();
      return;
    }
    if (url === '#sobre_mim' || url === '/sobre_mim' || url === 'sobre_mim') {
      e.preventDefault();
      if (onOpenAbout) {
        onOpenAbout();
      } else {
        window.location.hash = '#sobre_mim';
      }
      return;
    }
    if (url && url.startsWith('#')) {
      e.preventDefault();
      // Handle in-page section scrolling or appointment trigger
      onOpenAppointment(block.title || 'Consulta');
      return;
    }
    if (url) {
      window.open(url, '_blank');
    }
  };

  switch (block.type) {
    case 'LINK_ICON':
      return (
        <div className="col-span-2">
          <div
            onClick={(e) => handleClick(e, block.url)}
            className={`group relative flex border transition-all duration-300 rounded-2xl ${theme.cardBg} ${theme.cardBorder} p-3.5 items-center gap-4 cursor-pointer hover:scale-[1.01] active:scale-[0.99] shadow-sm`}
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: `${theme.accentColor}18`, color: theme.accentColor }}
            >
              {renderIcon(block.iconName, 'w-6 h-6')}
            </div>
            <div className="flex-1 text-left min-w-0 flex flex-col justify-center">
              <h4 className={`font-bold leading-tight break-words text-sm sm:text-base ${theme.textPrimary}`}>
                {block.title || 'Seu Link Personalizado'}
              </h4>
              {block.subtitle && (
                <p className={`mt-0.5 break-words leading-tight text-xs ${theme.textSecondary}`}>
                  {block.subtitle}
                </p>
              )}
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform shrink-0" />
          </div>
        </div>
      );

    case 'LINK_IMAGE':
      return (
        <div className="col-span-2">
          <div
            onClick={(e) => handleClick(e, block.url)}
            className={`group relative flex border transition-all duration-300 rounded-2xl ${theme.cardBg} ${theme.cardBorder} overflow-hidden items-stretch cursor-pointer hover:scale-[1.01] active:scale-[0.99] shadow-sm min-h-[96px]`}
          >
            <div className="relative shrink-0 w-28 bg-slate-800 border-r border-slate-700/50 overflow-hidden">
              <img
                src={fixImageUrl(block.imageUrl, ABOUT_IMAGE_FALLBACK)}
                alt=""
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                onError={(e) => handleImageError(e, ABOUT_IMAGE_FALLBACK, IMAGE_FALLBACK)}
              />
            </div>
            <div className="flex-1 text-left min-w-0 flex flex-col justify-center p-3.5 pr-2">
              <h4 className={`font-bold leading-tight break-words text-sm sm:text-base ${theme.textPrimary}`}>
                {block.title || 'Seu Link Personalizado'}
              </h4>
              {block.subtitle && (
                <p className={`mt-0.5 break-words leading-tight text-xs ${theme.textSecondary}`}>
                  {block.subtitle}
                </p>
              )}
            </div>
            <div className="flex items-center pr-3.5 text-slate-500 group-hover:translate-x-1 transition-transform shrink-0">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      );

    case 'GRID_CARDS':
      return (
        <div className="col-span-2 grid grid-cols-2 gap-3">
          {(block.gridItems || []).map((item) => (
            <div
              key={item.id}
              onClick={(e) => handleClick(e, item.url)}
              className={`col-span-1 group relative flex flex-col border transition-all duration-300 rounded-2xl ${theme.cardBg} ${theme.cardBorder} overflow-hidden cursor-pointer hover:scale-[1.02] active:scale-[0.98] shadow-sm`}
            >
              <div className="relative w-full h-32 bg-slate-800 overflow-hidden border-b border-slate-700/50">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 text-left min-w-0 flex flex-col justify-start p-3">
                <h4 className={`font-bold leading-tight break-words text-xs sm:text-sm ${theme.textPrimary}`}>
                  {item.title}
                </h4>
                <p className={`mt-1 break-words leading-tight text-[11px] ${theme.textSecondary}`}>
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      );

    case 'LARGE_HIGHLIGHT':
      return (
        <FeaturedCarouselBlock
          block={block}
          theme={theme}
          onOpenAppointment={onOpenAppointment}
        />
      );

    case 'MIXED_LIST':
      return (
        <div className="col-span-2">
          <div
            onClick={(e) => handleClick(e, block.url)}
            className={`group relative transition-all duration-300 w-full rounded-2xl shadow-sm border ${theme.cardBg} ${theme.cardBorder} overflow-hidden flex items-stretch cursor-pointer hover:scale-[1.01] active:scale-[0.99]`}
          >
            <div className="absolute top-0 left-0 h-full w-1.5 z-10" style={{ backgroundColor: theme.accentColor }} />
            <div className="flex-1 flex flex-col justify-center gap-2 p-3.5 pl-5">
              <div className="text-left">
                <h3 className={`font-bold text-sm sm:text-base ${theme.textPrimary}`}>
                  {block.title}
                </h3>
                {block.subtitle && (
                  <p className={`mt-1 leading-relaxed text-xs ${theme.textSecondary}`}>
                    {block.subtitle}
                  </p>
                )}
              </div>
              <div
                className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] group-hover:underline"
                style={{ color: theme.accentColor }}
              >
                {block.buttonText || 'Acessar'} <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>
            <div className="p-2 shrink-0 flex items-center">
              <div className="rounded-xl overflow-hidden relative w-28 h-28 bg-slate-800">
                <img
                  src={block.imageUrl || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400'}
                  alt=""
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      );

    case 'SERVICES_LIST':
      return (
        <div className="col-span-2">
          <div className={`w-full rounded-2xl shadow-sm border ${theme.cardBg} ${theme.cardBorder} p-4`}>
            <h4 className={`font-bold text-center text-sm sm:text-base mb-4 ${theme.textPrimary}`}>
              {block.title || 'Serviços'}
            </h4>
            <div className="flex flex-col gap-2.5">
              {(block.services || []).map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => onOpenAppointment(srv.title)}
                  className="flex flex-col items-start rounded-xl border border-white/5 hover:border-sky-500/30 transition-all p-3 bg-black/10 hover:bg-black/20 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <h5 className={`font-bold text-sm ${theme.textPrimary}`}>{srv.title}</h5>
                    <span className="text-[10px] uppercase font-extrabold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                      Agendar
                    </span>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${theme.textSecondary}`}>
                    {srv.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'SERVICES_ICONS':
      return (
        <div className="col-span-2">
          <div className={`w-full rounded-2xl shadow-sm border ${theme.cardBg} ${theme.cardBorder} p-4`}>
            <h4 className={`font-bold text-center text-sm sm:text-base mb-4 ${theme.textPrimary}`}>
              {block.title || 'Serviços'}
            </h4>
            <div className="flex flex-col gap-3">
              {(block.services || []).map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => onOpenAppointment(srv.title)}
                  className="rounded-xl border border-white/5 hover:border-sky-500/30 transition-all p-3 bg-black/10 hover:bg-black/20 flex items-start gap-3.5 cursor-pointer"
                >
                  <div
                    className="p-2.5 rounded-lg shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: `${theme.accentColor}20`, color: theme.accentColor }}
                  >
                    {renderIcon(srv.iconName || 'Briefcase', 'w-5 h-5')}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h5 className={`font-bold text-sm mb-0.5 ${theme.textPrimary}`}>{srv.title}</h5>
                    <p className={`text-xs leading-relaxed ${theme.textSecondary}`}>
                      {srv.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'SERVICES_IMAGES':
      return (
        <div className="col-span-2">
          <div className={`w-full rounded-2xl shadow-sm border ${theme.cardBg} ${theme.cardBorder} p-4`}>
            <h4 className={`font-bold text-center text-sm sm:text-base mb-4 ${theme.textPrimary}`}>
              {block.title || 'Serviços'}
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {(block.services || []).map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => onOpenAppointment(srv.title)}
                  className="rounded-xl border border-white/5 hover:border-sky-500/30 transition-all overflow-hidden flex flex-col h-full bg-black/10 hover:bg-black/20 cursor-pointer group"
                >
                  <div className="relative aspect-[4/3] w-full bg-slate-800">
                    <img
                      src={srv.imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400'}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className={`font-bold text-xs sm:text-sm leading-tight mb-1 ${theme.textPrimary}`}>
                        {srv.title}
                      </h5>
                      <p className={`text-[11px] leading-snug line-clamp-2 ${theme.textSecondary}`}>
                        {srv.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'LOCATION_MAP':
      return <LocationMapBlock block={block} theme={theme} />;

    case 'FEATURED_VIDEO':
      return (
        <FeaturedVideoCarouselBlock
          block={block}
          theme={theme}
          onOpenVideo={onOpenVideo}
        />
      );

    case 'BUTTON_BAR':
      return (
        <div className="col-span-2">
          <div className={`w-full rounded-2xl border ${theme.cardBg} ${theme.cardBorder} p-3.5 flex justify-center`}>
            <div className="flex gap-3 w-full">
              <a
                href={block.url || `tel:+${CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span className="truncate">{block.buttonText || 'Ligar Agora'}</span>
              </a>
              <button
                onClick={() => onOpenAppointment('Agendamento Geral')}
                className="flex-1 py-3 px-3 text-white rounded-xl font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg hover:brightness-110"
                style={{ backgroundColor: theme.accentColor }}
              >
                <Calendar className="w-4 h-4" />
                <span className="truncate">{block.secondaryButtonText || 'Agendar'}</span>
              </button>
            </div>
          </div>
        </div>
      );

    case 'SINGLE_BUTTON':
      return (
        <div className="col-span-2">
          <div className={`w-full rounded-2xl border ${theme.cardBg} ${theme.cardBorder} p-3.5 flex justify-center`}>
            <button
              onClick={() => onOpenAppointment()}
              className="w-full py-3.5 text-white rounded-xl font-black text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl hover:brightness-110"
              style={{ backgroundColor: theme.accentColor }}
            >
              <span>{block.buttonText || 'Botão de Ação'}</span>
            </button>
          </div>
        </div>
      );

    case 'WHATSAPP_CARD':
      return (
        <div className="col-span-2">
          <div
            onClick={(e) => handleClick(e, block.url)}
            className={`group relative flex border transition-all duration-300 rounded-2xl ${theme.cardBg} ${theme.cardBorder} p-3.5 items-center gap-4 cursor-pointer hover:scale-[1.01] active:scale-[0.99] border-l-[8px] border-l-emerald-500 shadow-lg shadow-emerald-500/5`}
          >
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20 text-white">
              <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.285-.143-1.689-.833-1.95-.928-.261-.095-.451-.143-.641.143-.19.285-.736.928-.902 1.118-.166.19-.332.214-.617.071-.285-.143-1.204-.444-2.293-1.415-.847-.755-1.42-1.688-1.586-1.973-.166-.285-.018-.439.125-.581.128-.127.285-.332.428-.499.143-.166.19-.285.285-.475.095-.19.048-.356-.024-.499-.071-.143-.641-1.545-.878-2.115-.231-.555-.466-.479-.641-.488-.166-.008-.356-.01-.546-.01s-.5.071-.76.356c-.261.285-.997.974-.997 2.376 0 1.402 1.021 2.756 1.164 2.946.143.19 2.01 3.07 4.87 4.307.68.294 1.21.469 1.624.6.683.217 1.305.186 1.796.113.548-.081 1.689-.689 1.926-1.354.237-.665.237-1.225.166-1.354-.071-.128-.261-.2-.546-.343z" />
              </svg>
            </div>
            <div className="flex-1 text-left min-w-0 flex flex-col justify-center">
              <h4 className={`font-bold leading-tight break-words text-base ${theme.textPrimary}`}>
                {block.title || 'Fale Comigo'}
              </h4>
              <p className="font-semibold text-xs mt-0.5 break-words text-emerald-400">
                {block.subtitle || 'Atendimento via WhatsApp'}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </div>
        </div>
      );

    case 'PHOTO_GALLERY':
      return (
        <div className="col-span-2">
          <div className={`w-full rounded-2xl overflow-hidden flex flex-col shadow-sm border ${theme.cardBg} ${theme.cardBorder} p-4`}>
            <div className="mb-3">
              <h4 className={`font-bold text-sm sm:text-base ${theme.textPrimary}`}>
                {block.title || 'Galeria de Fotos'}
              </h4>
              {block.subtitle && (
                <p className={`text-xs mt-0.5 ${theme.textSecondary}`}>{block.subtitle}</p>
              )}
            </div>
            <div className="w-full grid grid-cols-3 gap-2">
              {(block.galleryImages || []).map((img, idx) => (
                <div
                  key={img.id}
                  onClick={() => onOpenGallery(block.galleryImages || [], idx)}
                  className="aspect-[4/3] relative rounded-xl overflow-hidden group cursor-pointer bg-slate-800 border border-white/5 shadow-sm hover:scale-[1.03] transition-transform"
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'PRO_TITLE':
      return (
        <div className="col-span-2 py-2">
          <div className="w-full text-left">
            <h4
              className="uppercase tracking-[0.3em] font-black text-xs"
              style={{ color: theme.accentColor }}
            >
              {block.title || 'Título Especial'}
            </h4>
            <div
              className="h-1 rounded-full mt-2"
              style={{ backgroundColor: theme.accentColor, width: '48px' }}
            />
          </div>
        </div>
      );

    case 'PRO_TEXT':
      return (
        <div className="col-span-2">
          <div className={`w-full rounded-2xl p-4 border ${theme.cardBg} ${theme.cardBorder}`}>
            {block.title && (
              <h4 className={`font-bold text-lg mb-2 ${theme.textPrimary}`}>{block.title}</h4>
            )}
            {block.subtitle && (
              <p className={`text-sm leading-relaxed whitespace-pre-line ${theme.textSecondary}`}>{block.subtitle}</p>
            )}
          </div>
        </div>
      );

    case 'DIVIDER':
      return (
        <div className="col-span-2 py-3 flex justify-center">
          <div
            className="w-full h-[1px] opacity-30"
            style={{ backgroundColor: theme.accentColor }}
          />
        </div>
      );

    case 'APPOINTMENT_DETAILS':
      return (
        <div className="col-span-2">
          <div className={`w-full rounded-2xl shadow-sm border ${theme.cardBg} ${theme.cardBorder} p-4`}>
            <div className="text-left mb-3">
              <h4 className={`font-bold text-sm sm:text-base ${theme.textPrimary}`}>
                {block.title || 'Detalhes Gerais'}
              </h4>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {(block.appointmentBadges || ['Particular', 'Convênios', 'Pagamentos']).map((badge) => (
                <span
                  key={badge}
                  className="font-bold text-xs px-3 py-1.5 rounded-lg border border-sky-500/20 bg-sky-500/10 text-sky-400"
                >
                  {badge}
                </span>
              ))}
            </div>
            <button
              onClick={() => onOpenAppointment()}
              className="w-full h-12 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-between px-5 text-white shadow-lg active:scale-[0.98] transition-all hover:brightness-110"
              style={{ backgroundColor: theme.accentColor }}
            >
              <span>{block.appointmentButtonText || 'Agendar Horário'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      );

    default:
      return null;
  }
};
