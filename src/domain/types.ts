/**
 * Modelo de dados do MAPD-Flix.
 *
 * Todo o conteúdo educacional vive em `src/data/**` como dados estruturados
 * que obedecem a estes tipos. Os componentes visuais apenas interpretam esses
 * dados — incluir uma série, episódio, caso ou questão nova não exige alterar
 * componentes.
 */

/* ------------------------------------------------------------------ */
/* Referências                                                         */
/* ------------------------------------------------------------------ */

export type ReferenceKind =
  /** Obra-base obrigatória (livro do Prof. Niskier). */
  | 'obra-base'
  /** Orientação pedagógica (Caderno ABEM/DCN 2025). */
  | 'pedagogica'
  /** Complementação científica verificável, identificada separadamente. */
  | 'complementar'
  /** Normativa/política pública brasileira. */
  | 'normativa';

export interface Reference {
  id: string;
  kind: ReferenceKind;
  /** Citação formatada (ABNT simplificada). */
  citation: string;
  /** Capítulo/páginas específicos quando aplicável. */
  locator?: string;
  url?: string;
  /** DOI/PMID quando houver — permitem verificação independente. */
  doi?: string;
  pmid?: string;
  /** Observação editorial, ex.: conferência pendente com a obra impressa. */
  note?: string;
}

/** Citação usada num episódio: referência + localização opcional. */
export interface Citation {
  ref: string;
  locator?: string;
}

/* ------------------------------------------------------------------ */
/* Recursos visuais e vídeo                                            */
/* ------------------------------------------------------------------ */

export type IllustrationId = string;

export interface Hotspot {
  /** Coordenadas em % da largura/altura da ilustração. */
  x: number;
  y: number;
  label: string;
  detail: string;
}

export interface VisualResource {
  illustration: IllustrationId;
  alt: string;
  caption?: string;
  /** Imagem anotada: pontos clicáveis com explicação. */
  hotspots?: Hotspot[];
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  /** Duração verificada em segundos (≤ 180). */
  durationSeconds: number;
  language: string;
  captions: string;
  url: string;
  topic: string;
  /** Episódios em que o vídeo é exibido como complemento. */
  episodeIds: string[];
  rationale: string;
  /** Data (ISO) em que disponibilidade e incorporação foram verificadas. */
  verifiedAt: string;
  embeddable: boolean;
}

/* ------------------------------------------------------------------ */
/* Perguntas, alternativas e feedback                                  */
/* ------------------------------------------------------------------ */

export interface Option {
  id: string;
  text: string;
  /** Explicação específica desta alternativa (por que certa ou errada). */
  feedback: string;
}

export interface Question {
  id: string;
  /** Vinheta clínica opcional (contexto). */
  stem?: string;
  prompt: string;
  options: Option[];
  correctOptionId: string;
  /** Justificativa científica da alternativa correta. */
  explanation: string;
  /** Episódios relacionados — usados para recomendar revisão em caso de erro. */
  relatedEpisodes: string[];
  /** Temas/competências avaliados. */
  tags: string[];
}

/* ------------------------------------------------------------------ */
/* Blocos de conteúdo                                                  */
/* ------------------------------------------------------------------ */

export type CalloutVariant = 'clinica' | 'atencao' | 'sus' | 'distincao' | 'conceito';

export type ContentBlock =
  | { type: 'text'; title?: string; paragraphs: string[] }
  | { type: 'expandable'; title?: string; items: { title: string; body: string }[] }
  | { type: 'flow'; title: string; intro?: string; steps: { label: string; detail: string }[] }
  | { type: 'timeline'; title: string; events: { time: string; label: string; detail: string }[] }
  | { type: 'compare'; title: string; columns: string[]; rows: { label: string; cells: string[] }[]; note?: string }
  | { type: 'figure'; visual: VisualResource }
  | { type: 'chain'; title?: string; links: { stage: ChainStage; text: string }[] }
  | { type: 'callout'; variant: CalloutVariant; title: string; body: string }
  | { type: 'list'; title?: string; ordered?: boolean; items: string[] };

/** Cadeia causal exigida pelo projeto pedagógico. */
export type ChainStage =
  | 'mecanismo'
  | 'alteracao'
  | 'lesao'
  | 'manifestacao'
  | 'investigacao'
  | 'conduta';

export interface KeyTerm {
  term: string;
  definition: string;
}

/** Seção de conteúdo de um episódio (agrupa blocos). */
export interface Section {
  id: string;
  title: string;
  /** Papel pedagógico da seção. */
  role: 'conceitos' | 'mecanismos' | 'visual' | 'aplicacao' | 'aprofundamento';
  blocks: ContentBlock[];
}

/* ------------------------------------------------------------------ */
/* Catálogo                                                            */
/* ------------------------------------------------------------------ */

export interface Episode {
  id: string;
  seriesId: string;
  /** Número dentro da série (1..n). */
  number: number;
  title: string;
  tagline: string;
  /** Ilustração da capa do episódio. */
  cover: IllustrationId;
  durationMinutes: number;
  guidingQuestion: string;
  objectives: string[];
  keyTerms: KeyTerm[];
  sections: Section[];
  /** Atividade interativa de fixação. */
  activity: Question[];
  synthesis: string[];
  citations: Citation[];
  /** Termos adicionais para a busca. */
  keywords: string[];
}

export type SeriesStatus = 'disponivel' | 'em-breve';

export interface SeriesTheme {
  /** Cores (hex) usadas em capas e acentos. */
  from: string;
  via: string;
  to: string;
  accent: string;
  motif: 'autoimunidade' | 'imunodeficiencia' | 'hipersensibilidade' | 'tumor' | 'transplante';
}

export interface Season {
  number: number;
  title: string;
  episodeIds: string[];
}

export interface Series {
  id: string;
  slug: string;
  order: number;
  status: SeriesStatus;
  title: string;
  shortTitle: string;
  tagline: string;
  synopsis: string;
  learningObjectives: string[];
  theme: SeriesTheme;
  /** Temporadas — preparado para expansão; hoje cada série tem uma. */
  seasons: Season[];
  caseId?: string;
  quizId?: string;
  videoId?: string;
  citations: Citation[];
  /** Competências (DCN/ABEM) trabalhadas. */
  competencies: string[];
}

/* ------------------------------------------------------------------ */
/* Casos clínicos                                                      */
/* ------------------------------------------------------------------ */

export interface CaseFinding {
  label: string;
  value: string;
  /** Destaque de valor alterado. */
  flag?: 'alto' | 'baixo' | 'alterado' | 'normal';
  reference?: string;
}

export interface DecisionOption {
  id: string;
  text: string;
  /** prioritaria = melhor conduta; aceitavel = razoável, não prioritária; inadequada = erro/atraso. */
  quality: 'prioritaria' | 'aceitavel' | 'inadequada';
  consequence: string;
  rationale: string;
}

export interface Decision {
  prompt: string;
  options: DecisionOption[];
}

export interface CaseStep {
  id: string;
  title: string;
  narrative: string[];
  findings?: CaseFinding[];
  visual?: VisualResource;
  decision?: Decision;
  /** Reflexão didática ao final da etapa. */
  teachingPoint?: string;
  /** Marca a etapa de elucidação diagnóstica (só revelada ao final). */
  reveal?: boolean;
}

export interface ClinicalCase {
  id: string;
  seriesId: string;
  title: string;
  /** Título não revela o diagnóstico. */
  hook: string;
  setting: string;
  objectives: string[];
  steps: CaseStep[];
  relatedEpisodes: string[];
  citations: Citation[];
  /** Aviso didático (caso fictício, condutas em contexto educacional). */
  disclaimer: string;
}

/* ------------------------------------------------------------------ */
/* Quizzes                                                             */
/* ------------------------------------------------------------------ */

export interface Quiz {
  id: string;
  seriesId: string;
  title: string;
  tagline: string;
  description: string;
  questions: Question[];
  citations: Citation[];
}

export interface QuizAnswer {
  questionId: string;
  optionId: string;
  correct: boolean;
}

export interface QuizResult {
  quizId: string;
  total: number;
  correct: number;
  percent: number;
  answers: QuizAnswer[];
  /** Episódios recomendados para revisão, ordenados por número de erros. */
  reviewEpisodes: { episodeId: string; misses: number }[];
  reviewTags: string[];
  finishedAt: string;
}
