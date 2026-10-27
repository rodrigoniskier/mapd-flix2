import type { Video } from '../domain/types.ts';

/**
 * Vídeos complementares — um por série.
 *
 * Todos foram verificados em 27/10/2026 diretamente no YouTube (metadados do
 * player oficial): status "OK", `playableInEmbed: true` e duração ≤ 180 s.
 * A plataforma não depende dos vídeos: se a incorporação falhar, o card
 * exibe link direto para o YouTube.
 */
export const videos: Video[] = [
  {
    id: 'video-autoimunidade',
    youtubeId: 'A5umO_DDdtI',
    title: 'What does “autoimmune” mean? | Boston Children’s Neuroimmunology Center',
    channel: 'Boston Children’s Hospital',
    durationSeconds: 120,
    language: 'Inglês',
    captions: 'Legendas em inglês (manuais); tradução automática para português disponível no player',
    url: 'https://www.youtube.com/watch?v=A5umO_DDdtI',
    topic: 'Conceito de autoimunidade: perda da tolerância e ataque a tecidos próprios',
    episodeIds: ['auto-e1-autotolerancia', 'auto-e2-origem'],
    rationale:
      'Animação institucional de hospital pediátrico universitário (Harvard) que introduz, em 2 minutos, a ideia central da série: o sistema imune passa a reconhecer o próprio como alvo. Serve como “abertura” antes do Episódio 1; os mecanismos de tolerância são aprofundados nos episódios.',
    verifiedAt: '2026-10-27',
    embeddable: true,
  },
  {
    id: 'video-imunodeficiencias',
    youtubeId: 'Vwu2SOShROE',
    title: 'Semana Mundial dos Erros Inatos da Imunidade (EII) 2025 | Por Dra. Anete Grumach',
    channel: 'ASBAI Alergia (Associação Brasileira de Alergia e Imunologia)',
    durationSeconds: 113,
    language: 'Português (Brasil)',
    captions: 'Legendas automáticas em português',
    url: 'https://www.youtube.com/watch?v=Vwu2SOShROE',
    topic: 'Sinais de alerta para os erros inatos da imunidade',
    episodeIds: ['idef-e1-fundamentos', 'idef-e4-manifestacoes'],
    rationale:
      'Vídeo em português de sociedade científica brasileira sobre sinais de alerta e diagnóstico precoce dos erros inatos da imunidade — diretamente ligado aos Episódios 1 e 4 e ao Caso Clínico B.',
    verifiedAt: '2026-10-27',
    embeddable: true,
  },
  {
    id: 'video-hipersensibilidades',
    youtubeId: '6N285p5W0-k',
    title: 'ASBAI | Anafilaxia',
    channel: 'ASBAI Alergia (Associação Brasileira de Alergia e Imunologia)',
    durationSeconds: 95,
    language: 'Português (Brasil)',
    captions: 'Legendas automáticas em português',
    url: 'https://www.youtube.com/watch?v=6N285p5W0-k',
    topic: 'Anafilaxia: reconhecimento e conduta',
    episodeIds: ['hiper-e2-tipo1', 'hiper-e6-diagnostico', 'hiper-e7-tratamento'],
    rationale:
      'Explicação em português por membro do Departamento Científico de Anafilaxia da ASBAI (Dra. Maria Cecília Figueira). Complementa os Episódios 2, 6 e 7 e o Caso Clínico C.',
    verifiedAt: '2026-10-27',
    embeddable: true,
  },
];

export const videoById = new Map(videos.map((v) => [v.id, v]));
