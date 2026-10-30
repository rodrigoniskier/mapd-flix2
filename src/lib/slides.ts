import type { ContentBlock, Episode, KeyTerm, Question } from '../domain/types.ts';

/** Um “slide” do modo apresentação de um episódio. */
export type Slide =
  | { kind: 'capa' }
  | { kind: 'pergunta' }
  | { kind: 'objetivos' }
  | { kind: 'conceitos'; title: string; terms: KeyTerm[] }
  | { kind: 'bloco'; title: string; block: ContentBlock }
  | { kind: 'questao'; question: Question; index: number }
  | { kind: 'sintese' }
  | { kind: 'video' }
  | { kind: 'referencias' };

const TERMS_PER_SLIDE = 4;

/** Converte a rolagem do episódio em uma sequência de slides (um bloco de conteúdo por slide). */
export function buildSlides(ep: Episode, hasVideo: boolean): Slide[] {
  const slides: Slide[] = [{ kind: 'capa' }, { kind: 'pergunta' }, { kind: 'objetivos' }];
  const pages = Math.max(1, Math.ceil(ep.keyTerms.length / TERMS_PER_SLIDE));
  for (let p = 0; p < pages; p++) {
    slides.push({
      kind: 'conceitos',
      title: pages > 1 ? `Conceitos fundamentais (${p + 1}/${pages})` : 'Conceitos fundamentais',
      terms: ep.keyTerms.slice(p * TERMS_PER_SLIDE, (p + 1) * TERMS_PER_SLIDE),
    });
  }
  for (const s of ep.sections) for (const block of s.blocks) slides.push({ kind: 'bloco', title: s.title, block });
  ep.activity.forEach((question, index) => slides.push({ kind: 'questao', question, index }));
  slides.push({ kind: 'sintese' });
  if (hasVideo) slides.push({ kind: 'video' });
  slides.push({ kind: 'referencias' });
  return slides;
}

export const clampSlide = (i: number, total: number) => Math.min(Math.max(0, i), Math.max(0, total - 1));
