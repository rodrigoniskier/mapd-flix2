import type { Reference } from '../domain/types.ts';

/**
 * Registro central de referências.
 *
 * - `obra-base` e `pedagogica`: fontes obrigatórias do projeto.
 * - `complementar` / `normativa`: complementação verificável, sempre
 *   identificada separadamente na interface (com DOI/PMID ou URL oficial).
 *
 * Localizações (capítulo/página) da obra-base só são registradas quando
 * puderam ser conferidas; as páginas dos caps. 16–17 vêm dos slides
 * "Revisão de Imunologia Clínica — UNIPÊ 2026" do próprio autor.
 */
export const BOOK = 'barbosa-2026';
export const ABEM = 'abem-2026';

export const references: Reference[] = [
  {
    id: BOOK,
    kind: 'obra-base',
    citation:
      'BARBOSA, Rodrigo Niskier Ferreira. Mecanismos de Agressão, Patológicos e de Defesa: Patologia Médica, Microbiologia e Imunologia Clínica. 1. ed. 2026. ISBN 9798187758487.',
    note:
      'Conteúdo conferido com o manuscrito da 1ª edição (arquivo “Mecanismos_de_Agressao_Patologicos_e_de_Defesa_1edicao.docx”, Google Drive do autor, versão de 10/07/2026): caps. 19 (tolerância e autoimunidade), 20 (hipersensibilidades e imunodeficiências) e 22 (casos integrados). Páginas dos caps. 16–17 conforme os slides do autor (UNIPÊ, 2026); o manuscrito não tem paginação, por isso os demais capítulos são citados sem página. Na versão do manuscrito, imunidade inata e adaptativa aparecem como caps. 17 e 18.',
  },
  {
    id: ABEM,
    kind: 'pedagogica',
    citation:
      'OLIVEIRA, S. S. et al. Caderno de Orientações para implementação das Diretrizes Curriculares Nacionais do Curso de Graduação em Medicina 2025. Brasília: Associação Brasileira de Educação Médica (Abem), 2026. 288 p. ISBN 978-65-86406-22-1.',
    url: 'https://website.abem-educmed.org.br/wp-content/uploads/2026/05/Caderno_de_orientacoes-para_implementacao_das_DCN.pdf',
    note:
      'Princípios adotados: competência como mobilização integrada de conhecimentos, habilidades e atitudes (p. 23–24); metodologias ativas e protagonismo do estudante (p. 24–26); avaliação contínua com devolutiva individual/feedback e domínios cognitivo, psicomotor e atitudinal (p. 26, Arts. 36–37); SUS como principal cenário de prática (p. 20–22); tecnologia digital que qualifica, sem substituir, o julgamento clínico, com proteção de dados (p. 36–40).',
  },
  {
    id: 'aringer-2019',
    kind: 'complementar',
    citation:
      'ARINGER, M. et al. 2019 European League Against Rheumatism/American College of Rheumatology Classification Criteria for Systemic Lupus Erythematosus. Arthritis & Rheumatology, v. 71, n. 9, p. 1400–1412, 2019.',
    doi: '10.1002/art.40930',
    pmid: '31385462',
    url: 'https://doi.org/10.1002/art.40930',
  },
  {
    id: 'aletaha-2010',
    kind: 'complementar',
    citation:
      'ALETAHA, D. et al. 2010 Rheumatoid arthritis classification criteria: an American College of Rheumatology/European League Against Rheumatism collaborative initiative. Arthritis & Rheumatism, v. 62, n. 9, p. 2569–2581, 2010.',
    doi: '10.1002/art.27584',
    pmid: '20872595',
    url: 'https://doi.org/10.1002/art.27584',
  },
  {
    id: 'chan-2015',
    kind: 'complementar',
    citation:
      'CHAN, E. K. L. et al. Report of the First International Consensus on Standardized Nomenclature of Antinuclear Antibody HEp-2 Cell Patterns (ICAP) 2014–2015. Frontiers in Immunology, v. 6, p. 412, 2015.',
    doi: '10.3389/fimmu.2015.00412',
    pmid: '26347739',
    url: 'https://doi.org/10.3389/fimmu.2015.00412',
  },
  {
    id: 'sakaguchi-1995',
    kind: 'complementar',
    citation:
      'SAKAGUCHI, S. et al. Immunologic self-tolerance maintained by activated T cells expressing IL-2 receptor alpha-chains (CD25). Journal of Immunology, v. 155, n. 3, p. 1151–1164, 1995.',
    pmid: '7636184',
    url: 'https://pubmed.ncbi.nlm.nih.gov/7636184/',
  },
  {
    id: 'tangye-2022',
    kind: 'complementar',
    citation:
      'TANGYE, S. G. et al. Human Inborn Errors of Immunity: 2022 Update on the Classification from the International Union of Immunological Societies Expert Committee. Journal of Clinical Immunology, v. 42, n. 7, p. 1473–1507, 2022.',
    doi: '10.1007/s10875-022-01289-3',
    pmid: '35748970',
    url: 'https://doi.org/10.1007/s10875-022-01289-3',
  },
  {
    id: 'cardona-2020',
    kind: 'complementar',
    citation:
      'CARDONA, V. et al. World Allergy Organization anaphylaxis guidance 2020. World Allergy Organization Journal, v. 13, n. 10, 100472, 2020.',
    doi: '10.1016/j.waojou.2020.100472',
    pmid: '33204386',
    url: 'https://doi.org/10.1016/j.waojou.2020.100472',
  },
  {
    id: 'valent-2012',
    kind: 'complementar',
    citation:
      'VALENT, P. et al. Definitions, criteria and global classification of mast cell disorders with special reference to mast cell activation syndromes: a consensus proposal. International Archives of Allergy and Immunology, v. 157, n. 3, p. 215–225, 2012.',
    doi: '10.1159/000328760',
    pmid: '22041891',
    url: 'https://doi.org/10.1159/000328760',
  },
  {
    id: 'picard-2015',
    kind: 'complementar',
    citation:
      'PICARD, M.; CASTELLS, M. C. Re-visiting Hypersensitivity Reactions to Taxanes: A Comprehensive Review. Clinical Reviews in Allergy & Immunology, v. 49, n. 2, p. 177–191, 2015.',
    doi: '10.1007/s12016-014-8416-0',
    pmid: '24740483',
    url: 'https://doi.org/10.1007/s12016-014-8416-0',
  },
  {
    id: 'castells-2008',
    kind: 'complementar',
    citation:
      'CASTELLS, M. C. et al. Hypersensitivity reactions to chemotherapy: outcomes and safety of rapid desensitization in 413 cases. Journal of Allergy and Clinical Immunology, v. 122, n. 3, p. 574–580, 2008.',
    doi: '10.1016/j.jaci.2008.02.044',
    pmid: '18502492',
    url: 'https://doi.org/10.1016/j.jaci.2008.02.044',
  },
  {
    id: 'lei-14154-2021',
    kind: 'normativa',
    citation:
      'BRASIL. Lei nº 14.154, de 26 de maio de 2021. Altera a Lei nº 8.069/1990 para aperfeiçoar o Programa Nacional de Triagem Neonatal (PNTN) — imunodeficiências primárias incluídas na etapa 4 da ampliação.',
    url: 'https://legis.senado.leg.br/norma/34012681/publicacao/34013642',
    note: 'A implantação das etapas é escalonada e pode variar entre os estados.',
  },
  {
    id: 'pcdt-portal',
    kind: 'normativa',
    citation:
      'BRASIL. Ministério da Saúde. Protocolos Clínicos e Diretrizes Terapêuticas (PCDT). Brasília: Ministério da Saúde.',
    url: 'https://www.gov.br/saude/pt-br/assuntos/pcdt',
    note: 'Consultar sempre a versão vigente de cada PCDT para elegibilidade e medicamentos disponíveis no SUS.',
  },
  {
    id: 'pcdt-ar-2021',
    kind: 'normativa',
    citation:
      'BRASIL. Ministério da Saúde. Portaria Conjunta SAES/SCTIE nº 16, de 3 de setembro de 2021. Protocolo Clínico e Diretrizes Terapêuticas da Artrite Reumatoide e da Artrite Idiopática Juvenil.',
    url: 'https://www.gov.br/saude/pt-br/assuntos/pcdt/a/artrite-reumatoide-e-artrite-idiopatica-juvenil-portaria-conjunta-no-16',
    note: 'Verificar atualizações posteriores do PCDT.',
  },
  {
    id: 'pcdt-idp-anticorpos',
    kind: 'normativa',
    citation:
      'BRASIL. Ministério da Saúde. Protocolo Clínico e Diretrizes Terapêuticas — Imunodeficiência primária com predominância de defeitos de anticorpos (imunoglobulina humana). 2013.',
    url: 'https://www.gov.br/saude/pt-br/assuntos/pcdt/arquivos/2007/imunodeficiencia-primaria-com-predominancia-de-defeitos-de-anticorpos-2013-imunoglobulina-humana-pcdt.pdf',
    note: 'Verificar versão vigente.',
  },
];

export const referenceById = new Map(references.map((r) => [r.id, r]));
