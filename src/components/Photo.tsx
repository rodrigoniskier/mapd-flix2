import { useState } from 'react';
import type { Photo as PhotoT } from '../data/media.ts';

/**
 * Fotografia com carregamento preguiçoso e fallback: se a imagem não carregar
 * (ex.: ambiente sem acesso aos arquivos), mostra um gradiente neutro.
 */
export function Photo({
  photo,
  className = '',
  eager = false,
  position = 'center',
  decorative = false,
}: {
  photo?: PhotoT;
  className?: string;
  eager?: boolean;
  position?: string;
  decorative?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (!photo || failed) {
    return <div className={`bg-gradient-to-br from-panel-2 via-panel to-ink ${className}`} aria-hidden="true" />;
  }
  return (
    <img
      src={photo.file}
      alt={decorative ? '' : photo.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
      style={{ objectPosition: position }}
      draggable={false}
    />
  );
}
