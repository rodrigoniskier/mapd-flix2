/**
 * Fotografias reais (Unsplash, licença Unsplash — uso livre, inclusive
 * educacional) e créditos. Arquivos em public/img/ (copiados para dist/img/).
 * Todas as pessoas retratadas são modelos/anônimos; nenhuma figura pública.
 */
export interface Photo {
  file: string;
  alt: string;
  author: string;
  unsplashId: string;
}

const P = (unsplashId: string, author: string, alt: string, file = unsplashId.replace(/^-/, '')): Photo => ({
  file: `img/${file}.webp`,
  alt,
  author,
  unsplashId,
});

export const photos = {
  // séries — billboards e pôsteres
  autoBillboard: P('iyeUwItlIPk', 'Vitaly Gariev', 'Médica conversa com paciente em consultório'),
  autoPoster: P('L7en7Lb-Ovc', 'National Cancer Institute', 'Células em imunofluorescência com núcleos corados'),
  idefBillboard: P('ZCO_5Y29s8k', 'Hush Naidoo Jade Photography', 'Profissional de saúde conduz incubadora neonatal por corredor hospitalar'),
  idefPoster: P('eKNswc0Qxz8', 'Hush Naidoo Jade Photography', 'Recém-nascido em incubadora sob luz azul'),
  hiperBillboard: P('0Fv4M2hSZJU', 'César Badilla Miranda', 'Profissional de saúde ajusta monitor multiparamétrico em leito'),
  hiperPoster: P('KlOvB5yZTs4', 'Aconitum', 'Letreiro vermelho de emergência iluminado à noite'),
  tumorPoster: P('ct10qdGv1hQ', 'National Cancer Institute', 'Silhueta de pesquisadora ao microscópio sob luz azul'),
  transplantePoster: P('KrsoedfRAf4', 'National Cancer Institute', 'Equipe cirúrgica realizando operação'),

  // episódios — Autoimunidade
  'auto-e1-autotolerancia': P('1PpyUZceg_I', 'National Cancer Institute', 'Células fluorescentes em microscopia'),
  'auto-e2-origem': P('mO1eipp0ah8', 'Chidera Faustina Okeke', 'Pesquisadora observa amostra ao microscópio'),
  'auto-e3-lesao': P('L7en7Lb-Ovc', 'National Cancer Institute', 'Células em imunofluorescência com núcleos corados'),
  'auto-e4-doencas': P('S52_QspnHYI', 'Sasun Bughdaryan', 'Pessoa segura a mão com dor articular'),
  'auto-e5-investigacao': P('0jE8ynV4mis', 'Testalize.me', 'Tubos de coleta de sangue em estante de laboratório'),
  'auto-e6-tratamento': P('tl447mekwuQ', 'National Cancer Institute', 'Médica conversa com paciente em clínica'),
  // Imunodeficiências
  'idef-e1-fundamentos': P('zna7XRjnc6k', 'National Institute of Allergy and Infectious Diseases', 'Micrografia eletrônica colorizada de célula imune e bactérias'),
  'idef-e2-primarias': P('oGJQt3-X_FY', 'CDC', 'Médica examina bebê com estetoscópio'),
  'idef-e3-secundarias': P('KMvoHcB-w5g', 'National Cancer Institute', 'Frascos de medicamentos e bolsa de infusão'),
  'idef-e4-manifestacoes': P('oCqGFVUpgm4', 'Vitaly Gariev', 'Médico ausculta o tórax de uma criança'),
  'idef-e5-diagnostico': P('xmRYcJAz8M0', 'Navy Medicine', 'Profissional de saúde coleta sangue do braço do paciente'),
  'idef-e6-tratamento': P('Hr01AKr8DG8', 'Gabriel Tovar', 'Profissional de saúde cuida de recém-nascido em unidade neonatal'),
  // Hipersensibilidades
  'hiper-e1-fundamentos': P('thDKGOx6jqs', 'Wolfgang Hasselmann', 'Dente-de-leão liberando sementes ao vento'),
  'hiper-e2-tipo1': P('-CDN2nTKfrA', 'Brittany Colette', 'Homem com rinite assoando o nariz'),
  'hiper-e3-tipo2': P('9T2jTUBAZj0', 'Navy Medicine', 'Bolsa de sangue para transfusão'),
  'hiper-e4-tipo3': P('OqnmlNYRWC0', 'Ben Maffin', 'Tubos de ensaio com amostras e seringa'),
  'hiper-e5-tipo4': P('tHS9j3HWT1s', 'Umanoide', 'Radiografia de tórax'),
  'hiper-e6-diagnostico': P('RlOAwXt2fEA', 'Julia Koblitz', 'Cientista pipeta amostras em laboratório'),
  'hiper-e7-tratamento': P('cM1aU42FnRg', 'Mufid Majnun', 'Mão enluvada aspira medicamento de frasco com seringa'),

  // casos clínicos
  'caso-a': P('MJmsLpeHPfg', 'Vitaly Gariev', 'Médica atende paciente em consultório'),
  'caso-b': P('74-7j5t4sG0', 'Alexander Grey', 'Bebê em incubadora neonatal'),
  'caso-c': P('6pcGTJDuf6M', 'Marcelo Leal', 'Suporte de soro com bolsa de infusão'),

  // desafios clínicos
  'quiz-autoimunidade': P('JxoWb7wHqnA', 'National Cancer Institute', 'Pesquisadora observa lâmina ao microscópio'),
  'quiz-imunodeficiencias': P('UJHANmlaHwc', 'Vitaly Gariev', 'Cientistas examinam tubo de ensaio em laboratório'),
  'quiz-hipersensibilidades': P('nAnEMa-tnus', 'LEDC', 'Entrada de emergência de hospital'),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export const photoFor = (key: string): Photo | undefined => (photos as Record<string, Photo>)[key];

export const seriesArt: Record<string, { billboard: Photo; poster: Photo }> = {
  autoimunidade: { billboard: photos.autoBillboard, poster: photos.autoPoster },
  imunodeficiencias: { billboard: photos.idefBillboard, poster: photos.idefPoster },
  hipersensibilidades: { billboard: photos.hiperBillboard, poster: photos.hiperPoster },
  'imunidade-antitumoral': { billboard: photos.tumorPoster, poster: photos.tumorPoster },
  'imunidade-transplantes': { billboard: photos.transplantePoster, poster: photos.transplantePoster },
};

export const unsplashUrl = (p: Photo) => `https://unsplash.com/photos/${p.unsplashId}`;

/** Perfil do autor (dados fornecidos pelo próprio professor). */
export const professor = {
  name: 'Prof. Rodrigo Niskier Ferreira Barbosa',
  shortName: 'Rodrigo',
  title: 'Professor de Medicina — Mecanismos de Agressão, Patológicos e de Defesa',
  institution: 'UNIPÊ — Centro Universitário de João Pessoa',
  email: 'rodrigo.niskier@unipe.edu.br',
  book: 'Autor de “Mecanismos de Agressão, Patológicos e de Defesa” (1ª ed., 2026)',
  photo: 'img/prof-rodrigo.webp',
};
