import type { Episode, Series } from '../../domain/types.ts';
import { ABEM, BOOK } from '../references.ts';

export const hipersensibilidadesSeries: Series = {
  id: 'hipersensibilidades',
  slug: 'hipersensibilidades',
  order: 3,
  status: 'disponivel',
  title: 'Hipersensibilidades',
  shortTitle: 'Hipersensibilidades',
  tagline: 'Quando a resposta imune é exagerada ou mal direcionada — e o dano vem da própria defesa.',
  synopsis:
    'Da coceira de uma dermatite de contato à anafilaxia durante uma infusão de quimioterapia, as hipersensibilidades mostram que os mesmos circuitos que nos protegem podem ferir. Em sete episódios e um caso clínico de emergência, a série percorre a classificação de Gell e Coombs como uma ferramenta de raciocínio — não de memorização — e termina na beira do leito: reconhecer, tratar com adrenalina sem atraso, investigar e prevenir.',
  learningObjectives: [
    'Explicar sensibilização, memória e reexposição como base das hipersensibilidades.',
    'Diferenciar os mecanismos dos tipos I a IV e prever suas manifestações.',
    'Reconhecer anafilaxia por critérios clínicos e tratá-la prontamente com adrenalina intramuscular.',
    'Interpretar triptase e testes de sensibilização no contexto clínico.',
    'Planejar prevenção, observação e dessensibilização em situações selecionadas.',
  ],
  theme: { from: '#1a0b14', via: '#7f1d1d', to: '#f97316', accent: '#fb923c', motif: 'hipersensibilidade' },
  seasons: [
    {
      number: 1,
      title: 'Temporada 1 — Quatro mecanismos, uma emergência',
      episodeIds: [
        'hiper-e1-fundamentos',
        'hiper-e2-tipo1',
        'hiper-e3-tipo2',
        'hiper-e4-tipo3',
        'hiper-e5-tipo4',
        'hiper-e6-diagnostico',
        'hiper-e7-tratamento',
      ],
    },
  ],
  caseId: 'caso-c',
  quizId: 'quiz-hipersensibilidades',
  videoId: 'video-hipersensibilidades',
  citations: [{ ref: BOOK, locator: 'cap. 20 (Hipersensibilidades); cap. 17, p. 118–120 (Th2, anticorpos)' }, { ref: ABEM }],
  competencies: [
    'Reconhecimento e manejo inicial de emergências (anafilaxia)',
    'Raciocínio fisiopatológico aplicado a quadros alérgicos e imunomediados',
    'Segurança do paciente na prescrição e administração de medicamentos',
  ],
};

export const hipersensibilidadesEpisodes: Episode[] = [
  {
    id: 'hiper-e1-fundamentos',
    seriesId: 'hipersensibilidades',
    number: 1,
    title: 'Fundamentos das hipersensibilidades',
    tagline: 'A primeira exposição prepara; a segunda revela.',
    cover: 'gell-coombs',
    durationMinutes: 16,
    guidingQuestion: 'Por que a maioria das reações de hipersensibilidade não ocorre na primeira exposição ao antígeno?',
    objectives: [
      'Definir hipersensibilidade como resposta exacerbada ou inadequada que causa lesão.',
      'Diferenciar antígeno, alérgeno e hapteno.',
      'Explicar sensibilização, memória e reexposição.',
      'Usar a classificação de Gell e Coombs como ferramenta de raciocínio.',
    ],
    keyTerms: [
      { term: 'Hipersensibilidade', definition: 'Resposta imune exagerada ou inadequada a um antígeno, que causa lesão tecidual ou disfunção.' },
      { term: 'Alérgeno', definition: 'Antígeno, geralmente inofensivo, capaz de induzir resposta IgE em indivíduos predispostos (ácaros, pólens, alimentos, venenos, fármacos).' },
      { term: 'Hapteno', definition: 'Molécula pequena que só se torna imunogênica ao se ligar a proteínas carreadoras (ex.: penicilina, níquel).' },
      { term: 'Sensibilização', definition: 'Primeira exposição que gera linfócitos de memória e/ou anticorpos específicos, sem sintomas importantes.' },
      { term: 'Atopia', definition: 'Predisposição genética a produzir IgE contra alérgenos ambientais comuns.' },
    ],
    sections: [
      {
        id: 'conceitos',
        title: 'Sensibilização e reexposição',
        role: 'mecanismos',
        blocks: [
          {
            type: 'timeline',
            title: 'Do primeiro contato à reação',
            events: [
              { time: 'Exposição 1', label: 'Sensibilização', detail: 'O antígeno é apresentado por células dendríticas; linfócitos T auxiliares orientam a resposta (ex.: Th2 → IgE; Th1 → macrófagos). Formam-se memória e/ou anticorpos. Em geral, sem sintomas.' },
              { time: 'Intervalo', label: 'Memória', detail: 'Linfócitos de memória e plasmócitos persistem; na alergia tipo I, IgE fica ligada a mastócitos via FcεRI, “armando” a célula.' },
              { time: 'Reexposição', label: 'Reação', detail: 'A resposta secundária é mais rápida e intensa. O mecanismo efetor (IgE, IgG/IgM, imunocomplexos ou linfócitos T) define o tipo e o tempo de início.' },
            ],
          },
          {
            type: 'callout',
            variant: 'distincao',
            title: 'Exceções importantes',
            body: 'Algumas reações ocorrem na primeira exposição aparente: sensibilização prévia não percebida (reatividade cruzada), ativação direta de mastócitos (ex.: via MRGPRX2 por alguns fármacos) ou ativação do complemento por veículos de medicamentos. Esses mecanismos **não mediados por IgE** são importantes nas reações a fármacos.',
          },
        ],
      },
      {
        id: 'gell',
        title: 'Classificação de Gell e Coombs',
        role: 'visual',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'gell-coombs',
              alt: 'Quatro quadros: tipo I com IgE em mastócito liberando grânulos; tipo II com anticorpos sobre a superfície de uma célula; tipo III com imunocomplexos depositados na parede de um vaso; tipo IV com linfócito T ativando macrófago.',
              caption: 'Os quatro tipos clássicos. Na prática, mais de um mecanismo pode coexistir.',
              hotspots: [
                { x: 45, y: 9, label: 'Tipo I — imediata', detail: 'IgE + mastócitos/basófilos. Minutos. Urticária, angioedema, broncoespasmo, anafilaxia.' },
                { x: 94, y: 9, label: 'Tipo II — citotóxica', detail: 'IgG/IgM contra antígenos de superfície ou da matriz. Lise, fagocitose ou alteração de receptores. Horas a dias.' },
                { x: 45, y: 58, label: 'Tipo III — imunocomplexos', detail: 'Complexos circulantes depositam-se em vasos/glomérulos; complemento e neutrófilos. Dias a semanas.' },
                { x: 94, y: 58, label: 'Tipo IV — tardia', detail: 'Linfócitos T (Th1, Th17, CD8+) e macrófagos. 24–72 horas ou mais.' },
              ],
            },
          },
          {
            type: 'compare',
            title: 'Comparador dos quatro tipos',
            columns: ['Tipo I', 'Tipo II', 'Tipo III', 'Tipo IV'],
            rows: [
              { label: 'Mediador', cells: ['IgE', 'IgG/IgM contra célula/matriz', 'Imunocomplexos IgG', 'Linfócitos T'] },
              { label: 'Efetores', cells: ['Mastócitos, basófilos, eosinófilos', 'Complemento, fagócitos, NK (ADCC)', 'Complemento (C5a), neutrófilos', 'Macrófagos, citocinas, CD8+'] },
              { label: 'Início', cells: ['Minutos (fase tardia em horas)', 'Horas a dias', 'Dias (ex.: 7–14 d na doença do soro)', '24–72 h ou mais'] },
              { label: 'Exemplos', cells: ['Anafilaxia, asma alérgica, rinite', 'AHAI, reação transfusional, Graves, miastenia', 'Doença do soro, nefrite lúpica, Arthus', 'Dermatite de contato, PPD, rejeição celular'] },
            ],
          },
          {
            type: 'callout',
            variant: 'conceito',
            title: 'Classificação é ferramenta, não fim',
            body: 'O valor da classificação é prever **tempo de início, órgãos acometidos, exames úteis e tratamento**. Muitas doenças (como o LES) combinam mecanismos. Para reações a fármacos, classificações mais recentes por endótipos ampliam Gell e Coombs.',
          },
        ],
      },
      {
        id: 'aplicacao',
        title: 'Aplicação clínica',
        role: 'aplicacao',
        blocks: [
          {
            type: 'chain',
            links: [
              { stage: 'mecanismo', text: 'Sensibilização prévia gera IgE específica para veneno de himenóptero.' },
              { stage: 'alteracao', text: 'Na nova picada, o veneno faz ligação cruzada de IgE em mastócitos.' },
              { stage: 'lesao', text: 'Mediadores causam vasodilatação, aumento de permeabilidade e broncoconstrição.' },
              { stage: 'manifestacao', text: 'Urticária generalizada, dispneia e hipotensão em minutos.' },
              { stage: 'investigacao', text: 'Diagnóstico clínico; triptase sérica; depois IgE específica e testes cutâneos.' },
              { stage: 'conduta', text: 'Adrenalina IM imediata; depois, encaminhamento para imunoterapia com veneno.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'hiper-e1-q1',
        prompt: 'Por que a dermatite de contato ao níquel aparece 48 horas após o contato com uma bijuteria?',
        options: [
          { id: 'a', text: 'Porque a IgE demora 48 horas para ser produzida', feedback: 'A dermatite de contato não é mediada por IgE.' },
          { id: 'b', text: 'Porque é mediada por linfócitos T de memória, que precisam ser recrutados, ativados e produzir citocinas', feedback: 'Correto: hipersensibilidade tipo IV, tardia por natureza.' },
          { id: 'c', text: 'Porque os imunocomplexos precisam se depositar', feedback: 'Imunocomplexos não são o mecanismo da dermatite de contato.' },
          { id: 'd', text: 'Porque o níquel é tóxico diretamente', feedback: 'A reação é imunológica (hapteno), não toxicidade direta.' },
        ],
        correctOptionId: 'b',
        explanation: 'Na hipersensibilidade tipo IV, o tempo reflete recrutamento e ativação de linfócitos T e macrófagos — por isso 24–72 horas.',
        relatedEpisodes: ['hiper-e1-fundamentos', 'hiper-e5-tipo4'],
        tags: ['Gell e Coombs', 'tempo de início'],
      },
    ],
    synthesis: [
      'Hipersensibilidade = resposta imune que lesa; geralmente exige sensibilização prévia.',
      'Gell e Coombs: I (IgE), II (anticorpo contra célula), III (imunocomplexos), IV (linfócitos T).',
      'O mecanismo prevê tempo de início, órgãos-alvo, exames e tratamento.',
      'Reações não mediadas por IgE podem ocorrer sem sensibilização prévia.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 20 — Hipersensibilidades' },
      { ref: BOOK, locator: 'cap. 17, p. 118–119 — Th1, Th2, Th17' },
      { ref: ABEM },
    ],
    keywords: ['Gell e Coombs', 'alérgeno', 'hapteno', 'sensibilização', 'atopia', 'MRGPRX2'],
  },

  {
    id: 'hiper-e2-tipo1',
    seriesId: 'hipersensibilidades',
    number: 2,
    title: 'Hipersensibilidade tipo I',
    tagline: 'IgE armada, mastócito pronto: minutos separam o contato da crise.',
    cover: 'mastocito-degranulacao',
    durationMinutes: 20,
    guidingQuestion: 'Como uma ligação molecular na superfície de um mastócito pode, em minutos, causar choque?',
    objectives: [
      'Descrever a resposta Th2, a troca de classe para IgE e a ligação ao FcεRI.',
      'Explicar a degranulação e os mediadores pré-formados e neoformados.',
      'Diferenciar fase imediata e tardia.',
      'Relacionar mediadores a broncoconstrição, urticária e anafilaxia.',
    ],
    keyTerms: [
      { term: 'FcεRI', definition: 'Receptor de alta afinidade para IgE em mastócitos e basófilos; a ligação cruzada de IgE por alérgeno ativa a célula.' },
      { term: 'Degranulação', definition: 'Liberação do conteúdo de grânulos pré-formados (histamina, triptase, heparina) em segundos a minutos.' },
      { term: 'Leucotrienos', definition: 'Mediadores lipídicos neoformados (LTC4, LTD4) com potente broncoconstrição e aumento de permeabilidade.' },
      { term: 'Prostaglandina D2', definition: 'Mediador lipídico de mastócitos: broncoconstrição e vasodilatação.' },
      { term: 'Fase tardia', definition: 'Inflamação 4–12 horas após a reação imediata, com eosinófilos, Th2 e neutrófilos.' },
      { term: 'Anafilaxia', definition: 'Reação de hipersensibilidade sistêmica grave, de início rápido, potencialmente fatal.' },
    ],
    sections: [
      {
        id: 'sensibilizacao',
        title: 'Sensibilização: o caminho até a IgE',
        role: 'mecanismos',
        blocks: [
          {
            type: 'flow',
            title: 'Etapas da sensibilização tipo I',
            steps: [
              { label: 'Alérgeno atravessa a barreira', detail: 'Em mucosa ou pele com barreira comprometida; células epiteliais liberam alarminas (IL-33, IL-25, TSLP).' },
              { label: 'Célula dendrítica apresenta', detail: 'Peptídeos do alérgeno são apresentados em MHC II a linfócitos T CD4+ naïve.' },
              { label: 'Diferenciação Th2', detail: 'Na presença de IL-4, linfócitos T tornam-se Th2 (IL-4, IL-5, IL-13). Tfh produtoras de IL-4 auxiliam os linfócitos B.' },
              { label: 'Troca de classe para IgE', detail: 'IL-4/IL-13 + CD40L induzem linfócitos B a produzir IgE específica. A especificidade é a mesma — muda apenas a classe (e a função).' },
              { label: 'IgE “arma” os mastócitos', detail: 'IgE liga-se ao FcεRI de mastócitos teciduais e basófilos, onde pode permanecer por longos períodos.' },
            ],
          },
        ],
      },
      {
        id: 'degranulacao',
        title: 'Reexposição: degranulação',
        role: 'visual',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'mastocito-degranulacao',
              alt: 'Mastócito com moléculas de IgE ligadas ao receptor FcεRI; um alérgeno multivalente faz ligação cruzada entre duas IgE, desencadeando a liberação de grânulos de histamina e triptase e a síntese de leucotrienos e prostaglandinas.',
              caption: 'A ligação cruzada de IgE adjacentes pelo alérgeno ativa o mastócito.',
              hotspots: [
                { x: 30, y: 18, label: 'Ligação cruzada', detail: 'O alérgeno precisa ligar pelo menos duas IgE vizinhas no FcεRI para agregar receptores e iniciar a sinalização (tirosinas-quinases Lyn e Syk).' },
                { x: 93, y: 30, label: 'Pré-formados', detail: 'Histamina (vasodilatação, permeabilidade, prurido, broncoconstrição), triptase (marcador laboratorial), heparina.' },
                { x: 62, y: 70, label: 'Neoformados', detail: 'Leucotrienos C4/D4 e prostaglandina D2 (broncoconstrição mais duradoura), PAF.' },
                { x: 37, y: 80, label: 'Citocinas', detail: 'TNF, IL-4, IL-5, IL-13: recrutam eosinófilos e sustentam a fase tardia.' },
              ],
            },
          },
          {
            type: 'compare',
            title: 'Mediadores e efeitos',
            columns: ['Origem', 'Efeitos principais', 'Relevância clínica'],
            rows: [
              { label: 'Histamina', cells: ['Pré-formada', 'Vasodilatação, permeabilidade, prurido, contração de músculo liso', 'Urticária, angioedema, hipotensão; alvo dos anti-histamínicos H1'] },
              { label: 'Triptase', cells: ['Pré-formada', 'Protease do mastócito', 'Marcador laboratorial de ativação mastocitária'] },
              { label: 'Leucotrienos (LTC4/D4)', cells: ['Neoformados (lipídicos)', 'Broncoconstrição intensa e prolongada, secreção de muco', 'Asma; alvo de antileucotrienos'] },
              { label: 'Prostaglandina D2', cells: ['Neoformada', 'Broncoconstrição, vasodilatação', 'Contribui para rubor e broncoespasmo'] },
              { label: 'PAF', cells: ['Neoformado', 'Aumento de permeabilidade, agregação plaquetária', 'Associado à gravidade da anafilaxia'] },
            ],
          },
        ],
      },
      {
        id: 'fases',
        title: 'Fase imediata e fase tardia',
        role: 'mecanismos',
        blocks: [
          {
            type: 'timeline',
            title: 'Linha do tempo de uma crise de asma alérgica',
            events: [
              { time: '0–30 min', label: 'Fase imediata', detail: 'Degranulação: broncoconstrição, edema de mucosa, secreção. Responde a broncodilatadores.' },
              { time: '4–12 h', label: 'Fase tardia', detail: 'Recrutamento de eosinófilos, Th2 e neutrófilos; nova obstrução, mais inflamatória.' },
              { time: 'Repetição', label: 'Inflamação crônica', detail: 'Exposições repetidas levam a remodelamento brônquico e hiper-responsividade.' },
            ],
          },
        ],
      },
      {
        id: 'anafilaxia',
        title: 'Anafilaxia: o tipo I sistêmico',
        role: 'aplicacao',
        blocks: [
          {
            type: 'chain',
            links: [
              { stage: 'mecanismo', text: 'Ligação cruzada maciça de IgE em mastócitos de múltiplos órgãos.' },
              { stage: 'alteracao', text: 'Vasodilatação e extravasamento plasmático (até grande parte do volume em minutos), broncoconstrição.' },
              { stage: 'lesao', text: 'Hipoperfusão tecidual, edema de vias aéreas.' },
              { stage: 'manifestacao', text: 'Urticária/angioedema, estridor, sibilância, hipotensão, síncope, vômitos.' },
              { stage: 'investigacao', text: 'Diagnóstico clínico imediato; triptase colhida sem atrasar o tratamento.' },
              { stage: 'conduta', text: 'Adrenalina intramuscular na face anterolateral da coxa, posicionamento e suporte.' },
            ],
          },
          {
            type: 'callout',
            variant: 'atencao',
            title: 'A pele pode estar normal',
            body: 'Até uma parcela dos casos de anafilaxia ocorre sem manifestações cutâneas, especialmente quando predomina hipotensão. A ausência de urticária não afasta o diagnóstico.',
          },
        ],
      },
    ],
    activity: [
      {
        id: 'hiper-e2-q1',
        prompt: 'Por que um anti-histamínico H1 isoladamente não reverte o broncoespasmo e a hipotensão da anafilaxia?',
        options: [
          { id: 'a', text: 'Porque a anafilaxia não envolve histamina', feedback: 'A histamina participa, mas não é o único mediador.' },
          { id: 'b', text: 'Porque leucotrienos, PAF e prostaglandinas também atuam, e o anti-H1 não tem efeito vasoconstritor nem broncodilatador direto', feedback: 'Correto: apenas a adrenalina contrapõe simultaneamente vasodilatação, edema e broncoconstrição.' },
          { id: 'c', text: 'Porque o anti-H1 só funciona por via oral', feedback: 'Existem formulações parenterais; o problema é o mecanismo de ação limitado.' },
          { id: 'd', text: 'Porque a IgE bloqueia o anti-histamínico', feedback: 'Não há essa interação.' },
        ],
        correctOptionId: 'b',
        explanation: 'Múltiplos mediadores agem em paralelo. A adrenalina (α1: vasoconstrição; β2: broncodilatação e estabilização de mastócitos; β1: inotropismo) é o tratamento de primeira linha.',
        relatedEpisodes: ['hiper-e2-tipo1', 'hiper-e7-tratamento'],
        tags: ['mediadores', 'anafilaxia'],
      },
    ],
    synthesis: [
      'Sensibilização Th2 → troca de classe para IgE → IgE no FcεRI.',
      'Ligação cruzada pelo alérgeno → degranulação (histamina, triptase) e síntese de leucotrienos/PGD2.',
      'Fase imediata em minutos; fase tardia eosinofílica em horas.',
      'Anafilaxia = tipo I sistêmico; pode ocorrer sem sinais cutâneos.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 20 — Hipersensibilidades' },
      { ref: BOOK, locator: 'cap. 17, p. 118–120 — Th2, Tfh e troca de classe' },
      { ref: 'cardona-2020' },
      { ref: ABEM },
    ],
    keywords: ['IgE', 'mastócito', 'basófilo', 'FcεRI', 'histamina', 'triptase', 'leucotrienos', 'prostaglandina', 'PAF', 'eosinófilos', 'Th2', 'IL-4', 'asma', 'anafilaxia'],
  },

  {
    id: 'hiper-e3-tipo2',
    seriesId: 'hipersensibilidades',
    number: 3,
    title: 'Hipersensibilidade tipo II',
    tagline: 'Anticorpos contra a célula: destruir, inflamar ou desregular.',
    cover: 'tipo2-citotoxicidade',
    durationMinutes: 18,
    guidingQuestion: 'Como o mesmo tipo de anticorpo pode destruir hemácias em um paciente e estimular a tireoide em outro?',
    objectives: [
      'Descrever anticorpos IgG/IgM contra antígenos de superfície ou de matriz.',
      'Diferenciar os mecanismos: complemento, opsonização/fagocitose, ADCC e alteração funcional de receptores.',
      'Relacionar mecanismos a anemia hemolítica, doença de Graves e miastenia gravis.',
    ],
    keyTerms: [
      { term: 'Opsonização', definition: 'Revestimento de um alvo por IgG ou C3b, facilitando a fagocitose via receptores Fc e de complemento.' },
      { term: 'ADCC', definition: 'Citotoxicidade celular dependente de anticorpo, principalmente por NK via CD16.' },
      { term: 'Coombs direto', definition: 'Teste da antiglobulina direto: detecta IgG e/ou C3 ligados à superfície de hemácias do paciente.' },
      { term: 'Anticorpo estimulador', definition: 'Autoanticorpo que ativa um receptor, mimetizando o ligante natural (ex.: TRAb na doença de Graves).' },
      { term: 'Anticorpo bloqueador', definition: 'Autoanticorpo que impede a função de um receptor ou induz sua internalização (ex.: anti-AChR na miastenia).' },
    ],
    sections: [
      {
        id: 'mecanismos',
        title: 'Três modos de ação',
        role: 'visual',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'tipo2-citotoxicidade',
              alt: 'À esquerda, hemácia recoberta por IgG com complemento formando poros e um macrófago fagocitando; à direita, receptores de membrana com anticorpo estimulando (Graves) e anticorpo bloqueando (miastenia).',
              caption: 'Tipo II: destruição celular (complemento, fagocitose, ADCC) ou alteração funcional de receptores, sem destruição.',
            },
          },
          {
            type: 'expandable',
            items: [
              { title: 'Complemento e lise', body: 'IgM (muito eficiente) e IgG ligadas à superfície ativam C1q; a via clássica gera C3b (opsonização) e o MAC (lise). Ex.: reação transfusional hemolítica aguda por incompatibilidade ABO (IgM anti-A/anti-B) — hemólise intravascular.' },
              { title: 'Opsonização e fagocitose', body: 'Células revestidas por IgG/C3b são removidas por macrófagos do baço e fígado (hemólise extravascular). Ex.: anemia hemolítica autoimune por anticorpos quentes; púrpura trombocitopênica imune.' },
              { title: 'ADCC', body: 'Células NK reconhecem IgG ligada à célula-alvo via FcγRIII (CD16) e liberam perforina/granzimas.' },
              { title: 'Alteração funcional de receptores', body: 'Sem destruição celular: anticorpos podem **estimular** (TRAb no receptor de TSH → hipertireoidismo na doença de Graves) ou **bloquear/internalizar** (anti-AChR → fraqueza flutuante na miastenia gravis).' },
            ],
          },
        ],
      },
      {
        id: 'exemplos',
        title: 'Doenças-modelo',
        role: 'mecanismos',
        blocks: [
          {
            type: 'compare',
            title: 'Comparador de doenças tipo II',
            columns: ['Antígeno-alvo', 'Mecanismo', 'Manifestação', 'Exame-chave'],
            rows: [
              { label: 'AHAI por anticorpos quentes', cells: ['Antígenos da membrana eritrocitária', 'IgG → opsonização e fagocitose esplênica', 'Anemia, icterícia, esplenomegalia', 'Coombs direto positivo, LDH ↑, haptoglobina ↓, reticulocitose'] },
              { label: 'Reação transfusional ABO', cells: ['Antígenos A/B', 'IgM → complemento → lise intravascular', 'Febre, dor lombar, hemoglobinúria, choque', 'Checagem de identificação, Coombs, hemoglobinúria'] },
              { label: 'Doença de Graves', cells: ['Receptor de TSH', 'IgG estimuladora (TRAb)', 'Hipertireoidismo, bócio difuso, oftalmopatia', 'TSH suprimido, T4 livre ↑, TRAb'] },
              { label: 'Miastenia gravis', cells: ['Receptor de acetilcolina', 'IgG bloqueadora e indutora de internalização; complemento na placa motora', 'Fraqueza flutuante, ptose, diplopia', 'Anti-AChR (ou anti-MuSK), eletroneuromiografia'] },
              { label: 'Doença hemolítica do feto e do recém-nascido', cells: ['RhD fetal', 'IgG materna atravessa a placenta', 'Anemia fetal, hidropisia, icterícia neonatal', 'Coombs indireto materno; prevenção com imunoglobulina anti-D'] },
            ],
          },
        ],
      },
      {
        id: 'aplicacao',
        title: 'Aplicação clínica',
        role: 'aplicacao',
        blocks: [
          {
            type: 'chain',
            title: 'Miastenia gravis',
            links: [
              { stage: 'mecanismo', text: 'IgG contra receptor de acetilcolina na placa motora.' },
              { stage: 'alteracao', text: 'Bloqueio, internalização e destruição mediada por complemento dos receptores.' },
              { stage: 'lesao', text: 'Redução do número de receptores funcionais na junção neuromuscular.' },
              { stage: 'manifestacao', text: 'Fraqueza que piora com o uso e melhora com repouso; ptose e diplopia.' },
              { stage: 'investigacao', text: 'Anti-AChR, eletroneuromiografia com estimulação repetitiva, TC de tórax (timoma).' },
              { stage: 'conduta', text: 'Anticolinesterásicos, imunossupressão; atenção à crise miastênica (insuficiência respiratória).' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'hiper-e3-q1',
        prompt: 'Na doença de Graves, o hipertireoidismo ocorre porque o autoanticorpo:',
        options: [
          { id: 'a', text: 'Destrói os tireócitos por complemento', feedback: 'Destruição de tireócitos leva a hipotireoidismo, como na tireoidite de Hashimoto.' },
          { id: 'b', text: 'Estimula o receptor de TSH, mimetizando o hormônio', feedback: 'Correto: alteração funcional de receptor por anticorpo estimulador (tipo II).' },
          { id: 'c', text: 'Forma imunocomplexos que se depositam na tireoide', feedback: 'Não é um mecanismo de tipo III.' },
          { id: 'd', text: 'Ativa linfócitos T citotóxicos', feedback: 'O hipertireoidismo de Graves é mediado por anticorpo.' },
        ],
        correctOptionId: 'b',
        explanation: 'TRAb estimuladores ativam o receptor de TSH de forma contínua, independentemente da regulação hipofisária — por isso o TSH fica suprimido.',
        relatedEpisodes: ['hiper-e3-tipo2'],
        tags: ['tipo II', 'receptores'],
      },
    ],
    synthesis: [
      'Tipo II: IgG/IgM contra antígenos fixos em células ou matriz.',
      'Destruição por complemento, fagocitose ou ADCC — ou alteração funcional sem destruição.',
      'IgM ABO → hemólise intravascular; IgG em AHAI → hemólise extravascular.',
      'Graves: anticorpo estimula; miastenia: anticorpo bloqueia/internaliza.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 20 — Hipersensibilidades' },
      { ref: BOOK, locator: 'cap. 16, p. 112–115 — complemento, fagócitos e NK' },
      { ref: ABEM },
    ],
    keywords: ['IgG', 'IgM', 'opsonização', 'ADCC', 'Coombs', 'anemia hemolítica', 'Graves', 'TRAb', 'miastenia', 'acetilcolina', 'transfusão', 'Rh', 'anti-D'],
  },

  {
    id: 'hiper-e4-tipo3',
    seriesId: 'hipersensibilidades',
    number: 4,
    title: 'Hipersensibilidade tipo III',
    tagline: 'O problema não é a célula-alvo — é onde os complexos se depositam.',
    cover: 'imunocomplexo-deposicao',
    durationMinutes: 18,
    guidingQuestion: 'Por que imunocomplexos formados no sangue lesam rins, articulações e pele, longe do local onde o antígeno entrou?',
    objectives: [
      'Explicar formação, tamanho e depuração de imunocomplexos.',
      'Descrever deposição tecidual, ativação do complemento e lesão por neutrófilos.',
      'Relacionar mecanismo a vasculite, glomerulonefrite e doença do soro.',
      'Reconhecer o papel dos imunocomplexos em doenças autoimunes.',
    ],
    keyTerms: [
      { term: 'Imunocomplexo', definition: 'Agregado de antígeno e anticorpo; complexos pequenos a intermediários, formados com leve excesso de antígeno, tendem a circular e depositar-se.' },
      { term: 'Doença do soro', definition: 'Reação sistêmica 1–2 semanas após exposição a proteína estranha (ex.: soros heterólogos), com febre, artralgia, rash e proteinúria.' },
      { term: 'Reação de Arthus', definition: 'Vasculite local por imunocomplexos formados no sítio de injeção em indivíduo com altos títulos de IgG.' },
      { term: 'Vasculite leucocitoclástica', definition: 'Inflamação de pequenos vasos com fragmentação de neutrófilos; frequentemente associada a imunocomplexos (púrpura palpável).' },
    ],
    sections: [
      {
        id: 'formacao',
        title: 'Formação, depuração e deposição',
        role: 'mecanismos',
        blocks: [
          {
            type: 'flow',
            title: 'Do complexo à lesão',
            steps: [
              { label: 'Formação', detail: 'Antígeno solúvel encontra anticorpo IgG. Imunocomplexos se formam normalmente em muitas respostas imunes.' },
              { label: 'Depuração normal', detail: 'Complemento (C3b) solubiliza os complexos e permite seu transporte por hemácias (CR1) até fígado e baço, onde são removidos.' },
              { label: 'Falha de depuração', detail: 'Excesso persistente de antígeno, complexos de tamanho intermediário ou deficiência de complemento/fagócitos mantêm complexos circulando.' },
              { label: 'Deposição', detail: 'Ocorre onde há filtração sob pressão e fluxo turbulento: glomérulos, sinóvia, pequenos vasos da pele, plexo coroide.' },
              { label: 'Inflamação', detail: 'Ativação do complemento (C3a/C5a), ligação a FcγR, recrutamento de neutrófilos que liberam enzimas e radicais livres.' },
              { label: 'Lesão', detail: 'Vasculite, glomerulonefrite, artrite. O consumo de complemento reduz C3/C4 séricos.' },
            ],
          },
          {
            type: 'figure',
            visual: {
              illustration: 'imunocomplexo-deposicao',
              alt: 'Corte de pequeno vaso com imunocomplexos depositados na parede, complemento gerando C5a e neutrófilos migrando e liberando enzimas que lesam o endotélio.',
              caption: 'Imunocomplexos depositados ativam complemento e recrutam neutrófilos: o dano é causado pela inflamação.',
              hotspots: [
                { x: 62, y: 30, label: 'Depósito', detail: 'Complexos se alojam na parede vascular ou na membrana basal glomerular.' },
                { x: 14, y: 58, label: 'C5a', detail: 'Anafilatoxina quimiotática: recruta e ativa neutrófilos; aumenta permeabilidade.' },
                { x: 88, y: 58, label: 'Neutrófilos', detail: 'Ao tentarem fagocitar complexos aderidos, liberam enzimas e espécies reativas de oxigênio — “fagocitose frustrada”.' },
              ],
            },
          },
        ],
      },
      {
        id: 'doencas',
        title: 'Manifestações e doenças',
        role: 'aplicacao',
        blocks: [
          {
            type: 'timeline',
            title: 'Doença do soro (modelo clássico)',
            events: [
              { time: 'Dia 0', label: 'Exposição', detail: 'Administração de proteína heteróloga (ex.: soros antipeçonhentos produzidos em equinos) ou, raramente, alguns fármacos.' },
              { time: 'Dias 5–10', label: 'Produção de anticorpos', detail: 'IgG começa a ser produzida enquanto o antígeno ainda circula em excesso.' },
              { time: 'Dias 7–14', label: 'Doença', detail: 'Febre, urticária/rash, artralgias, linfadenopatia, proteinúria; C3/C4 baixos.' },
              { time: 'Semanas', label: 'Resolução', detail: 'Com a depuração do antígeno, os complexos desaparecem e a doença tende a regredir.' },
            ],
          },
          {
            type: 'callout',
            variant: 'sus',
            title: 'Contexto brasileiro',
            body: 'Soros antipeçonhentos (ofídicos, escorpiônicos, aracnídicos) são distribuídos pelo SUS e salvam vidas. Seus efeitos adversos incluem reações imediatas e, dias depois, doença do soro — o paciente deve ser orientado sobre sinais tardios.',
          },
          {
            type: 'list',
            title: 'Imunocomplexos em doenças autoimunes e infecciosas',
            items: [
              '**Nefrite lúpica**: complexos com antígenos nucleares (ver série Autoimunidade, Episódio 3).',
              '**Glomerulonefrite pós-estreptocócica**: complexos com antígenos estreptocócicos; C3 baixo transitório.',
              '**Vasculite por IgA** e **crioglobulinemia** (frequentemente associada à hepatite C).',
              '**Endocardite infecciosa**: complexos podem causar glomerulonefrite e lesões cutâneas.',
            ],
          },
          {
            type: 'chain',
            links: [
              { stage: 'mecanismo', text: 'Antígeno estreptocócico + anticorpo formam complexos.' },
              { stage: 'alteracao', text: 'Depósitos glomerulares ativam complemento.' },
              { stage: 'lesao', text: 'Glomerulonefrite proliferativa aguda.' },
              { stage: 'manifestacao', text: 'Criança com hematúria, edema e hipertensão 1–3 semanas após faringite ou impetigo.' },
              { stage: 'investigacao', text: 'Urina (hematúria dismórfica, cilindros), C3 baixo, evidência de infecção estreptocócica.' },
              { stage: 'conduta', text: 'Suporte (restrição de sal, diuréticos, controle pressórico); C3 deve normalizar em semanas.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'hiper-e4-q1',
        stem: 'Dez dias após receber soro antiofídico, paciente apresenta febre, urticária, artralgia e proteinúria leve.',
        prompt: 'Qual mecanismo explica o quadro?',
        options: [
          { id: 'a', text: 'Tipo I — anafilaxia tardia', feedback: 'O tempo (10 dias) e o quadro sistêmico com artralgia e proteinúria apontam para imunocomplexos.' },
          { id: 'b', text: 'Tipo III — doença do soro por imunocomplexos', feedback: 'Correto: anticorpos contra proteínas equinas formam complexos com o antígeno ainda circulante.' },
          { id: 'c', text: 'Tipo IV — dermatite de contato', feedback: 'Não há exposição cutânea a hapteno nem padrão eczematoso localizado.' },
          { id: 'd', text: 'Toxicidade direta do veneno', feedback: 'O intervalo de 10 dias e o padrão clínico indicam reação imunológica.' },
        ],
        correctOptionId: 'b',
        explanation: 'A doença do soro é o protótipo do tipo III: o intervalo corresponde ao tempo de produção de anticorpos com antígeno ainda presente.',
        relatedEpisodes: ['hiper-e4-tipo3'],
        tags: ['tipo III', 'doença do soro'],
      },
    ],
    synthesis: [
      'Imunocomplexos causam lesão quando sua depuração falha e se depositam.',
      'Locais de filtração e fluxo turbulento são os mais acometidos.',
      'Complemento (C5a) e neutrófilos executam o dano; C3/C4 caem.',
      'Doença do soro, Arthus, GN pós-estreptocócica e nefrite lúpica são exemplos-chave.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 20 — Hipersensibilidades' },
      { ref: BOOK, locator: 'cap. 16, p. 112–113 — complemento' },
      { ref: ABEM },
    ],
    keywords: ['imunocomplexos', 'doença do soro', 'Arthus', 'vasculite', 'glomerulonefrite', 'pós-estreptocócica', 'crioglobulinemia', 'C5a', 'soro antiofídico'],
  },

  {
    id: 'hiper-e5-tipo4',
    seriesId: 'hipersensibilidades',
    number: 5,
    title: 'Hipersensibilidade tipo IV',
    tagline: 'Sem anticorpos: linfócitos T e macrófagos no comando.',
    cover: 'tipo4-celular',
    durationMinutes: 19,
    guidingQuestion: 'Como a mesma imunidade celular que controla a tuberculose produz a induração do PPD, a dermatite de contato e a rejeição de um enxerto?',
    objectives: [
      'Explicar a hipersensibilidade mediada por linfócitos T (Th1, Th17 e CD8+).',
      'Descrever o papel dos macrófagos e da formação de granulomas.',
      'Relacionar mecanismo à dermatite de contato, à reação tuberculínica e à rejeição celular.',
    ],
    keyTerms: [
      { term: 'Th1', definition: 'Linfócitos T CD4+ produtores de IFN-γ que ativam macrófagos.' },
      { term: 'Th17', definition: 'Linfócitos T CD4+ produtores de IL-17, que recrutam neutrófilos.' },
      { term: 'Granuloma', definition: 'Agregado organizado de macrófagos ativados (epitelioides, células gigantes) e linfócitos que contém agentes persistentes.' },
      { term: 'Prova tuberculínica (PPD)', definition: 'Injeção intradérmica de derivado proteico purificado; induração após 48–72 h indica sensibilização prévia a micobactérias.' },
      { term: 'Rejeição celular aguda', definition: 'Lesão de enxerto mediada por linfócitos T que reconhecem aloantígenos HLA.' },
    ],
    sections: [
      {
        id: 'mecanismo',
        title: 'O mecanismo celular',
        role: 'visual',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'tipo4-celular',
              alt: 'Célula dendrítica apresentando antígeno a linfócito Th1, que libera IFN-γ e ativa macrófago; ao lado, linfócito T CD8+ liberando perforina e granzimas sobre uma célula-alvo.',
              caption: 'Duas vias da hipersensibilidade tardia: inflamação por CD4+ (Th1/Th17 → macrófagos/neutrófilos) e citotoxicidade direta por CD8+.',
              hotspots: [
                { x: 8, y: 22, label: 'Apresentação', detail: 'APC apresenta peptídeo (ou hapteno ligado a proteína própria) em MHC a linfócitos T de memória.' },
                { x: 52, y: 18, label: 'IFN-γ', detail: 'Th1 libera IFN-γ e TNF, ativando macrófagos (maior capacidade microbicida e inflamatória).' },
                { x: 93, y: 25, label: 'Macrófago ativado', detail: 'Libera enzimas, ROS e citocinas; persistência do antígeno leva a granuloma e fibrose.' },
                { x: 30, y: 82, label: 'CD8+ citotóxico', detail: 'Reconhece peptídeo em MHC I e mata a célula por perforina/granzimas e Fas–FasL.' },
              ],
            },
          },
          {
            type: 'text',
            paragraphs: [
              'O atraso de 24 a 72 horas reflete o tempo necessário para que linfócitos T de memória migrem ao local, reconheçam o antígeno, produzam citocinas e recrutem macrófagos e outros leucócitos. Por isso a reação é chamada **tardia**.',
            ],
          },
        ],
      },
      {
        id: 'exemplos',
        title: 'Três modelos clínicos',
        role: 'mecanismos',
        blocks: [
          {
            type: 'expandable',
            items: [
              { title: 'Dermatite de contato alérgica', body: 'Haptenos (níquel, cromo, fragrâncias, látex/aditivos da borracha, urushiol) penetram a pele e se ligam a proteínas próprias. Na reexposição, linfócitos T de memória (CD8+ e CD4+) causam eczema pruriginoso restrito à área de contato após 24–72 h. Diagnóstico: história + **teste de contato** (patch test).' },
              { title: 'Reação tuberculínica (PPD)', body: 'Em pessoa sensibilizada por M. tuberculosis (ou BCG/micobactérias ambientais), o PPD intradérmico gera induração após 48–72 h. **PPD positivo indica sensibilização, não doença ativa** — e um resultado negativo não exclui TB (imunossupressão, desnutrição, doença grave reduzem a reação).' },
              { title: 'Granulomas', body: 'Antígenos persistentes (micobactérias, fungos, corpos estranhos) mantêm ativação de macrófagos por IFN-γ e TNF, formando granulomas. Por isso bloqueadores de TNF podem reativar TB latente.' },
              { title: 'Rejeição celular de transplantes', body: 'Linfócitos T do receptor reconhecem moléculas HLA do doador (aloantígenos) e infiltram o enxerto. CD8+ matam células do enxerto; CD4+ orquestram a inflamação. A imunossupressão (ex.: inibidores de calcineurina) visa justamente a ativação T. (A série futura “Imunidade nos Transplantes” aprofundará o tema.)' },
              { title: 'Reações cutâneas graves a fármacos', body: 'Síndrome de Stevens-Johnson/necrólise epidérmica tóxica e DRESS envolvem linfócitos T (com CD8+ e granulisina na SSJ/NET). São emergências: suspender o fármaco suspeito é a medida mais importante.' },
            ],
          },
          {
            type: 'compare',
            title: 'Comparador: tipo I × tipo IV na pele',
            columns: ['Urticária (tipo I)', 'Dermatite de contato (tipo IV)'],
            rows: [
              { label: 'Início', cells: ['Minutos', '24–72 horas'] },
              { label: 'Lesão', cells: ['Pápulas e placas edematosas, fugazes (< 24 h cada)', 'Eczema: eritema, vesículas, descamação, liquenificação'] },
              { label: 'Distribuição', cells: ['Generalizada ou variável', 'Limitada ao local de contato (pode se estender)'] },
              { label: 'Mediador', cells: ['IgE, mastócito, histamina', 'Linfócitos T, citocinas'] },
              { label: 'Teste diagnóstico', cells: ['Teste cutâneo de leitura imediata / IgE específica', 'Teste de contato (leitura em 48–96 h)'] },
            ],
          },
        ],
      },
      {
        id: 'aplicacao',
        title: 'Aplicação clínica',
        role: 'aplicacao',
        blocks: [
          {
            type: 'chain',
            links: [
              { stage: 'mecanismo', text: 'Níquel atua como hapteno e sensibiliza linfócitos T.' },
              { stage: 'alteracao', text: 'Na reexposição, T de memória liberam IFN-γ e citotoxinas na epiderme.' },
              { stage: 'lesao', text: 'Espongiose e apoptose de queratinócitos.' },
              { stage: 'manifestacao', text: 'Placa eczematosa pruriginosa sob a fivela do cinto.' },
              { stage: 'investigacao', text: 'História de exposição + teste de contato.' },
              { stage: 'conduta', text: 'Evitar o alérgeno; corticoide tópico; orientação ocupacional quando pertinente.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'hiper-e5-q1',
        prompt: 'Um profissional de saúde tem PPD com induração de 15 mm, sem sintomas e com radiografia de tórax normal. Qual a interpretação correta?',
        options: [
          { id: 'a', text: 'Tuberculose ativa; iniciar esquema completo', feedback: 'PPD não diagnostica doença ativa; sem sintomas e com radiografia normal, não há evidência de TB ativa.' },
          { id: 'b', text: 'Indica sensibilização (infecção latente provável ou exposição prévia); avaliar indicação de tratamento da infecção latente', feedback: 'Correto: a reação tipo IV demonstra memória imunológica, não doença.' },
          { id: 'c', text: 'Reação alérgica ao PPD mediada por IgE', feedback: 'A induração em 48–72 h é tipo IV, não IgE.' },
          { id: 'd', text: 'Resultado sem significado em adultos', feedback: 'A interpretação depende do contexto, mas o resultado tem significado clínico.' },
        ],
        correctOptionId: 'b',
        explanation: 'A prova tuberculínica revela imunidade celular de memória a micobactérias. A distinção entre infecção latente e doença ativa depende de clínica e exames complementares.',
        relatedEpisodes: ['hiper-e5-tipo4'],
        tags: ['tipo IV', 'teste positivo × doença'],
      },
    ],
    synthesis: [
      'Tipo IV é mediado por linfócitos T (Th1, Th17, CD8+) e macrófagos, sem anticorpos.',
      'O atraso de 24–72 h reflete recrutamento e ativação celular.',
      'Dermatite de contato, PPD, granulomas e rejeição celular são modelos-chave.',
      'PPD positivo indica sensibilização, não doença ativa.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 20 — Hipersensibilidades' },
      { ref: BOOK, locator: 'cap. 17, p. 117–119 — MHC, ativação T, Th1/Th17' },
      { ref: ABEM },
    ],
    keywords: ['Th1', 'Th17', 'CD8', 'macrófago', 'granuloma', 'PPD', 'tuberculínica', 'dermatite de contato', 'níquel', 'patch test', 'rejeição', 'Stevens-Johnson', 'DRESS'],
  },

  {
    id: 'hiper-e6-diagnostico',
    seriesId: 'hipersensibilidades',
    number: 6,
    title: 'Diagnóstico das hipersensibilidades',
    tagline: 'A história clínica é o exame mais sensível que existe.',
    cover: 'triptase-curva',
    durationMinutes: 19,
    guidingQuestion: 'Como reconhecer anafilaxia em minutos e, depois, investigar sua causa sem produzir falsos diagnósticos de alergia?',
    objectives: [
      'Construir história de exposição e relação temporal.',
      'Aplicar critérios clínicos de anafilaxia.',
      'Interpretar triptase sérica (momento da coleta e valor basal).',
      'Usar testes de sensibilização e entender seus limites.',
      'Diferenciar reações a fármacos mediadas e não mediadas por IgE.',
    ],
    keyTerms: [
      { term: 'Triptase sérica', definition: 'Protease de mastócitos; eleva-se após ativação mastocitária, com pico cerca de 1–2 horas após o início da reação.' },
      { term: 'IgE específica', definition: 'Dosagem sérica de IgE contra um alérgeno; indica sensibilização, não necessariamente alergia clínica.' },
      { term: 'Teste de puntura (prick)', definition: 'Aplicação do alérgeno na epiderme; pápula em 15–20 min indica IgE específica em mastócitos cutâneos.' },
      { term: 'Teste de provocação', definition: 'Administração controlada e gradual do agente suspeito, em ambiente preparado; padrão-ouro em situações selecionadas.' },
    ],
    sections: [
      {
        id: 'criterios',
        title: 'Reconhecendo a anafilaxia',
        role: 'conceitos',
        blocks: [
          {
            type: 'flow',
            title: 'Critérios clínicos (WAO 2020) — avance pelas situações',
            intro: 'A anafilaxia é altamente provável quando qualquer um dos dois critérios é preenchido.',
            steps: [
              { label: 'Critério 1', detail: 'Início agudo (minutos a horas) com envolvimento de **pele e/ou mucosas** (urticária generalizada, prurido ou rubor, edema de lábios/língua/úvula) **e** pelo menos um: comprometimento respiratório; hipotensão ou disfunção de órgão-alvo; sintomas gastrointestinais graves (especialmente após alérgeno não alimentar).' },
              { label: 'Critério 2', detail: 'Início agudo de **hipotensão**, **broncoespasmo** ou **envolvimento laríngeo** após exposição a alérgeno conhecido ou altamente provável para o paciente — **mesmo sem manifestações cutâneas**.' },
              { label: 'Hipotensão em adultos', detail: 'PAS < 90 mmHg ou queda > 30% em relação ao basal.' },
              { label: 'Hipotensão em crianças', detail: 'PAS baixa para a idade ou queda > 30% da PAS basal.' },
              { label: 'Decisão', detail: 'Preenchido o critério, **tratar imediatamente com adrenalina IM**. A investigação etiológica vem depois e não deve atrasar o tratamento.' },
            ],
          },
          {
            type: 'list',
            title: 'Diagnóstico diferencial agudo',
            items: [
              'Reação vasovagal (bradicardia, palidez, sem urticária ou broncoespasmo).',
              'Crise de asma grave isolada; aspiração de corpo estranho.',
              'Crise de ansiedade/pânico; disfunção de cordas vocais.',
              'Choque séptico ou cardiogênico; embolia pulmonar.',
              'Angioedema por bradicinina (IECA, angioedema hereditário): sem urticária, não responde bem a anti-histamínicos/adrenalina.',
              'Escombroidose (intoxicação por histamina em peixe mal conservado).',
            ],
          },
        ],
      },
      {
        id: 'triptase',
        title: 'Triptase: quando colher e como interpretar',
        role: 'visual',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'triptase-curva',
              alt: 'Gráfico de triptase sérica ao longo do tempo após o início de uma reação: elevação com pico em torno de 1 a 2 horas e retorno ao basal em cerca de 24 horas; marcadores indicam a coleta aguda e a coleta basal.',
              caption: 'Curva esquemática: colher na fase aguda (idealmente 30 min–2 h após o início) e repetir o basal ≥ 24 h após a resolução.',
            },
          },
          {
            type: 'text',
            paragraphs: [
              'Uma elevação da triptase aguda acima de **20% do basal + 2 ng/mL** é proposta por consenso como evidência de ativação mastocitária. Comparar com o basal do próprio paciente aumenta a interpretação e ajuda a identificar triptase basal elevada (por exemplo, em mastocitose ou alfa-triptasemia hereditária).',
              'Triptase normal **não exclui** anafilaxia — especialmente nas desencadeadas por alimentos ou quando a coleta foi tardia.',
            ],
          },
          {
            type: 'callout',
            variant: 'atencao',
            title: 'Nunca atrase o tratamento para colher exames',
            body: 'A coleta da triptase deve ser feita quando possível, **após** a adrenalina e sem interferir no atendimento.',
          },
        ],
      },
      {
        id: 'sensibilizacao',
        title: 'Testes de sensibilização e reações a fármacos',
        role: 'mecanismos',
        blocks: [
          {
            type: 'compare',
            title: 'Ferramentas diagnósticas',
            columns: ['Avalia', 'Pontos fortes', 'Limitações'],
            rows: [
              { label: 'Teste de puntura (prick)', cells: ['IgE específica em mastócitos da pele', 'Rápido, sensível para aeroalérgenos e alimentos', 'Positivo = sensibilização; suspender anti-H1 antes; risco baixo, mas exige preparo'] },
              { label: 'IgE específica sérica', cells: ['IgE circulante contra o alérgeno', 'Sem risco; útil quando o teste cutâneo não é possível', 'Muitos sensibilizados não têm alergia clínica'] },
              { label: 'Teste intradérmico', cells: ['IgE (leitura imediata) ou linfócitos T (leitura tardia)', 'Útil para fármacos e venenos', 'Maior risco; realizado por especialista'] },
              { label: 'Teste de contato (patch)', cells: ['Hipersensibilidade tipo IV', 'Padrão para dermatite de contato', 'Leitura em 48–96 h'] },
              { label: 'Teste de provocação', cells: ['Reação clínica real', 'Confirma ou exclui alergia', 'Risco de reação: ambiente preparado e equipe treinada'] },
            ],
          },
          {
            type: 'compare',
            title: 'Reações a fármacos: mediadas e não mediadas por IgE',
            columns: ['Mediada por IgE', 'Não mediada por IgE (imediata)'],
            rows: [
              { label: 'Sensibilização prévia', cells: ['Necessária', 'Não necessária — pode ocorrer na 1ª exposição'] },
              { label: 'Mecanismos', cells: ['Ligação cruzada de IgE no FcεRI', 'Ativação direta de mastócitos (ex.: MRGPRX2), ativação do complemento por veículos, inibição da COX (AINEs)'] },
              { label: 'Exemplos', cells: ['Betalactâmicos, platinas (após vários ciclos)', 'Taxanos (veículo Cremophor EL/polissorbato), contrastes iodados, opioides, vancomicina (“síndrome do homem vermelho”)'] },
              { label: 'Testes cutâneos', cells: ['Frequentemente úteis', 'Geralmente negativos'] },
              { label: 'Tratamento agudo', cells: ['Mesmo: adrenalina IM se anafilaxia', 'Mesmo: adrenalina IM se anafilaxia'] },
            ],
            note: 'Para os taxanos, estudos sugerem que parte das reações pode ser mediada por IgE; o mecanismo de cada paciente deve ser investigado por especialista.',
          },
          {
            type: 'callout',
            variant: 'distincao',
            title: 'Sensibilização ≠ alergia',
            body: 'IgE específica ou prick positivos indicam **sensibilização**. O diagnóstico de **alergia** exige correlação com sintomas reprodutíveis após exposição. Painéis de IgE sem suspeita clínica geram rótulos falsos e restrições desnecessárias (ex.: dietas e falsos “alérgicos à penicilina”).',
          },
        ],
      },
      {
        id: 'aplicacao',
        title: 'Aplicação clínica',
        role: 'aplicacao',
        blocks: [
          {
            type: 'chain',
            title: 'Investigação após anafilaxia perioperatória',
            links: [
              { stage: 'mecanismo', text: 'Ativação de mastócitos durante a indução anestésica (IgE ou não IgE).' },
              { stage: 'alteracao', text: 'Liberação de histamina, triptase e mediadores lipídicos.' },
              { stage: 'lesao', text: 'Vasodilatação e extravasamento capilar.' },
              { stage: 'manifestacao', text: 'Hipotensão e broncoespasmo minutos após a indução, às vezes sem pele.' },
              { stage: 'investigacao', text: 'Registrar horários e fármacos; triptase aguda (30 min–2 h) e basal (≥ 24 h); encaminhar para testes com o especialista.' },
              { stage: 'conduta', text: 'Tratar com adrenalina na hora; depois, identificar o agente para que futuras cirurgias sejam seguras.' },
            ],
          },
          {
            type: 'callout',
            variant: 'distincao',
            title: 'Tratar primeiro, investigar depois',
            body: 'Durante a instabilidade, não tente definir se a reação é IgE ou não IgE. O mecanismo é investigado depois, com documentação do tempo, dos sinais, dos fármacos e da resposta ao tratamento.',
          },
        ],
      },
    ],
    activity: [
      {
        id: 'hiper-e6-q1',
        stem: 'Homem, 50 anos, 10 minutos após picada de abelha: tontura, PA 80/50 mmHg, sem urticária. Já teve reação cutânea a picada anterior.',
        prompt: 'Qual a interpretação?',
        options: [
          { id: 'a', text: 'Não é anafilaxia, pois não há manifestação cutânea', feedback: 'O critério 2 permite o diagnóstico sem pele quando há hipotensão após alérgeno conhecido/provável.' },
          { id: 'b', text: 'Anafilaxia provável pelo critério 2: hipotensão após exposição a alérgeno provável; tratar com adrenalina IM', feedback: 'Correto: exposição + hipotensão aguda bastam.' },
          { id: 'c', text: 'Reação vasovagal; elevar membros e observar', feedback: 'Exposição recente a alérgeno e história prévia tornam anafilaxia a hipótese principal; observar sem tratar seria perigoso.' },
          { id: 'd', text: 'Aguardar a triptase para decidir', feedback: 'A triptase não deve atrasar o tratamento.' },
        ],
        correctOptionId: 'b',
        explanation: 'A anafilaxia é um diagnóstico clínico. Hipotensão após exposição a um alérgeno provável é suficiente; a ausência de urticária não afasta o diagnóstico.',
        relatedEpisodes: ['hiper-e6-diagnostico', 'hiper-e7-tratamento'],
        tags: ['critérios de anafilaxia'],
      },
      {
        id: 'hiper-e6-q2',
        prompt: 'Quando colher a triptase sérica para documentar ativação mastocitária após uma reação aguda?',
        options: [
          { id: 'a', text: 'Antes da adrenalina, para não alterar o resultado', feedback: 'Nunca atrase o tratamento por causa de exames.' },
          { id: 'b', text: 'Idealmente entre 30 minutos e 2 horas após o início, com nova dosagem basal ≥ 24 h após a resolução', feedback: 'Correto: o pico ocorre em 1–2 h; a comparação com o basal aumenta a interpretação.' },
          { id: 'c', text: 'Apenas uma semana depois', feedback: 'Uma semana depois serve como basal, não para documentar o evento agudo.' },
          { id: 'd', text: 'Não há utilidade na triptase', feedback: 'É o principal marcador laboratorial disponível de ativação mastocitária.' },
        ],
        correctOptionId: 'b',
        explanation: 'O consenso propõe considerar significativa a elevação > 20% do basal + 2 ng/mL. A dosagem basal é essencial para interpretar.',
        relatedEpisodes: ['hiper-e6-diagnostico'],
        tags: ['triptase'],
      },
    ],
    synthesis: [
      'A história (exposição, tempo, sintomas) é a ferramenta mais importante.',
      'Anafilaxia é diagnóstico clínico; pode ocorrer sem pele (critério 2).',
      'Triptase: colher 30 min–2 h após o início e repetir basal; normal não exclui.',
      'Sensibilização não é alergia; testes devem responder a uma pergunta clínica.',
      'Reações a fármacos podem ser IgE ou não IgE — o tratamento agudo é o mesmo.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 20 — Hipersensibilidades' },
      { ref: 'cardona-2020' },
      { ref: 'valent-2012' },
      { ref: 'picard-2015' },
      { ref: ABEM },
    ],
    keywords: ['critérios de anafilaxia', 'triptase', 'prick', 'IgE específica', 'teste de contato', 'provocação', 'MRGPRX2', 'Cremophor', 'contraste', 'vancomicina', 'angioedema', 'bradicinina', 'IECA'],
  },

  {
    id: 'hiper-e7-tratamento',
    seriesId: 'hipersensibilidades',
    number: 7,
    title: 'Tratamento e prevenção',
    tagline: 'Adrenalina primeiro. Todo o resto vem depois.',
    cover: 'anafilaxia-adrenalina',
    durationMinutes: 20,
    guidingQuestion: 'Por que tantos pacientes com anafilaxia ainda não recebem adrenalina — e como garantir que isso não aconteça no seu plantão?',
    objectives: [
      'Sequenciar o atendimento inicial da anafilaxia.',
      'Justificar a adrenalina intramuscular como primeira linha.',
      'Reconhecer o papel e os limites de anti-histamínicos e corticosteroides.',
      'Planejar observação, alta segura e prevenção de recorrências.',
      'Compreender a dessensibilização em situações selecionadas.',
    ],
    keyTerms: [
      { term: 'Adrenalina IM', definition: 'Tratamento de primeira linha da anafilaxia, aplicada na face anterolateral da coxa; dose habitual 0,01 mg/kg da solução 1 mg/mL (máx. 0,5 mg em adultos; 0,3 mg em crianças), repetível a cada 5–15 min.' },
      { term: 'Anafilaxia bifásica', definition: 'Recorrência de sintomas horas após a resolução inicial, sem nova exposição.' },
      { term: 'Dessensibilização', definition: 'Reintrodução do agente em doses crescentes sob monitoramento, induzindo tolerância temporária; usada quando o fármaco é essencial e não há alternativa equivalente.' },
      { term: 'Imunoterapia com alérgeno', definition: 'Administração prolongada de alérgeno para induzir tolerância duradoura (ex.: veneno de himenópteros, aeroalérgenos).' },
    ],
    sections: [
      {
        id: 'atendimento',
        title: 'Atendimento inicial',
        role: 'aplicacao',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'anafilaxia-adrenalina',
              alt: 'Silhueta de coxa indicando a face anterolateral como local de aplicação intramuscular da adrenalina, ao lado de setas com os efeitos alfa-1, beta-1 e beta-2.',
              caption: 'Adrenalina IM na face anterolateral da coxa: efeitos α1 (vasoconstrição, reduz edema), β1 (inotropismo/cronotropismo) e β2 (broncodilatação, reduz liberação de mediadores).',
            },
          },
          {
            type: 'flow',
            title: 'Sequência de atendimento (clique em cada passo)',
            intro: 'Passos executados em paralelo pela equipe sempre que possível.',
            steps: [
              { label: '1. Interromper a exposição', detail: 'Parar a infusão do fármaco suspeito; remover o ferrão (raspando), sem atrasar os demais passos.' },
              { label: '2. Pedir ajuda e avaliar ABCDE', detail: 'Via aérea, respiração, circulação, consciência e pele. Monitorização contínua.' },
              { label: '3. Adrenalina IM imediata', detail: '0,01 mg/kg (solução 1 mg/mL), máximo 0,5 mg em adultos (0,3 mg em crianças), na face anterolateral da coxa. Repetir a cada 5–15 minutos se não houver melhora.' },
              { label: '4. Posicionar', detail: 'Decúbito dorsal com membros inferiores elevados se hipotensão; sentado se dispneia predominante; decúbito lateral se vômitos/inconsciência; gestantes em decúbito lateral esquerdo. Evitar levantar o paciente bruscamente.' },
              { label: '5. Oxigênio e acesso venoso', detail: 'O2 em alto fluxo; expansão volêmica com cristaloide em bolus se hipotensão.' },
              { label: '6. Broncodilatador inalatório', detail: 'Beta-2 agonista para broncoespasmo persistente, como adjuvante — não substitui a adrenalina.' },
              { label: '7. Refratariedade', detail: 'Se sem resposta após 2 doses de adrenalina IM e volume: adrenalina em infusão IV por equipe experiente, em ambiente monitorizado; considerar glucagon em usuário de betabloqueador.' },
              { label: '8. Adjuvantes', detail: 'Anti-histamínicos H1 aliviam sintomas cutâneos; corticosteroides não tratam a fase aguda — seu papel na prevenção de reação bifásica não é comprovado. Nenhum deles substitui ou deve atrasar a adrenalina.' },
            ],
          },
          {
            type: 'callout',
            variant: 'atencao',
            title: 'Não existe contraindicação absoluta à adrenalina na anafilaxia',
            body: 'Idade avançada, cardiopatia e gestação não impedem seu uso. Os riscos de não administrar superam os efeitos adversos. A via intravenosa em bolus, por outro lado, aumenta o risco de arritmias e deve ficar restrita a contextos de parada ou infusão controlada.',
          },
        ],
      },
      {
        id: 'apos',
        title: 'Observação e alta segura',
        role: 'aplicacao',
        blocks: [
          {
            type: 'list',
            title: 'Antes da alta',
            items: [
              'Observar por período adequado à gravidade (mais longo se reação grave, necessidade de mais de uma dose de adrenalina, asma grave ou difícil acesso a serviço de saúde).',
              'Orientar sobre possibilidade de reação bifásica.',
              'Prescrever e ensinar o uso de **autoinjetor de adrenalina** quando indicado e disponível (o acesso no Brasil ainda é limitado e custoso — discutir alternativas e plano de ação).',
              'Entregar **plano de ação escrito** e registrar o agente suspeito no prontuário.',
              'Encaminhar ao **especialista** (alergia e imunologia) para investigação etiológica.',
            ],
          },
          {
            type: 'callout',
            variant: 'sus',
            title: 'Segurança do paciente',
            body: 'Registrar a reação no prontuário, notificar eventos adversos a medicamentos (farmacovigilância/Anvisa) e comunicar a equipe assistente são ações que protegem o paciente em atendimentos futuros.',
          },
        ],
      },
      {
        id: 'prevencao',
        title: 'Prevenção e dessensibilização',
        role: 'mecanismos',
        blocks: [
          {
            type: 'expandable',
            items: [
              { title: 'Evitar o agente', body: 'Base da prevenção: identificação correta do desencadeante e de reatividades cruzadas relevantes. Rótulos falsos de alergia também causam dano (ex.: uso de antibióticos menos eficazes).' },
              { title: 'Pré-medicação', body: 'Anti-histamínicos e corticoides antes de algumas infusões podem reduzir reações leves não IgE (ex.: protocolos com taxanos), mas **não previnem com segurança a anafilaxia IgE-mediada** e podem mascarar sinais iniciais.' },
              { title: 'Dessensibilização rápida', body: 'Quando o fármaco é essencial (ex.: quimioterápico de primeira linha), protocolos com doses crescentes em vários passos, em ambiente monitorizado e por equipe especializada, induzem tolerância temporária. Séries de casos com centenas de procedimentos mostram segurança e eficácia. A tolerância se perde se o fármaco for interrompido.' },
              { title: 'Imunoterapia com alérgeno', body: 'Para anafilaxia por veneno de himenópteros, a imunoterapia com veneno reduz muito o risco de reações sistêmicas futuras. Induz Treg, IgG4 “bloqueadora” e reduz a resposta Th2.' },
            ],
          },
          {
            type: 'chain',
            title: 'Reação a quimioterápico essencial',
            links: [
              { stage: 'mecanismo', text: 'Ativação mastocitária (IgE ou não IgE) durante infusão.' },
              { stage: 'alteracao', text: 'Liberação maciça de mediadores.' },
              { stage: 'lesao', text: 'Vasodilatação, broncoconstrição, hipoperfusão.' },
              { stage: 'manifestacao', text: 'Eritema, broncoespasmo e hipotensão minutos após o início da infusão.' },
              { stage: 'investigacao', text: 'Triptase aguda e basal; avaliação por especialista (testes cutâneos quando aplicável).' },
              { stage: 'conduta', text: 'Adrenalina IM; depois, estratificação de risco e decisão compartilhada: alternativa terapêutica, reintrodução graduada ou dessensibilização.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'hiper-e7-q1',
        stem: 'Paciente com anafilaxia por amoxicilina recebeu hidrocortisona IV e prometazina IM. Continua com sibilância e PA 78/40 mmHg.',
        prompt: 'Qual a próxima conduta prioritária?',
        options: [
          { id: 'a', text: 'Repetir a hidrocortisona em dose dobrada', feedback: 'Corticoide não tem ação rápida e não trata a anafilaxia aguda.' },
          { id: 'b', text: 'Adrenalina intramuscular na face anterolateral da coxa, imediatamente', feedback: 'Correto: o paciente não recebeu o tratamento de primeira linha. Atraso na adrenalina associa-se a pior desfecho.' },
          { id: 'c', text: 'Aguardar 30 minutos para o efeito do corticoide', feedback: 'Aguardar com hipotensão é perigoso.' },
          { id: 'd', text: 'Adrenalina subcutânea no braço', feedback: 'A via IM na coxa atinge níveis mais rápidos e é a recomendada.' },
        ],
        correctOptionId: 'b',
        explanation: 'Anti-histamínicos e corticoides são adjuvantes e não substituem a adrenalina. A via IM na face anterolateral da coxa é a recomendada.',
        relatedEpisodes: ['hiper-e7-tratamento', 'hiper-e2-tipo1'],
        tags: ['adrenalina', 'manejo de emergência'],
      },
    ],
    synthesis: [
      'Adrenalina IM na coxa é a primeira linha — sem contraindicação absoluta.',
      'Interromper a exposição, posicionar, O2, volume e monitorar.',
      'Anti-histamínicos e corticoides são adjuvantes; nunca atrasar a adrenalina.',
      'Alta segura: plano de ação, orientação sobre bifásica, encaminhamento e registro.',
      'Dessensibilização e imunoterapia são estratégias especializadas para situações selecionadas.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 20 — Hipersensibilidades' },
      { ref: 'cardona-2020' },
      { ref: 'castells-2008' },
      { ref: 'picard-2015' },
      { ref: ABEM },
    ],
    keywords: ['adrenalina', 'epinefrina', 'intramuscular', 'anti-histamínico', 'corticoide', 'bifásica', 'autoinjetor', 'dessensibilização', 'imunoterapia', 'glucagon', 'betabloqueador', 'plano de ação'],
  },
];
