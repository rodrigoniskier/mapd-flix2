import type { Episode, Series } from '../../domain/types.ts';
import { ABEM, BOOK } from '../references.ts';

export const autoimunidadeSeries: Series = {
  id: 'autoimunidade',
  slug: 'autoimunidade',
  order: 1,
  status: 'disponivel',
  title: 'Autoimunidade',
  shortTitle: 'Autoimunidade',
  tagline: 'Quando o sistema que protege passa a reconhecer o próprio corpo como alvo.',
  synopsis:
    'Linfócitos autorreativos existem em todos nós. O que impede que eles causem doença — e o que acontece quando esses freios falham? Em seis episódios e um caso clínico, a série acompanha a autotolerância desde o timo até o consultório: como ela se quebra, como os autoanticorpos e os linfócitos T lesam tecidos, como interpretar FAN e complemento sem cair em armadilhas e como tratar e acompanhar pacientes no SUS.',
  learningObjectives: [
    'Explicar os mecanismos de tolerância central e periférica e por que sua falha leva à autoimunidade.',
    'Relacionar fatores genéticos (HLA) e ambientais (infecções, mimetismo molecular) à quebra da tolerância.',
    'Distinguir os mecanismos efetores de lesão autoimune e conectá-los às manifestações clínicas.',
    'Interpretar FAN/HEp-2, autoanticorpos específicos e complemento considerando probabilidade pré-teste.',
    'Discutir princípios de imunomodulação, monitoramento e acesso a terapias no SUS.',
  ],
  theme: { from: '#0b1240', via: '#3b1d7a', to: '#7c3aed', accent: '#a78bfa', motif: 'autoimunidade' },
  seasons: [
    {
      number: 1,
      title: 'Temporada 1 — Da tolerância à clínica',
      episodeIds: [
        'auto-e1-autotolerancia',
        'auto-e2-origem',
        'auto-e3-lesao',
        'auto-e4-doencas',
        'auto-e5-investigacao',
        'auto-e6-tratamento',
      ],
    },
  ],
  caseId: 'caso-a',
  quizId: 'quiz-autoimunidade',
  videoId: 'video-autoimunidade',
  citations: [{ ref: BOOK, locator: 'cap. 19 (Tolerância e autoimunidade); cap. 17, p. 119–120 (Treg)' }, { ref: ABEM }],
  competencies: [
    'Raciocínio clínico: do mecanismo imunológico à manifestação e à investigação',
    'Uso racional de exames complementares (probabilidade pré-teste)',
    'Decisão terapêutica compartilhada e acompanhamento longitudinal no SUS',
  ],
};

export const autoimunidadeEpisodes: Episode[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'auto-e1-autotolerancia',
    seriesId: 'autoimunidade',
    number: 1,
    title: 'Fundamentos da autotolerância',
    tagline: 'Todos temos clones autorreativos. A saúde depende de controlá-los.',
    cover: 'timo-selecao',
    durationMinutes: 18,
    guidingQuestion:
      'Se a recombinação aleatória de receptores inevitavelmente gera linfócitos capazes de reconhecer o próprio organismo, por que a maioria das pessoas não desenvolve doença autoimune?',
    objectives: [
      'Definir autotolerância, autoantígeno e clone autorreativo.',
      'Explicar seleção negativa no timo e na medula óssea, incluindo o papel do AIRE e da edição de receptores.',
      'Descrever os mecanismos periféricos: anergia, apoptose, células T reguladoras e receptores inibitórios.',
      'Reconhecer o privilégio imunológico e suas implicações clínicas.',
    ],
    keyTerms: [
      { term: 'Autotolerância', definition: 'Estado de não resposta imunológica patogênica a antígenos próprios, ativamente mantido por mecanismos centrais e periféricos.' },
      { term: 'Autoantígeno', definition: 'Molécula do próprio organismo capaz de ser reconhecida por receptores de linfócitos T ou B.' },
      { term: 'Clone autorreativo', definition: 'Linfócito (e sua progênie) cujo receptor reconhece um autoantígeno com afinidade suficiente para ativação.' },
      { term: 'Seleção negativa', definition: 'Eliminação (ou desvio) de linfócitos imaturos que reconhecem autoantígenos com alta afinidade nos órgãos linfoides primários.' },
      { term: 'Edição de receptores', definition: 'Nova recombinação da cadeia leve em linfócitos B imaturos autorreativos na medula óssea, gerando um BCR não autorreativo.' },
      { term: 'Anergia', definition: 'Inativação funcional duradoura de um linfócito que reconhece antígeno sem coestimulação adequada (sinal 1 sem sinal 2).' },
      { term: 'Treg (FOXP3+)', definition: 'Linfócitos T CD4+CD25+FOXP3+ que suprimem respostas por CTLA-4, IL-10, TGF-β e consumo de IL-2.' },
      { term: 'Privilégio imunológico', definition: 'Proteção relativa de sítios como olho, cérebro e testículo, por barreiras anatômicas e ambiente imunorregulador local.' },
    ],
    sections: [
      {
        id: 'conceitos',
        title: 'Por que a tolerância precisa ser ativa',
        role: 'conceitos',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Os receptores de linfócitos T (TCR) e B (BCR) são gerados por **recombinação somática aleatória** de segmentos gênicos. Essa estratégia cria um repertório enorme, capaz de reconhecer praticamente qualquer estrutura — inclusive moléculas do próprio corpo. Portanto, a autorreatividade não é um acidente raro: é uma consequência esperada da forma como o repertório é construído.',
              'A **autotolerância** é o conjunto de mecanismos que impede que esses clones causem dano. Ela não é passiva (“o sistema imune ignora o próprio”), mas um processo ativo e redundante, que atua em dois níveis: **central**, nos órgãos linfoides primários (timo e medula óssea), e **periférico**, nos tecidos e órgãos linfoides secundários.',
            ],
          },
          {
            type: 'callout',
            variant: 'distincao',
            title: 'Autorreatividade não é autoimunidade',
            body: 'Linfócitos e até autoanticorpos em baixos títulos podem existir em pessoas saudáveis. Fala-se em **doença autoimune** quando a resposta contra o próprio gera **lesão tecidual ou disfunção** clinicamente relevante.',
          },
        ],
      },
      {
        id: 'central',
        title: 'Tolerância central: a escola do timo e da medula',
        role: 'mecanismos',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'timo-selecao',
              alt: 'Esquema do timo mostrando timócitos passando pelo córtex (seleção positiva no MHC próprio) e pela medula, onde células epiteliais medulares expressam antígenos teciduais sob controle do AIRE e eliminam clones de alta afinidade.',
              caption: 'Seleção no timo: sobrevivem os timócitos que reconhecem o MHC próprio com afinidade moderada; os de alta afinidade por autoantígenos são eliminados ou desviados para Treg.',
              hotspots: [
                { x: 32, y: 28, label: 'Córtex — seleção positiva', detail: 'Timócitos duplo-positivos (CD4+CD8+) que reconhecem fracamente peptídeo próprio–MHC recebem sinal de sobrevivência; os que não reconhecem morrem por negligência. Define restrição ao MHC próprio.' },
                { x: 50, y: 62, label: 'Medula — AIRE', detail: 'Células epiteliais tímicas medulares, sob controle do fator de transcrição AIRE, expressam antígenos “de tecidos periféricos” (ex.: insulina). Defeitos no AIRE causam a síndrome poliendócrina autoimune tipo 1 (APECED).' },
                { x: 79, y: 58, label: 'Seleção negativa', detail: 'Timócitos que reconhecem autoantígenos com alta afinidade sofrem apoptose (deleção clonal) ou, alguns CD4+, diferenciam-se em Treg naturais (FOXP3+).' },
              ],
            },
          },
          {
            type: 'flow',
            title: 'Percurso de um timócito (clique em cada etapa)',
            intro: 'Avance pelas etapas e observe onde a autorreatividade é filtrada.',
            steps: [
              { label: 'Precursor chega ao timo', detail: 'Progenitores da medula óssea colonizam o timo e iniciam rearranjo das cadeias do TCR.' },
              { label: 'Duplo-positivo no córtex', detail: 'Timócitos CD4+CD8+ testam seu TCR contra peptídeo–MHC próprio apresentado por células epiteliais corticais.' },
              { label: 'Seleção positiva', detail: 'Reconhecimento fraco → sobrevivência e comprometimento com CD4 (MHC II) ou CD8 (MHC I). Nenhum reconhecimento → morte por negligência.' },
              { label: 'Medula: exposição a antígenos teciduais', detail: 'AIRE permite a expressão de antígenos de órgãos periféricos; células dendríticas também apresentam antígenos próprios.' },
              { label: 'Seleção negativa', detail: 'Alta afinidade por autoantígeno → apoptose (deleção) ou desvio para Treg FOXP3+.' },
              { label: 'Saída para a periferia', detail: 'Linfócitos T maduros e naïve deixam o timo. A filtragem é imperfeita — por isso a tolerância periférica é indispensável.' },
            ],
          },
          {
            type: 'text',
            title: 'E os linfócitos B?',
            paragraphs: [
              'Na medula óssea, linfócitos B imaturos que reconhecem autoantígenos multivalentes com alta afinidade podem reativar os genes RAG e **editar o receptor**, trocando a cadeia leve. Se a edição não resolver a autorreatividade, ocorre **deleção** por apoptose. Clones que reconhecem antígenos solúveis com menor afinidade tendem a ficar **anérgicos**.',
            ],
          },
        ],
      },
      {
        id: 'periferica',
        title: 'Tolerância periférica: os freios em campo',
        role: 'mecanismos',
        blocks: [
          {
            type: 'expandable',
            title: 'Cinco mecanismos periféricos (toque para expandir)',
            items: [
              { title: 'Anergia', body: 'Reconhecimento do antígeno (sinal 1, TCR–peptídeo–MHC) **sem coestimulação** (sinal 2, CD28–B7) induz um estado de não responsividade. Como APCs em repouso expressam pouco B7, antígenos próprios apresentados sem inflamação tendem a induzir anergia.' },
              { title: 'Receptores inibitórios (CTLA-4 e PD-1)', body: 'CTLA-4 compete com CD28 pelo B7 com maior afinidade e pode remover B7 da APC; PD-1, ao ligar PD-L1/PD-L2, atenua a sinalização do TCR. Bloqueá-los terapeuticamente (inibidores de checkpoint em oncologia) pode desencadear eventos adversos autoimunes — evidência clínica de seu papel na tolerância.' },
              { title: 'Linfócitos T reguladores', body: 'Treg FOXP3+ (naturais, do timo, ou induzidas na periferia) suprimem respostas por CTLA-4, IL-10, TGF-β e consumo de IL-2. Mutações em FOXP3 causam a síndrome IPEX, com autoimunidade grave na infância.' },
              { title: 'Deleção (apoptose)', body: 'Estimulação repetida por autoantígeno pode levar à apoptose induzida por ativação, inclusive pela via Fas–FasL. Defeitos nessa via causam a síndrome linfoproliferativa autoimune (ALPS).' },
              { title: 'Ignorância e privilégio imunológico', body: 'Alguns antígenos ficam sequestrados ou em sítios com barreiras e ambiente anti-inflamatório (olho, SNC, testículo). Após trauma, o antígeno pode ser exposto — como na oftalmia simpática, em que lesão de um olho pode levar a inflamação no olho contralateral.' },
            ],
          },
          {
            type: 'figure',
            visual: {
              illustration: 'treg-supressao',
              alt: 'Linfócito T regulador ao lado de uma célula dendrítica e de um linfócito T efetor, com setas indicando CTLA-4 retirando B7, liberação de IL-10 e TGF-β e consumo de IL-2.',
              caption: 'Treg atuam em várias frentes: reduzem coestimulação (CTLA-4), liberam citocinas inibitórias e competem por IL-2.',
            },
          },
          {
            type: 'compare',
            title: 'Comparador: tolerância central × periférica',
            columns: ['Tolerância central', 'Tolerância periférica'],
            rows: [
              { label: 'Onde', cells: ['Timo (T) e medula óssea (B)', 'Linfonodos, baço e tecidos'] },
              { label: 'Quando', cells: ['Durante a maturação dos linfócitos', 'Após a saída dos linfócitos maduros'] },
              { label: 'Principais mecanismos', cells: ['Seleção negativa, edição de receptores, geração de Treg naturais', 'Anergia, receptores inibitórios, Treg, deleção, ignorância'] },
              { label: 'Exemplo de falha monogênica', cells: ['AIRE → APECED', 'FOXP3 → IPEX; CTLA-4 haploinsuficiência; Fas → ALPS'] },
            ],
            note: 'Doenças monogênicas são raras, mas ensinam o papel de cada mecanismo; a maioria das doenças autoimunes é poligênica e multifatorial.',
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
            title: 'Da falha de um freio à manifestação',
            links: [
              { stage: 'mecanismo', text: 'Mutação em FOXP3 impede o desenvolvimento de Treg funcionais.' },
              { stage: 'alteracao', text: 'Linfócitos T efetores autorreativos se expandem sem supressão.' },
              { stage: 'lesao', text: 'Infiltração inflamatória de intestino, pâncreas endócrino e pele.' },
              { stage: 'manifestacao', text: 'Lactente com diarreia grave, diabetes de início muito precoce e eczema (síndrome IPEX).' },
              { stage: 'investigacao', text: 'Suspeita clínica, avaliação de Treg por citometria e confirmação genética.' },
              { stage: 'conduta', text: 'Imunossupressão e encaminhamento a centro de referência; transplante de células-tronco hematopoéticas em casos selecionados.' },
            ],
          },
          {
            type: 'callout',
            variant: 'clinica',
            title: 'Ponte com a oncologia',
            body: 'Pacientes em uso de anti-CTLA-4 ou anti-PD-1 podem desenvolver colite, tireoidite, hepatite ou diabetes autoimunes. A clínica confirma, ao contrário, que CTLA-4 e PD-1 são freios fisiológicos da autotolerância.',
          },
        ],
      },
    ],
    activity: [
      {
        id: 'auto-e1-q1',
        stem: 'Um recém-nascido com mutação inativadora no gene AIRE terá prejuízo em um passo específico da tolerância.',
        prompt: 'Qual mecanismo está diretamente comprometido?',
        options: [
          { id: 'a', text: 'Seleção positiva no córtex tímico', feedback: 'A seleção positiva depende do reconhecimento do MHC próprio pelas células epiteliais corticais, não do AIRE.' },
          { id: 'b', text: 'Expressão de antígenos teciduais na medula tímica e seleção negativa contra eles', feedback: 'Correto: o AIRE permite que células epiteliais medulares expressem antígenos de órgãos periféricos, viabilizando a deleção de clones reativos a eles.' },
          { id: 'c', text: 'Edição de receptores na medula óssea', feedback: 'Edição de receptores é um mecanismo de linfócitos B na medula óssea, independente do AIRE.' },
          { id: 'd', text: 'Expressão de CTLA-4 em linfócitos T ativados', feedback: 'CTLA-4 é um receptor inibitório periférico; não depende do AIRE.' },
        ],
        correctOptionId: 'b',
        explanation: 'Sem AIRE, antígenos de tecidos como paratireoide, adrenal e pele não são apresentados no timo; clones contra eles escapam, explicando a autoimunidade poliendócrina (APECED).',
        relatedEpisodes: ['auto-e1-autotolerancia'],
        tags: ['tolerância central'],
      },
      {
        id: 'auto-e1-q2',
        prompt: 'Uma APC em repouso apresenta peptídeo próprio a um linfócito T naïve, sem inflamação local. O desfecho mais provável é:',
        options: [
          { id: 'a', text: 'Ativação plena e diferenciação em Th1', feedback: 'Ativação plena exige coestimulação (sinal 2) e citocinas (sinal 3), escassas sem inflamação.' },
          { id: 'b', text: 'Anergia por ausência de coestimulação adequada', feedback: 'Correto: sinal 1 sem sinal 2 favorece anergia — um dos pilares da tolerância periférica.' },
          { id: 'c', text: 'Edição de receptor do TCR', feedback: 'Edição de receptor é característica de linfócitos B imaturos na medula óssea.' },
          { id: 'd', text: 'Produção de autoanticorpos', feedback: 'Linfócitos T não produzem anticorpos; além disso, o cenário favorece tolerância.' },
        ],
        correctOptionId: 'b',
        explanation: 'APCs em repouso expressam pouco B7. O reconhecimento do antígeno sem coestimulação induz anergia, mantendo a tolerância a antígenos próprios encontrados fora de contextos inflamatórios.',
        relatedEpisodes: ['auto-e1-autotolerancia'],
        tags: ['tolerância periférica', 'coestimulação'],
      },
    ],
    synthesis: [
      'Autorreatividade é inevitável; a autotolerância é ativa, redundante e ocorre em dois níveis.',
      'Central: seleção negativa (AIRE), edição de receptores (B) e geração de Treg naturais.',
      'Periférica: anergia, CTLA-4/PD-1, Treg, deleção e privilégio imunológico.',
      'Doenças monogênicas (APECED, IPEX, ALPS) revelam a função de cada freio.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 19 — Tolerância e autoimunidade' },
      { ref: BOOK, locator: 'cap. 17, p. 118–120 — sinais de ativação T; Treg e Tfh' },
      { ref: 'sakaguchi-1995' },
      { ref: ABEM },
    ],
    keywords: ['AIRE', 'FOXP3', 'IPEX', 'APECED', 'CTLA-4', 'PD-1', 'timo', 'deleção clonal', 'Fas', 'ALPS'],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'auto-e2-origem',
    seriesId: 'autoimunidade',
    number: 2,
    title: 'Como surge a autoimunidade',
    tagline: 'Genes carregam a arma; o ambiente pode puxar o gatilho.',
    cover: 'mimetismo-molecular',
    durationMinutes: 17,
    guidingQuestion:
      'Por que gêmeos idênticos frequentemente não compartilham a mesma doença autoimune, se carregam os mesmos genes?',
    objectives: [
      'Explicar a quebra da autotolerância como evento multifatorial.',
      'Relacionar alelos HLA à apresentação de autoantígenos e ao risco de doença.',
      'Descrever como infecções podem contribuir: mimetismo molecular, ativação de bystander e exposição de antígenos crípticos.',
      'Definir epitope spreading e amplificação inflamatória.',
    ],
    keyTerms: [
      { term: 'HLA', definition: 'Complexo principal de histocompatibilidade humano; seus alelos determinam quais peptídeos são apresentados aos linfócitos T.' },
      { term: 'Mimetismo molecular', definition: 'Semelhança estrutural entre epítopos microbianos e autoantígenos, permitindo reatividade cruzada.' },
      { term: 'Ativação de bystander', definition: 'Ativação de linfócitos autorreativos “vizinhos” pelo ambiente inflamatório de uma infecção, sem reconhecimento específico do micro-organismo.' },
      { term: 'Antígeno críptico', definition: 'Epítopo próprio normalmente oculto que se torna exposto após lesão, modificação pós-traducional ou apoptose ineficiente.' },
      { term: 'Epitope spreading', definition: 'Ampliação progressiva da resposta para novos epítopos do mesmo ou de outros autoantígenos durante a lesão tecidual.' },
      { term: 'Citrulinação', definition: 'Conversão de arginina em citrulina por enzimas PAD; gera neoepítopos relevantes na artrite reumatoide (alvo dos anti-CCP).' },
    ],
    sections: [
      {
        id: 'multifatorial',
        title: 'Um modelo multifatorial',
        role: 'conceitos',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'A maioria das doenças autoimunes resulta da combinação de **suscetibilidade genética** (geralmente poligênica), **gatilhos ambientais** e **falhas na regulação**. Nenhum fator isolado costuma ser suficiente — por isso a concordância entre gêmeos monozigóticos é bem menor que 100%.',
              'Fatores hormonais também influenciam: várias doenças, como o lúpus, predominam em mulheres em idade fértil.',
            ],
          },
          {
            type: 'flow',
            title: 'Modelo em etapas da quebra da tolerância',
            steps: [
              { label: 'Predisposição genética', detail: 'Alelos HLA e genes de regulação (ex.: PTPN22, CTLA4) aumentam a chance de clones autorreativos escaparem ou serem ativados.' },
              { label: 'Gatilho ambiental', detail: 'Infecção, tabagismo, radiação UV, fármacos ou lesão tecidual geram inflamação e/ou expõem antígenos próprios.' },
              { label: 'Ativação de APCs', detail: 'Sinais de perigo (PAMPs/DAMPs) aumentam B7 e citocinas: autoantígenos passam a ser apresentados com coestimulação.' },
              { label: 'Ativação de clones autorreativos', detail: 'Linfócitos T e B autorreativos escapam da anergia e expandem-se.' },
              { label: 'Amplificação', detail: 'Lesão libera novos autoantígenos (epitope spreading), sustentando a inflamação crônica.' },
            ],
          },
        ],
      },
      {
        id: 'genetica',
        title: 'Genética: o papel do HLA',
        role: 'mecanismos',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Moléculas HLA apresentam peptídeos aos linfócitos T. Alelos diferentes têm fendas de ligação distintas: alguns apresentam autoantígenos de forma mais eficiente ou moldam o repertório tímico de maneira desfavorável.',
              'Associações clássicas incluem HLA-DR3/DR4 e DQ8 com diabetes tipo 1, o “epítopo compartilhado” de alelos HLA-DRB1 com artrite reumatoide e HLA-B27 com espondiloartrites.',
            ],
          },
          {
            type: 'callout',
            variant: 'distincao',
            title: 'Associação não é causalidade nem diagnóstico',
            body: 'Possuir um alelo de risco **aumenta a probabilidade** de doença, mas a maioria dos portadores nunca adoece. Tipar HLA não diagnostica doença autoimune — serve, em contextos específicos, como dado de apoio.',
          },
        ],
      },
      {
        id: 'ambiente',
        title: 'Infecções e outros gatilhos',
        role: 'mecanismos',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'mimetismo-molecular',
              alt: 'Duas células apresentadoras exibem peptídeos de formatos quase idênticos — um bacteriano e outro próprio — reconhecidos pelo mesmo receptor de linfócito T.',
              caption: 'Mimetismo molecular: um TCR ativado contra um peptídeo microbiano reconhece um peptídeo próprio semelhante.',
            },
          },
          {
            type: 'expandable',
            items: [
              { title: 'Mimetismo molecular — exemplo clássico', body: 'Na **febre reumática**, anticorpos e linfócitos T dirigidos à proteína M do estreptococo do grupo A reagem com proteínas cardíacas (como miosina), contribuindo para cardite. É um exemplo de reatividade cruzada após infecção, relevante no Brasil.' },
              { title: 'Ativação de bystander', body: 'A inflamação de uma infecção ativa APCs e libera citocinas que podem estimular linfócitos autorreativos presentes no mesmo tecido, mesmo sem reatividade cruzada.' },
              { title: 'Exposição de antígenos crípticos', body: 'Lesão tecidual, apoptose com remoção ineficiente ou modificações pós-traducionais (como citrulinação induzida pelo tabagismo no pulmão) criam neoepítopos que não foram apresentados durante a tolerância central.' },
              { title: 'Epitope spreading', body: 'A destruição tecidual libera novos fragmentos antigênicos; a resposta, inicialmente focada, amplia-se para outros epítopos. Explica a diversificação dos autoanticorpos ao longo da doença.' },
            ],
          },
          {
            type: 'timeline',
            title: 'Linha do tempo fisiopatológica (modelo da artrite reumatoide)',
            events: [
              { time: 'Anos antes', label: 'Fase pré-clínica', detail: 'Indivíduo geneticamente suscetível (epítopo compartilhado) exposto a tabagismo; citrulinação de proteínas em mucosas.' },
              { time: 'Anos antes', label: 'Autoimunidade sem doença', detail: 'Surgem anti-CCP e fator reumatoide no soro, ainda sem artrite clínica.' },
              { time: 'Meses antes', label: 'Expansão', detail: 'Epitope spreading e aumento de títulos; artralgias inespecíficas podem aparecer.' },
              { time: 'Início clínico', label: 'Sinovite', detail: 'Inflamação sinovial com rigidez matinal e edema articular.' },
              { time: 'Evolução', label: 'Dano estrutural', detail: 'Sem tratamento, pannus e citocinas (TNF, IL-6) levam a erosões ósseas.' },
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
              { stage: 'mecanismo', text: 'Anticorpos contra proteína M estreptocócica reagem cruzadamente com antígenos cardíacos.' },
              { stage: 'alteracao', text: 'Inflamação de valvas e miocárdio após faringite não tratada.' },
              { stage: 'lesao', text: 'Valvulite com fibrose progressiva (cardiopatia reumática).' },
              { stage: 'manifestacao', text: 'Sopro novo, artrite migratória, coreia semanas após faringite.' },
              { stage: 'investigacao', text: 'Evidência de infecção estreptocócica prévia, ecocardiograma e critérios clínicos.' },
              { stage: 'conduta', text: 'Tratamento da fase aguda e profilaxia secundária; prevenção primária: tratar faringite estreptocócica.' },
            ],
          },
          {
            type: 'callout',
            variant: 'sus',
            title: 'Contexto brasileiro',
            body: 'A cardiopatia reumática ainda é causa importante de cirurgia valvar no Brasil. Tratar adequadamente faringites estreptocócicas na Atenção Primária é uma intervenção de prevenção de doença com componente autoimune.',
          },
        ],
      },
    ],
    activity: [
      {
        id: 'auto-e2-q1',
        prompt: 'Qual afirmação descreve melhor o papel dos alelos HLA na autoimunidade?',
        options: [
          { id: 'a', text: 'Um alelo de risco é suficiente para causar a doença', feedback: 'A maioria dos portadores de alelos de risco nunca desenvolve a doença.' },
          { id: 'b', text: 'Alelos HLA influenciam quais autoantígenos são apresentados e com que eficiência, modulando o risco', feedback: 'Correto: o HLA molda apresentação e repertório, alterando probabilidade — não determinando a doença.' },
          { id: 'c', text: 'A tipagem HLA confirma o diagnóstico de doença autoimune', feedback: 'Tipagem HLA não diagnostica doença autoimune; é, no máximo, dado de apoio em situações específicas.' },
          { id: 'd', text: 'HLA atua apenas na rejeição de transplantes', feedback: 'HLA participa de toda apresentação de antígeno a linfócitos T, inclusive na autoimunidade.' },
        ],
        correctOptionId: 'b',
        explanation: 'Associação genética expressa risco relativo. A doença depende da interação com gatilhos ambientais e falhas de regulação.',
        relatedEpisodes: ['auto-e2-origem'],
        tags: ['HLA', 'associação × causalidade'],
      },
      {
        id: 'auto-e2-q2',
        prompt: 'Paciente com lesão tecidual autoimune passa a apresentar autoanticorpos contra novos epítopos ao longo dos meses. Esse fenômeno chama-se:',
        options: [
          { id: 'a', text: 'Mimetismo molecular', feedback: 'Mimetismo é reatividade cruzada entre epítopo microbiano e próprio, não a ampliação progressiva para novos epítopos.' },
          { id: 'b', text: 'Edição de receptores', feedback: 'Edição de receptores é mecanismo de tolerância central de linfócitos B.' },
          { id: 'c', text: 'Epitope spreading', feedback: 'Correto: a lesão libera novos antígenos e a resposta se diversifica.' },
          { id: 'd', text: 'Anergia', feedback: 'Anergia é inativação funcional — o oposto de ampliação da resposta.' },
        ],
        correctOptionId: 'c',
        explanation: 'Epitope spreading explica a diversificação dos autoanticorpos e a perpetuação da inflamação crônica.',
        relatedEpisodes: ['auto-e2-origem'],
        tags: ['epitope spreading'],
      },
    ],
    synthesis: [
      'Autoimunidade é multifatorial: genes + ambiente + falha de regulação.',
      'HLA molda a apresentação de autoantígenos; associação não equivale a causalidade.',
      'Infecções contribuem por mimetismo, bystander e exposição de antígenos crípticos.',
      'Epitope spreading e inflamação perpetuam e ampliam a resposta.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 19 — Tolerância e autoimunidade' },
      { ref: BOOK, locator: 'cap. 17, p. 117–118 — MHC I e MHC II' },
      { ref: ABEM },
    ],
    keywords: ['HLA-B27', 'HLA-DR4', 'febre reumática', 'proteína M', 'tabagismo', 'citrulinação', 'PTPN22', 'gêmeos'],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'auto-e3-lesao',
    seriesId: 'autoimunidade',
    number: 3,
    title: 'Mecanismos de lesão autoimune',
    tagline: 'Anticorpos, imunocomplexos e linfócitos T: três rotas para o mesmo dano.',
    cover: 'mecanismos-lesao-autoimune',
    durationMinutes: 19,
    guidingQuestion:
      'Por que algumas doenças autoimunes atingem um único órgão enquanto outras afetam rim, pele, articulações e sangue ao mesmo tempo?',
    objectives: [
      'Diferenciar lesão por autoanticorpos dirigidos a células/receptores, por imunocomplexos e por linfócitos T.',
      'Explicar ativação e consumo do complemento e sua tradução laboratorial.',
      'Relacionar citocinas e inflamação crônica à lesão tecidual e à disfunção orgânica.',
    ],
    keyTerms: [
      { term: 'Autoanticorpo patogênico', definition: 'Autoanticorpo cuja ligação ao alvo causa dano ou disfunção (lise, opsonização, bloqueio ou estímulo de receptores).' },
      { term: 'Imunocomplexo', definition: 'Complexo antígeno–anticorpo; quando circulante e de tamanho intermediário, pode depositar-se em vasos e glomérulos.' },
      { term: 'Consumo de complemento', definition: 'Redução de C3/C4 séricos por ativação contínua (via clássica), comum em doença por imunocomplexos ativa.' },
      { term: 'Citotoxicidade', definition: 'Morte de células-alvo por linfócitos T CD8+ (perforina/granzimas) ou por NK via ADCC.' },
      { term: 'ADCC', definition: 'Citotoxicidade celular dependente de anticorpo: células NK reconhecem IgG ligada ao alvo via FcγRIII (CD16).' },
    ],
    sections: [
      {
        id: 'tres-rotas',
        title: 'Três rotas de lesão',
        role: 'mecanismos',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'mecanismos-lesao-autoimune',
              alt: 'Painel com três colunas: autoanticorpos ligados a células ou receptores, imunocomplexos depositados em parede vascular com complemento e neutrófilos, e linfócitos T CD4/CD8 infiltrando um tecido.',
              caption: 'Três rotas efetoras: anticorpo contra alvo fixo, imunocomplexos circulantes e lesão mediada por linfócitos T.',
              hotspots: [
                { x: 17, y: 50, label: 'Anticorpo contra alvo fixo', detail: 'Lesão restrita ao tecido que expressa o antígeno: anemia hemolítica autoimune, miastenia gravis, doença de Graves.' },
                { x: 42, y: 60, label: 'Imunocomplexos', detail: 'Antígenos circulantes (ex.: nucleossomos no lúpus) formam complexos que se depositam onde há filtração e fluxo turbulento: glomérulos, articulações, pequenos vasos — daí a lesão sistêmica.' },
                { x: 75, y: 34, label: 'Linfócitos T', detail: 'Th1/Th17 recrutam macrófagos e neutrófilos; CD8+ matam células-alvo. Ex.: diabetes tipo 1 (destruição de células β).' },
              ],
            },
          },
          {
            type: 'compare',
            title: 'Comparador de mecanismos efetores',
            columns: ['Autoanticorpo contra alvo celular', 'Imunocomplexos', 'Linfócitos T autorreativos'],
            rows: [
              { label: 'Correspondência Gell–Coombs', cells: ['Tipo II', 'Tipo III', 'Tipo IV'] },
              { label: 'Distribuição da lesão', cells: ['Órgão/célula que expressa o antígeno', 'Sistêmica (vasos, rim, articulações, pele)', 'Geralmente órgão-específica'] },
              { label: 'Efetores', cells: ['Complemento, fagócitos, ADCC, alteração de receptores', 'Complemento (C5a), neutrófilos, FcγR', 'Citocinas (IFN-γ, IL-17), macrófagos, CD8+'] },
              { label: 'Exemplos', cells: ['AHAI, Graves, miastenia', 'Nefrite lúpica, vasculite por imunocomplexos', 'DM1, esclerose múltipla'] },
              { label: 'Pistas laboratoriais', cells: ['Coombs direto, anticorpo antirreceptor', 'C3/C4 baixos, proteinúria, cilindros', 'Autoanticorpos como marcadores (ex.: anti-GAD), histologia'] },
            ],
            note: 'Uma mesma doença pode envolver mais de um mecanismo — o lúpus combina autoanticorpos contra células sanguíneas (tipo II) e imunocomplexos (tipo III).',
          },
        ],
      },
      {
        id: 'complemento',
        title: 'Complemento: aliado e agressor',
        role: 'mecanismos',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'complemento-vias',
              alt: 'As vias clássica, das lectinas e alternativa convergem para C3; C3b opsoniza, C5a recruta leucócitos e C5b-9 forma o complexo de ataque à membrana.',
              caption: 'Três entradas, uma convergência (C3) e três efeitos principais: opsonização (C3b), inflamação (C5a) e lise (C5b–9).',
            },
          },
          {
            type: 'text',
            paragraphs: [
              'Na doença por imunocomplexos, a ativação contínua da **via clássica** consome C1q, C4 e C3. Por isso, **C3 e C4 baixos** sinalizam atividade, especialmente renal, no lúpus. O C5a recruta e ativa neutrófilos, cujas enzimas e espécies reativas de oxigênio lesam a parede vascular e o glomérulo.',
              'Paradoxalmente, **deficiências hereditárias de componentes iniciais da via clássica** (C1q, C4, C2) predispõem ao lúpus: o complemento ajuda a remover células apoptóticas e imunocomplexos; sem ele, autoantígenos nucleares permanecem disponíveis.',
            ],
          },
        ],
      },
      {
        id: 'cronica',
        title: 'Citocinas e inflamação crônica',
        role: 'aprofundamento',
        blocks: [
          {
            type: 'list',
            items: [
              '**TNF e IL-6**: sustentam sinovite, febre, proteínas de fase aguda e reabsorção óssea (alvos terapêuticos na artrite reumatoide).',
              '**Interferons tipo I**: “assinatura de interferon” no lúpus, associada à ativação de células dendríticas plasmocitoides por complexos contendo ácidos nucleicos.',
              '**IL-17**: recruta neutrófilos e participa de doenças como psoríase e espondiloartrites.',
              '**Fibrose**: inflamação persistente ativa fibroblastos — perda de função (ex.: glomeruloesclerose, fibrose pulmonar).',
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
            title: 'Nefrite lúpica',
            links: [
              { stage: 'mecanismo', text: 'Imunocomplexos com antígenos nucleares (ex.: DNA–anti-dsDNA) depositam-se no glomérulo.' },
              { stage: 'alteracao', text: 'Ativação da via clássica, liberação de C5a e recrutamento de neutrófilos.' },
              { stage: 'lesao', text: 'Glomerulonefrite proliferativa com lesão de membrana basal.' },
              { stage: 'manifestacao', text: 'Edema, hipertensão, urina espumosa, hematúria.' },
              { stage: 'investigacao', text: 'Proteinúria, sedimento urinário, creatinina, C3/C4, anti-dsDNA e biópsia renal.' },
              { stage: 'conduta', text: 'Imunossupressão guiada pela classe histológica e acompanhamento nefrológico.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'auto-e3-q1',
        stem: 'Paciente com lúpus em atividade apresenta proteinúria nefrótica, C3 e C4 reduzidos e anti-dsDNA em título elevado.',
        prompt: 'Qual mecanismo explica melhor a redução de C3 e C4?',
        options: [
          { id: 'a', text: 'Deficiência hereditária de síntese hepática', feedback: 'Possível em raros casos, mas o contexto de atividade com anti-dsDNA alto aponta para consumo.' },
          { id: 'b', text: 'Consumo pela ativação da via clássica por imunocomplexos', feedback: 'Correto: imunocomplexos ativam C1q → C4 → C3, reduzindo seus níveis séricos.' },
          { id: 'c', text: 'Perda urinária isolada de complemento', feedback: 'A proteinúria não explica, por si, a queda de C4 e C3 típica de doença por imunocomplexos.' },
          { id: 'd', text: 'Ativação exclusiva da via alternativa', feedback: 'A via alternativa reduziria C3 com C4 normal; a queda de C4 indica via clássica.' },
        ],
        correctOptionId: 'b',
        explanation: 'A queda simultânea de C4 e C3 sinaliza ativação da via clássica, compatível com imunocomplexos — um marcador útil de atividade lúpica.',
        relatedEpisodes: ['auto-e3-lesao', 'auto-e5-investigacao'],
        tags: ['complemento', 'imunocomplexos'],
      },
      {
        id: 'auto-e3-q2',
        prompt: 'Qual doença é mediada predominantemente por linfócitos T autorreativos, com autoanticorpos servindo mais como marcadores do que como efetores?',
        options: [
          { id: 'a', text: 'Miastenia gravis', feedback: 'Na miastenia, anticorpos antirreceptor de acetilcolina são os efetores principais.' },
          { id: 'b', text: 'Doença de Graves', feedback: 'Em Graves, anticorpos estimuladores do receptor de TSH causam o hipertireoidismo.' },
          { id: 'c', text: 'Diabetes mellitus tipo 1', feedback: 'Correto: a destruição das células β é mediada por linfócitos T; anti-GAD, anti-IA2 e anti-insulina são marcadores.' },
          { id: 'd', text: 'Anemia hemolítica autoimune', feedback: 'É mediada por autoanticorpos contra hemácias (tipo II).' },
        ],
        correctOptionId: 'c',
        explanation: 'No DM1, linfócitos T CD8+ e CD4+ (insulite) destroem as células β; os autoanticorpos indicam autoimunidade em curso e ajudam a estratificar risco.',
        relatedEpisodes: ['auto-e3-lesao', 'auto-e4-doencas'],
        tags: ['mecanismos efetores'],
      },
    ],
    synthesis: [
      'Três rotas de lesão: anticorpo contra alvo fixo, imunocomplexos e linfócitos T.',
      'Imunocomplexos explicam o caráter sistêmico e o consumo de C3/C4.',
      'Deficiências de complemento inicial predispõem ao lúpus por falha de remoção de apoptóticos.',
      'Citocinas sustentam a inflamação crônica, que evolui para fibrose e disfunção.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 19 — Tolerância e autoimunidade' },
      { ref: BOOK, locator: 'cap. 16, p. 112–113 — sistema complemento' },
      { ref: BOOK, locator: 'cap. 20 — Hipersensibilidades' },
      { ref: ABEM },
    ],
    keywords: ['nefrite lúpica', 'C3', 'C4', 'C1q', 'TNF', 'IL-6', 'interferon tipo I', 'insulite', 'ADCC'],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'auto-e4-doencas',
    seriesId: 'autoimunidade',
    number: 4,
    title: 'Principais doenças autoimunes',
    tagline: 'O mecanismo explica a clínica: cinco doenças, cinco lógicas.',
    cover: 'anticorpo-estrutura',
    durationMinutes: 20,
    guidingQuestion: 'Como o tipo de alvo e o mecanismo efetor predizem o padrão clínico de cada doença autoimune?',
    objectives: [
      'Classificar doenças autoimunes em sistêmicas e órgão-específicas.',
      'Relacionar mecanismo e manifestações no LES, AR, DM1, vitiligo e hepatite autoimune.',
      'Identificar marcadores laboratoriais típicos de cada doença sem confundi-los com diagnóstico.',
    ],
    keyTerms: [
      { term: 'Doença sistêmica', definition: 'Autoimunidade contra antígenos ubíquos (ex.: nucleares), com acometimento de múltiplos órgãos.' },
      { term: 'Doença órgão-específica', definition: 'Autoimunidade dirigida a antígenos restritos a um tecido (ex.: células β, melanócitos).' },
      { term: 'Pannus', definition: 'Tecido sinovial inflamatório proliferado que invade cartilagem e osso na artrite reumatoide.' },
      { term: 'Anti-CCP', definition: 'Anticorpo antipeptídeo citrulinado cíclico; alta especificidade para artrite reumatoide.' },
    ],
    sections: [
      {
        id: 'espectro',
        title: 'Espectro: sistêmicas × órgão-específicas',
        role: 'conceitos',
        blocks: [
          {
            type: 'compare',
            title: 'Cinco doenças lado a lado',
            columns: ['Alvo principal', 'Mecanismo predominante', 'Manifestações-chave', 'Marcadores úteis'],
            rows: [
              { label: 'Lúpus eritematoso sistêmico', cells: ['Antígenos nucleares (DNA, nucleossomos, Sm)', 'Imunocomplexos (III) + anticorpos contra células sanguíneas (II); interferon tipo I', 'Fotossensibilidade, artrite, serosite, citopenias, nefrite', 'FAN, anti-dsDNA, anti-Sm, C3/C4'] },
              { label: 'Artrite reumatoide', cells: ['Proteínas citrulinadas, sinóvia', 'Linfócitos T e B, TNF, IL-6, pannus', 'Poliartrite simétrica de pequenas articulações, rigidez matinal', 'FR, anti-CCP, VHS/PCR'] },
              { label: 'Diabetes mellitus tipo 1', cells: ['Células β pancreáticas', 'Linfócitos T (IV) — insulite', 'Poliúria, polidipsia, perda de peso, cetoacidose', 'Anti-GAD, anti-IA2, anti-insulina, anti-ZnT8'] },
              { label: 'Vitiligo', cells: ['Melanócitos', 'Linfócitos T CD8+ e IFN-γ', 'Máculas acrômicas bem delimitadas', 'Diagnóstico clínico; rastrear tireoidopatia autoimune'] },
              { label: 'Hepatite autoimune', cells: ['Hepatócitos', 'Linfócitos T; hipergamaglobulinemia', 'Hepatite aguda ou crônica, pode evoluir para cirrose', 'ALT/AST, IgG elevada, FAN/anti-músculo liso, anti-LKM1; biópsia'] },
            ],
          },
        ],
      },
      {
        id: 'les',
        title: 'Lúpus: um antígeno ubíquo, uma doença multissistêmica',
        role: 'mecanismos',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'No LES, a remoção ineficiente de células apoptóticas e a perda de tolerância a antígenos nucleares geram autoanticorpos e imunocomplexos. Complexos contendo ácidos nucleicos estimulam receptores semelhantes a Toll (TLR7/9) em células dendríticas plasmocitoides, que produzem grandes quantidades de **interferon tipo I**, amplificando a resposta.',
              'A radiação UV aumenta a apoptose de queratinócitos e a exposição de antígenos nucleares — o que ajuda a explicar a fotossensibilidade e as reativações após exposição solar.',
            ],
          },
          {
            type: 'figure',
            visual: {
              illustration: 'anticorpo-estrutura',
              alt: 'Molécula de IgG em forma de Y com duas porções Fab que se ligam ao antígeno e a porção Fc que interage com receptores Fc e com C1q.',
              caption: 'A porção Fab define o alvo; a porção Fc define o efeito (complemento, fagócitos, NK).',
              hotspots: [
                { x: 21, y: 26, label: 'Fab', detail: 'Região variável — liga o antígeno. Determina “contra o quê” o anticorpo é dirigido.' },
                { x: 40, y: 67, label: 'Fc', detail: 'Região constante — liga FcγR de fagócitos e NK e ativa C1q. Determina “o que acontece” após a ligação.' },
              ],
            },
          },
        ],
      },
      {
        id: 'ar-dm1',
        title: 'AR, DM1, vitiligo e hepatite autoimune',
        role: 'mecanismos',
        blocks: [
          {
            type: 'expandable',
            items: [
              { title: 'Artrite reumatoide — sinovite que destrói', body: 'Linfócitos T CD4+, B e macrófagos sinoviais produzem TNF, IL-6 e IL-1; fibroblastos sinoviais proliferam (pannus) e osteoclastos são ativados via RANKL. Resultado: dor, edema, rigidez matinal prolongada e, sem tratamento, erosões e deformidades. Manifestações extra-articulares incluem nódulos, doença pulmonar intersticial e vasculite.' },
              { title: 'Diabetes tipo 1 — destruição silenciosa', body: 'A insulite pode durar anos antes dos sintomas; quando a maior parte da massa de células β foi perdida, surge hiperglicemia. Autoanticorpos múltiplos em parentes de primeiro grau indicam alto risco de progressão.' },
              { title: 'Vitiligo — alvo restrito, sinal visível', body: 'Linfócitos T CD8+ específicos para antígenos melanocíticos, guiados por IFN-γ e quimiocinas (CXCL10), destroem melanócitos. Associa-se a outras doenças autoimunes, como tireoidite.' },
              { title: 'Hepatite autoimune — pensar e biopsiar', body: 'Predomina em mulheres; pode se apresentar como hepatite aguda grave. Hipergamaglobulinemia (IgG) e autoanticorpos sustentam a suspeita; a biópsia (hepatite de interface) é central. Responde a imunossupressão, mas exige exclusão de causas virais, tóxicas e metabólicas.' },
            ],
          },
          {
            type: 'callout',
            variant: 'distincao',
            title: 'Critérios classificatórios × diagnóstico clínico',
            body: 'Os critérios EULAR/ACR 2019 (LES) e ACR/EULAR 2010 (AR) foram criados para **classificar** pacientes em pesquisa, com alta especificidade. Não devem ser usados como “checklist” obrigatório para diagnosticar ou para negar tratamento a quem ainda não os preenche.',
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
            title: 'Artrite reumatoide',
            links: [
              { stage: 'mecanismo', text: 'Resposta a proteínas citrulinadas e produção de TNF/IL-6 na sinóvia.' },
              { stage: 'alteracao', text: 'Proliferação sinovial e ativação de osteoclastos.' },
              { stage: 'lesao', text: 'Erosões ósseas e destruição de cartilagem.' },
              { stage: 'manifestacao', text: 'Poliartrite simétrica de mãos e punhos, rigidez matinal > 1 hora.' },
              { stage: 'investigacao', text: 'FR, anti-CCP, VHS/PCR, radiografia/ultrassom de mãos e pés.' },
              { stage: 'conduta', text: 'Iniciar DMARD precocemente (janela de oportunidade); metotrexato como âncora, com acompanhamento no PCDT do SUS.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'auto-e4-q1',
        prompt: 'Por que o LES costuma ser multissistêmico enquanto o vitiligo é restrito à pele?',
        options: [
          { id: 'a', text: 'Porque o LES é mais grave', feedback: 'Gravidade não explica a distribuição da lesão.' },
          { id: 'b', text: 'Porque os autoantígenos do LES são ubíquos e formam imunocomplexos circulantes, enquanto no vitiligo o alvo é restrito aos melanócitos', feedback: 'Correto: a distribuição do antígeno e o mecanismo efetor determinam o padrão clínico.' },
          { id: 'c', text: 'Porque o vitiligo não envolve linfócitos T', feedback: 'O vitiligo é mediado principalmente por linfócitos T CD8+.' },
          { id: 'd', text: 'Porque apenas o LES tem componente genético', feedback: 'Ambas têm suscetibilidade genética.' },
        ],
        correctOptionId: 'b',
        explanation: 'Antígeno ubíquo + imunocomplexos circulantes = lesão sistêmica; antígeno restrito + efetores celulares locais = doença órgão-específica.',
        relatedEpisodes: ['auto-e4-doencas', 'auto-e3-lesao'],
        tags: ['sistêmica × órgão-específica'],
      },
    ],
    synthesis: [
      'A distribuição do antígeno e o mecanismo efetor predizem o padrão clínico.',
      'LES: antígenos nucleares, imunocomplexos e interferon tipo I.',
      'AR: sinovite citocina-dependente com risco de erosões — tratar cedo.',
      'DM1 e vitiligo: lesão mediada por linfócitos T, órgão-específica.',
      'Critérios classificatórios não substituem o julgamento diagnóstico.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 19 — Tolerância e autoimunidade' },
      { ref: 'aringer-2019' },
      { ref: 'aletaha-2010' },
      { ref: ABEM },
    ],
    keywords: ['lúpus', 'LES', 'artrite reumatoide', 'DM1', 'vitiligo', 'hepatite autoimune', 'pannus', 'anti-GAD', 'interferon', 'fotossensibilidade'],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'auto-e5-investigacao',
    seriesId: 'autoimunidade',
    number: 5,
    title: 'Investigação imunológica',
    tagline: 'Um FAN positivo não é um diagnóstico. A pergunta certa vem antes do exame.',
    cover: 'fan-padroes',
    durationMinutes: 20,
    guidingQuestion: 'Em quem pedir FAN — e o que fazer com um resultado positivo?',
    objectives: [
      'Interpretar FAN por imunofluorescência indireta em células HEp-2: título e padrão (nomenclatura ICAP).',
      'Reconhecer o valor de anti-dsDNA, anti-Sm, anti-CCP e outros autoanticorpos.',
      'Usar C3/C4 no diagnóstico e no seguimento.',
      'Aplicar sensibilidade, especificidade e probabilidade pré-teste à interpretação.',
    ],
    keyTerms: [
      { term: 'FAN/HEp-2', definition: 'Pesquisa de anticorpos antinucleares por imunofluorescência indireta em células epiteliais humanas HEp-2; descreve-se título e padrão.' },
      { term: 'Sensibilidade', definition: 'Proporção de doentes com teste positivo. Teste muito sensível, quando negativo, ajuda a afastar a doença.' },
      { term: 'Especificidade', definition: 'Proporção de não doentes com teste negativo. Teste muito específico, quando positivo, ajuda a confirmar.' },
      { term: 'Probabilidade pré-teste', definition: 'Chance estimada de doença antes do exame, baseada na clínica e na epidemiologia.' },
      { term: 'Valor preditivo positivo', definition: 'Probabilidade de doença dado um teste positivo; cai muito quando a probabilidade pré-teste é baixa.' },
    ],
    sections: [
      {
        id: 'fan',
        title: 'FAN: título e padrão',
        role: 'visual',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'fan-padroes',
              alt: 'Quatro células HEp-2 estilizadas mostrando padrões de imunofluorescência: nuclear homogêneo, nuclear pontilhado, nucleolar e centromérico.',
              caption: 'Padrões ilustrativos de FAN em HEp-2 (representação didática, não microfotografia).',
              hotspots: [
                { x: 13, y: 44, label: 'Nuclear homogêneo', detail: 'Associa-se a anticorpos anti-dsDNA, antinucleossomo e anti-histona (LES, lúpus induzido por fármacos).' },
                { x: 38, y: 44, label: 'Nuclear pontilhado', detail: 'Grupo amplo: anti-Sm, anti-RNP, anti-Ro/SSA, anti-La/SSB. O pontilhado fino denso (DFS70) é frequente em pessoas sem doença autoimune sistêmica.' },
                { x: 62, y: 44, label: 'Nucleolar', detail: 'Associa-se a esclerose sistêmica e síndromes de sobreposição.' },
                { x: 87, y: 44, label: 'Centromérico', detail: 'Anticentrômero — associado à forma cutânea limitada da esclerose sistêmica.' },
              ],
            },
          },
          {
            type: 'text',
            paragraphs: [
              'O FAN em HEp-2 é **muito sensível** para LES (é critério de entrada nos critérios EULAR/ACR 2019), mas **pouco específico**: pode ser positivo em baixos títulos em uma fração relevante da população saudável, em infecções, neoplasias, doenças tireoidianas e com o envelhecimento.',
              'O laudo deve informar **método e substrato**, **título** (ex.: 1:80, 1:640) e **padrão** segundo a nomenclatura do consenso internacional ICAP (do qual o Brasil participou ativamente). Títulos altos e padrões associados a autoanticorpos específicos aumentam a relevância do achado, mas **nenhum padrão dá diagnóstico isoladamente**.',
            ],
          },
        ],
      },
      {
        id: 'especificos',
        title: 'Autoanticorpos específicos e complemento',
        role: 'mecanismos',
        blocks: [
          {
            type: 'compare',
            title: 'O que cada exame acrescenta',
            columns: ['Perfil de desempenho', 'Uso principal', 'Cuidado'],
            rows: [
              { label: 'FAN (HEp-2)', cells: ['Alta sensibilidade para LES; baixa especificidade', 'Triagem quando há suspeita clínica de doença autoimune sistêmica', 'Não pedir “de rotina” sem clínica; não repetir para seguimento'] },
              { label: 'Anti-dsDNA', cells: ['Alta especificidade para LES; sensibilidade moderada', 'Apoio diagnóstico; títulos podem acompanhar atividade, sobretudo renal', 'Varia conforme o método'] },
              { label: 'Anti-Sm', cells: ['Muito específico para LES; pouco sensível', 'Confirma suspeita de LES', 'Negativo não exclui LES'] },
              { label: 'Anti-CCP', cells: ['Alta especificidade para AR', 'Diagnóstico precoce e prognóstico (doença erosiva)', 'Pode preceder a artrite em anos'] },
              { label: 'Fator reumatoide', cells: ['Sensibilidade moderada; especificidade limitada', 'Apoio diagnóstico na AR', 'Positivo em infecções crônicas (ex.: hepatite C), idosos, outras doenças'] },
              { label: 'Anti-Ro/SSA e anti-La/SSB', cells: ['Associados a Sjögren e LES', 'Gestação: risco de lúpus neonatal/bloqueio cardíaco congênito', 'Informar e acompanhar gestantes positivas'] },
              { label: 'C3 e C4', cells: ['Não diagnósticos isoladamente', 'Atividade de doença por imunocomplexos; seguimento do LES', 'Interpretar a tendência, não um valor isolado'] },
              { label: 'Anti-TPO / antitireoglobulina', cells: ['Marcadores de autoimunidade tireoidiana', 'Apoio etiológico em tireoidite autoimune', 'Não medem a função da tireoide (usar TSH/T4 livre)'] },
            ],
          },
        ],
      },
      {
        id: 'bayes',
        title: 'Probabilidade pré-teste: o mesmo exame, conclusões diferentes',
        role: 'aprofundamento',
        blocks: [
          {
            type: 'flow',
            title: 'Simulação guiada (valores ilustrativos)',
            intro: 'Considere um teste com sensibilidade de 95% e especificidade de 85% aplicado a 1.000 pessoas em dois cenários.',
            steps: [
              { label: 'Cenário 1 — triagem sem clínica', detail: 'Probabilidade pré-teste de 1%: 10 doentes e 990 não doentes. Positivos verdadeiros ≈ 9,5; falsos-positivos ≈ 148,5.' },
              { label: 'Resultado no cenário 1', detail: 'Valor preditivo positivo ≈ 9,5 ÷ 158 ≈ 6%. Quase todo positivo é falso — gera ansiedade, exames e encaminhamentos desnecessários.' },
              { label: 'Cenário 2 — clínica sugestiva', detail: 'Mulher jovem com artrite, fotossensibilidade, úlceras orais e proteinúria: probabilidade pré-teste estimada em 40%. 400 doentes e 600 não doentes.' },
              { label: 'Resultado no cenário 2', detail: 'Positivos verdadeiros = 380; falsos-positivos = 90. VPP ≈ 380 ÷ 470 ≈ 81%. O mesmo exame passa a ser muito informativo.' },
              { label: 'Mensagem', detail: 'A anamnese e o exame físico definem a probabilidade pré-teste. Exame sem pergunta clínica não ajuda — e pode prejudicar.' },
            ],
          },
          {
            type: 'callout',
            variant: 'distincao',
            title: 'Teste positivo ≠ doença clínica',
            body: 'Autoanticorpos podem existir anos antes da doença (anti-CCP, anti-dsDNA) ou nunca evoluir para doença. O diagnóstico de doença autoimune é **clínico-laboratorial** e integra história, exame físico, exames e, quando necessário, histologia.',
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
              { stage: 'mecanismo', text: 'Perda de tolerância a antígenos nucleares.' },
              { stage: 'alteracao', text: 'Produção de anticorpos antinucleares e formação de imunocomplexos.' },
              { stage: 'lesao', text: 'Depósitos em pele, articulações, rim.' },
              { stage: 'manifestacao', text: 'Quadro multissistêmico em mulher jovem.' },
              { stage: 'investigacao', text: 'FAN → se positivo com clínica compatível: anti-dsDNA, anti-Sm, C3/C4, hemograma, urina tipo 1, relação proteína/creatinina.' },
              { stage: 'conduta', text: 'Integrar achados, estratificar gravidade de órgão e encaminhar conforme necessidade.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'auto-e5-q1',
        stem: 'Mulher de 45 anos, assintomática, faz “check-up” e recebe FAN reagente 1:80, padrão nuclear pontilhado fino denso. Exame físico normal.',
        prompt: 'Qual a interpretação mais adequada?',
        options: [
          { id: 'a', text: 'Diagnóstico de lúpus; iniciar hidroxicloroquina', feedback: 'Sem manifestações clínicas não há diagnóstico de LES; tratar seria inadequado.' },
          { id: 'b', text: 'Achado de baixo valor preditivo nesse contexto; padrão DFS é frequente em pessoas sem doença sistêmica — orientar e reavaliar apenas se surgirem sintomas', feedback: 'Correto: probabilidade pré-teste baixa, título baixo e padrão DFS reduzem muito a chance de doença autoimune sistêmica.' },
          { id: 'c', text: 'Repetir o FAN a cada 3 meses', feedback: 'FAN não deve ser repetido para seguimento; o título não acompanha atividade.' },
          { id: 'd', text: 'Solicitar painel completo de 20 autoanticorpos', feedback: 'Painéis amplos sem clínica aumentam falsos-positivos e não resolvem a dúvida.' },
        ],
        correctOptionId: 'b',
        explanation: 'Sem clínica, um FAN em baixo título — ainda mais com padrão pontilhado fino denso (anti-DFS70) — tem baixo valor preditivo positivo. A decisão é guiada pela clínica.',
        relatedEpisodes: ['auto-e5-investigacao'],
        tags: ['FAN', 'probabilidade pré-teste'],
      },
      {
        id: 'auto-e5-q2',
        prompt: 'Qual exame é mais útil para monitorar atividade renal de um paciente com LES já diagnosticado?',
        options: [
          { id: 'a', text: 'Título do FAN', feedback: 'O título do FAN não acompanha atividade.' },
          { id: 'b', text: 'Anti-Sm seriado', feedback: 'Anti-Sm é útil no diagnóstico, não no seguimento de atividade.' },
          { id: 'c', text: 'C3, C4, anti-dsDNA, proteinúria e sedimento urinário', feedback: 'Correto: combinação que reflete consumo de complemento, atividade imunológica e lesão renal.' },
          { id: 'd', text: 'Fator reumatoide', feedback: 'FR não monitora atividade lúpica.' },
        ],
        correctOptionId: 'c',
        explanation: 'Queda de C3/C4, aumento de anti-dsDNA e alterações urinárias sinalizam atividade renal e orientam a conduta.',
        relatedEpisodes: ['auto-e5-investigacao', 'auto-e3-lesao'],
        tags: ['seguimento', 'complemento'],
      },
    ],
    synthesis: [
      'FAN: sensível, pouco específico — sempre descrever título e padrão (ICAP).',
      'Anti-dsDNA e anti-Sm são específicos de LES; anti-CCP é específico de AR.',
      'C3/C4 acompanham atividade de doença por imunocomplexos.',
      'Probabilidade pré-teste governa o valor preditivo — exame sem clínica pode prejudicar.',
      'Critérios classificatórios e testes positivos não substituem o diagnóstico clínico.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 19 — Tolerância e autoimunidade' },
      { ref: 'chan-2015' },
      { ref: 'aringer-2019' },
      { ref: 'aletaha-2010' },
      { ref: ABEM },
    ],
    keywords: ['FAN', 'HEp-2', 'ICAP', 'DFS70', 'anti-dsDNA', 'anti-Sm', 'anti-CCP', 'fator reumatoide', 'anti-Ro', 'complemento', 'sensibilidade', 'especificidade', 'valor preditivo'],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'auto-e6-tratamento',
    seriesId: 'autoimunidade',
    number: 6,
    title: 'Tratamento e acompanhamento',
    tagline: 'Controlar a doença, proteger o paciente do tratamento e garantir acesso.',
    cover: 'imunossupressao-alvos',
    durationMinutes: 18,
    guidingQuestion: 'Como equilibrar o controle da inflamação autoimune com os riscos da imunossupressão ao longo da vida do paciente?',
    objectives: [
      'Diferenciar imunomodulação de imunossupressão.',
      'Relacionar classes terapêuticas aos alvos imunológicos.',
      'Planejar monitoramento de atividade e prevenção de complicações.',
      'Reconhecer como funciona o acesso a terapias no SUS (PCDT e Componente Especializado).',
    ],
    keyTerms: [
      { term: 'Imunomodulação', definition: 'Ajuste da resposta imune com menor supressão global (ex.: hidroxicloroquina).' },
      { term: 'Imunossupressão', definition: 'Redução ampla da resposta imune, com aumento do risco de infecções.' },
      { term: 'DMARD', definition: 'Fármaco modificador do curso da doença; sintéticos convencionais (ex.: metotrexato) ou biológicos/sintéticos-alvo.' },
      { term: 'Poupador de corticoide', definition: 'Fármaco que permite reduzir a dose de glicocorticoide mantendo o controle da doença.' },
      { term: 'PCDT', definition: 'Protocolo Clínico e Diretrizes Terapêuticas do Ministério da Saúde: define critérios e medicamentos fornecidos pelo SUS.' },
    ],
    sections: [
      {
        id: 'alvos',
        title: 'Onde cada fármaco atua: mecanismos de ação',
        role: 'mecanismos',
        blocks: [
          {
            type: 'figure',
            visual: {
              illustration: 'imunossupressao-alvos',
              alt: 'Linha de ativação imune — apresentação de antígeno, ativação de linfócito T, proliferação, linfócito B e citocinas — com marcadores indicando onde atuam glicocorticoides, antiproliferativos, anti-CD20 e anti-TNF.',
              caption: 'Mapa didático simplificado dos principais alvos terapêuticos ao longo da resposta imune.',
            },
          },
          {
            type: 'expandable',
            items: [
              { title: 'Glicocorticoides', body: 'Ação rápida e ampla: inibem transcrição de citocinas (via NF-κB), reduzem migração leucocitária e induzem apoptose de linfócitos. Indispensáveis em crises, mas o uso prolongado traz osteoporose, diabetes, hipertensão, catarata, infecções e supressão adrenal. **Meta: menor dose pelo menor tempo** e uso de poupadores.' },
              { title: 'Antimaláricos (hidroxicloroquina)', body: 'Imunomodulador de base no LES: interfere na sinalização de TLR endossomais, reduz reativações e melhora a sobrevida. Exige rastreamento oftalmológico periódico para retinopatia.' },
              { title: 'Imunossupressores convencionais', body: 'Metotrexato (âncora na AR), azatioprina, micofenolato (nefrite lúpica), leflunomida, ciclofosfamida (formas graves). Exigem hemograma e função hepática/renal seriados e atenção a gestação.' },
              { title: 'Terapias biológicas e alvo-específicas', body: 'Anti-TNF, anti-IL-6R, abatacepte (CTLA-4-Ig, bloqueia coestimulação), rituximabe (anti-CD20), belimumabe (anti-BAFF) e inibidores de JAK. Antes de iniciar: rastrear tuberculose latente, hepatites B e C e atualizar vacinas.' },
            ],
          },
        ],
      },
      {
        id: 'monitoramento',
        title: 'Monitoramento e prevenção de complicações',
        role: 'aplicacao',
        blocks: [
          {
            type: 'list',
            title: 'Checklist longitudinal',
            items: [
              'Medir atividade de doença com instrumentos padronizados (ex.: DAS28/CDAI na AR; SLEDAI no LES) e definir metas (“tratar até o alvo”).',
              'Monitorar toxicidade: hemograma, enzimas hepáticas, função renal, glicemia, pressão arterial, densitometria em corticoterapia prolongada.',
              'Prevenir infecções: vacinação adequada (preferencialmente antes da imunossupressão; vacinas vivas geralmente contraindicadas sob imunossupressão importante), rastreio de TB latente.',
              'Reduzir risco cardiovascular: inflamação crônica acelera aterosclerose.',
              'Planejamento reprodutivo: fármacos teratogênicos (metotrexato, micofenolato) exigem contracepção e planejamento.',
              'Cuidado multiprofissional: adesão, saúde mental, reabilitação e apoio social.',
            ],
          },
          {
            type: 'callout',
            variant: 'sus',
            title: 'Acesso às terapias no SUS',
            body: 'Muitos imunossupressores e biológicos são dispensados pelo **Componente Especializado da Assistência Farmacêutica**, conforme critérios dos **PCDT** (por exemplo, o PCDT de Artrite Reumatoide). Diferencie cinco etapas relacionadas, mas não equivalentes: **registro sanitário** (Anvisa), **incorporação** (Conitec), **presença no PCDT**, **financiamento** e **disponibilidade real** no serviço. A judicialização não é política regular de acesso: depende de decisões individuais, produz desigualdade e não garante continuidade. Consulte sempre o PCDT vigente.',
          },
          {
            type: 'callout',
            variant: 'atencao',
            title: 'Contexto educacional',
            body: 'As terapias são apresentadas para compreensão dos mecanismos. Doses, indicações e escolhas devem seguir protocolos vigentes e a avaliação individual do paciente por equipe habilitada.',
          },
        ],
      },
      {
        id: 'cadeia',
        title: 'Aplicação clínica',
        role: 'aplicacao',
        blocks: [
          {
            type: 'chain',
            title: 'LES em acompanhamento',
            links: [
              { stage: 'mecanismo', text: 'Interferon tipo I e imunocomplexos mantêm atividade.' },
              { stage: 'alteracao', text: 'Reativações periódicas (flares).' },
              { stage: 'lesao', text: 'Dano acumulado: pela doença e pelos corticoides.' },
              { stage: 'manifestacao', text: 'Fadiga, artrite, rash, nefrite; ou complicações (osteoporose, infecções).' },
              { stage: 'investigacao', text: 'Consultas regulares com urina, C3/C4, anti-dsDNA, hemograma; avaliação de toxicidade.' },
              { stage: 'conduta', text: 'Hidroxicloroquina para todos sem contraindicação, poupadores de corticoide, vacinação e proteção solar.' },
            ],
          },
        ],
      },
    ],
    activity: [
      {
        id: 'auto-e6-q1',
        prompt: 'Antes de iniciar um anti-TNF em paciente com AR, qual medida é indispensável?',
        options: [
          { id: 'a', text: 'Dosar FAN', feedback: 'FAN não altera a decisão de iniciar anti-TNF.' },
          { id: 'b', text: 'Rastrear tuberculose latente e hepatites virais', feedback: 'Correto: TNF é crucial para conter granulomas; seu bloqueio pode reativar TB latente. Hepatite B pode reativar sob imunossupressão.' },
          { id: 'c', text: 'Aplicar vacina de febre amarela logo após a primeira dose', feedback: 'Vacinas vivas devem ser evitadas sob imunossupressão importante e planejadas antes do início.' },
          { id: 'd', text: 'Suspender o metotrexato', feedback: 'A associação com metotrexato é frequente e pode aumentar eficácia.' },
        ],
        correctOptionId: 'b',
        explanation: 'O TNF é essencial para a manutenção do granuloma; o rastreamento de TB latente (e tratamento quando indicado) é obrigatório antes de biológicos.',
        relatedEpisodes: ['auto-e6-tratamento'],
        tags: ['biológicos', 'segurança'],
      },
    ],
    synthesis: [
      'Tratar a doença e proteger o paciente do tratamento são objetivos simultâneos.',
      'Corticoide: rápido e eficaz, mas com custo cumulativo — usar poupadores.',
      'Biológicos atuam em alvos específicos; exigem rastreio de infecções latentes.',
      'Acompanhamento longitudinal mede atividade, toxicidade e risco cardiovascular.',
      'Aprovação regulatória ≠ disponibilidade no SUS: consultar PCDT vigente.',
    ],
    citations: [
      { ref: BOOK, locator: 'cap. 19 — Tolerância e autoimunidade' },
      { ref: 'pcdt-ar-2021' },
      { ref: 'pcdt-portal' },
      { ref: ABEM },
    ],
    keywords: ['corticoide', 'hidroxicloroquina', 'metotrexato', 'micofenolato', 'rituximabe', 'anti-TNF', 'belimumabe', 'abatacepte', 'JAK', 'PCDT', 'Conitec', 'tuberculose latente', 'vacinação'],
  },
];
