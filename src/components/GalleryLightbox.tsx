import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { id: string; url: string; caption?: string }[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}) => {
  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % images.length);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 z-50 p-3 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Main Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
      >
        <img
          src={currentImg.url}
          alt={currentImg.caption || 'Foto da galeria'}
          className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
        />
        {currentImg.caption && (
          <p className="mt-4 text-center text-sm font-medium text-slate-200 bg-black/50 px-4 py-2 rounded-xl backdrop-blur-sm">
            {currentImg.caption}
          </p>
        )}
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 z-50 p-3 text-white/80 hover:text-white bg-white/10 rounded-full hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
