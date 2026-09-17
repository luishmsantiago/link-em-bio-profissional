import React from 'react';
import { AVATAR_FALLBACK, ABOUT_IMAGE_FALLBACK, IMAGE_FALLBACK } from '../config/siteContent';

/**
 * Normaliza caminhos de imagem para o Vite servir os arquivos de /public.
 * Ex.: 'public/images/avatar.jpg' -> '/images/avatar.jpg?v=2'
 */
export function fixImageUrl(url?: string, defaultFallback: string = AVATAR_FALLBACK): string {
  const withBuster = (path: string) =>
    path.startsWith('/images/') && !path.includes('?v=') ? `${path}?v=2` : path;

  if (!url) return withBuster(defaultFallback);

  let cleaned = url.trim();
  cleaned = cleaned.replace(/^(\/?public\/)+/i, '/');
  cleaned = cleaned.replace(/^src\/data\/images\//i, '/images/');

  if (cleaned.startsWith('images/')) cleaned = '/' + cleaned;
  if (!cleaned || cleaned === '/') return withBuster(defaultFallback);

  return withBuster(cleaned);
}

/**
 * Troca a imagem por reservas quando ela falha ao carregar.
 * Cada reserva é tentada apenas uma vez.
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  ...fallbacks: string[]
) {
  const target = e.currentTarget;
  const list = fallbacks.length ? fallbacks : [AVATAR_FALLBACK, ABOUT_IMAGE_FALLBACK];

  for (let i = 0; i < list.length; i++) {
    const key = `triedF${i}`;
    if (!target.dataset[key]) {
      target.dataset[key] = 'true';
      target.src = fixImageUrl(list[i]);
      return;
    }
  }
}

/**
 * Erro de imagem para os carrosséis: tenta `.jpeg -> .jpg` e depois a
 * imagem de reserva padrão.
 */
export function handleCarouselImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallback: string = IMAGE_FALLBACK,
) {
  const target = e.currentTarget;
  if (target.src.endsWith('.jpeg')) {
    target.src = target.src.replace('.jpeg', '.jpg');
  } else if (!target.dataset.triedFallback) {
    target.dataset.triedFallback = 'true';
    target.src = fallback;
  }
}
