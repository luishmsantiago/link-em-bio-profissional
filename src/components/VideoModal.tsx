import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeId?: string;
  videoUrl?: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  youtubeId,
  videoUrl,
  title = 'Vídeo em Destaque',
}) => {
  if (!isOpen) return null;

  const isMp4 = videoUrl && (videoUrl.endsWith('.mp4') || videoUrl.includes('/videos/'));

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl overflow-hidden bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl"
      >
        <div className="flex items-center justify-between p-4 bg-slate-800/80 border-b border-slate-700">
          <h4 className="font-bold text-sm text-white truncate">{title}</h4>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {isMp4 ? (
            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId || 'dQw4w9WgXcQ'}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};
