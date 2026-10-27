import { useState } from 'react';
import type { Video } from '../domain/types.ts';
import { usePrintMode } from '../lib/store.tsx';
import { Icon, formatDuration } from './ui.tsx';

/**
 * Vídeo complementar com carregamento sob demanda (facade): o player oficial
 * do YouTube (domínio youtube-nocookie.com) só é carregado após o clique.
 * Se a incorporação falhar ou estiver bloqueada, o link direto permanece.
 * Quando não houver vídeo, a ausência é exibida explicitamente.
 */
export function VideoCard({ video, topicFallback }: { video?: Video; topicFallback?: string }) {
  const print = usePrintMode();
  const [load, setLoad] = useState(false);

  if (!video) {
    return (
      <div className="card-surface p-4 text-sm" data-component="video-missing">
        <strong className="text-white">Vídeo complementar não disponível.</strong> Não foi encontrado vídeo verificado de até 3 minutos
        {topicFallback ? ` para “${topicFallback}”` : ''}. Espaço reservado para inclusão futura.
      </div>
    );
  }

  const meta = (
    <div className="text-sm">
      <div className="font-semibold text-white">{video.title}</div>
      <div className="text-mute print-muted">
        {video.channel} · {formatDuration(video.durationSeconds)} · {video.language}
      </div>
    </div>
  );

  if (print) {
    return (
      <div className="avoid-break rounded-lg border p-3 text-sm">
        {meta}
        <div>URL: {video.url}</div>
      </div>
    );
  }

  return (
    <div className="card-surface overflow-hidden" data-component="video">
      <div className="relative aspect-video w-full bg-black">
        {load ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1&autoplay=1&hl=pt-BR&cc_lang_pref=pt&cc_load_policy=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoad(true)}
            className="group absolute inset-0 grid place-items-center bg-gradient-to-br from-panel-2 to-ink text-white"
            aria-label={`Carregar vídeo: ${video.title}`}
          >
            <span className="flex flex-col items-center gap-3 px-6 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-brand shadow-xl transition-transform group-hover:scale-105">
                <Icon name="play" className="h-7 w-7" />
              </span>
              <span className="text-sm font-semibold">Carregar vídeo do YouTube ({formatDuration(video.durationSeconds)})</span>
              <span className="max-w-md text-xs text-mute">O player do YouTube é carregado apenas após o clique.</span>
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 p-4">
        {meta}
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-sm">
          Abrir no YouTube <Icon name="external" className="h-4 w-4" />
        </a>
      </div>
      <details className="border-t border-line px-4 py-3 text-sm">
        <summary className="cursor-pointer font-semibold text-white">Por que este vídeo?</summary>
        <p className="mt-1">{video.rationale}</p>
        <p className="mt-1 text-mute">
          Legendas: {video.captions}. Disponibilidade e incorporação verificadas em {new Date(video.verifiedAt + 'T12:00:00').toLocaleDateString('pt-BR')}.
        </p>
      </details>
    </div>
  );
}
