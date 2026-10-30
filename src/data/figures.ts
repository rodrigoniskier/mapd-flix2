/**
 * Figuras didáticas rasterizadas (WebP, 1536×1024) em public/img/figuras/<id>.webp,
 * geradas por IA a partir de roteiro editorial e revisadas. Têm precedência sobre os SVG
 * de src/illustrations, que permanecem como alternativa para ids sem imagem.
 */
export const rasterFigureIds: ReadonlySet<string> = new Set([
  'timo-selecao', 'treg-supressao', 'mimetismo-molecular', 'mecanismos-lesao-autoimune', 'anticorpo-estrutura',
  'fan-padroes', 'complemento-vias', 'imunossupressao-alvos', 'imunidade-camadas', 'linfocitos-b-t-defeitos',
  'hiv-cd4', 'citometria-subpopulacoes', 'gell-coombs', 'mastocito-degranulacao', 'tipo2-citotoxicidade',
  'imunocomplexo-deposicao', 'tipo4-celular', 'triptase-curva', 'anafilaxia-adrenalina',
]);

export const figureSrc = (id: string): string | undefined => (rasterFigureIds.has(id) ? `img/figuras/${id}.webp` : undefined);
