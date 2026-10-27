import type { ClinicalCase } from '../../domain/types.ts';
import { ABEM, BOOK } from '../references.ts';

export const casoC: ClinicalCase = {
  id: 'caso-c',
  seriesId: 'hipersensibilidades',
  title: 'Caso Clínico C — Reação durante infusão medicamentosa',
  hook: 'Minutos após o início da infusão, o rosto fica vermelho. O que você faz nos próximos cinco minutos?',
  setting: 'Sala de infusão de quimioterapia — hospital de referência em oncologia (SUS)',
  objectives: [
    'Reconhecer instabilidade e preencher critérios de anafilaxia em tempo real.',
    'Priorizar adrenalina intramuscular sem atrasos.',
    'Investigar ativação mastocitária com triptase no momento adequado.',
    'Discutir mecanismos possíveis e estratégias para manter um tratamento essencial.',
  ],
  disclaimer:
    'Caso fictício construído para fins educacionais. Doses e condutas apresentadas em contexto didático, segundo diretrizes internacionais; decisões reais seguem protocolos institucionais vigentes.',
  relatedEpisodes: ['hiper-e2-tipo1', 'hiper-e6-diagnostico', 'hiper-e7-tratamento'],
  citations: [
    { ref: BOOK, locator: 'cap. 22 — Casos integrados de Imunologia; cap. 20' },
    { ref: 'cardona-2020' },
    { ref: 'valent-2012' },
    { ref: 'picard-2015' },
    { ref: 'castells-2008' },
    { ref: ABEM },
  ],
  steps: [
    {
      id: 'c1',
      title: 'Etapa 1 — Evolução dos sintomas',
      narrative: [
        'Dona Marta, 58 anos, 68 kg, em tratamento de carcinoma de ovário, recebe o **segundo ciclo de paclitaxel**. Recebeu pré-medicação conforme protocolo. O primeiro ciclo transcorreu sem intercorrências.',
        '**Cinco minutos** após o início da infusão, refere calor no rosto e “aperto no peito”. A enfermeira observa **eritema facial e cervical**.',
        'Em seguida, Marta apresenta **tosse seca e sibilos audíveis** e diz que vai desmaiar.',
      ],
      findings: [
        { label: 'Tempo desde o início', value: '5–7 minutos', flag: 'alterado' },
        { label: 'Pele', value: 'Eritema difuso em face, pescoço e tronco', flag: 'alterado' },
        { label: 'Respiração', value: 'Sibilância difusa; FR 28 irpm', flag: 'alterado' },
        { label: 'PA', value: '84/50 mmHg (basal 128/80)', flag: 'baixo' },
        { label: 'FC', value: '124 bpm', flag: 'alto' },
        { label: 'SatO2', value: '91%', flag: 'baixo' },
      ],
      decision: {
        prompt: 'Qual a PRIMEIRA ação?',
        options: [
          { id: 'c1o1', text: 'Interromper a infusão e pedir ajuda, preparando adrenalina IM imediatamente', quality: 'prioritaria', consequence: 'A exposição é cessada e a equipe se mobiliza em segundos.', rationale: 'Interromper o agente é imediato e não atrasa as demais medidas.' },
          { id: 'c1o2', text: 'Reduzir a velocidade da infusão e observar', quality: 'inadequada', consequence: 'A exposição continua e a hipotensão piora.', rationale: 'Com hipotensão e broncoespasmo, não se mantém a infusão.' },
          { id: 'c1o3', text: 'Solicitar parecer da alergologia antes de qualquer medida', quality: 'inadequada', consequence: 'Minutos preciosos são perdidos.', rationale: 'A anafilaxia é emergência: tratar primeiro, consultar depois.' },
        ],
      },
    },
    {
      id: 'c2',
      title: 'Etapa 2 — Reconhecimento da instabilidade',
      narrative: ['Enquanto a infusão é interrompida, a equipe precisa nomear o que está acontecendo.'],
      decision: {
        prompt: 'O quadro preenche critérios de anafilaxia?',
        options: [
          { id: 'c2o1', text: 'Sim: início agudo com pele (eritema) + comprometimento respiratório + hipotensão (queda > 30% do basal) — critério 1 da WAO', quality: 'prioritaria', consequence: 'A equipe passa a agir com protocolo de anafilaxia.', rationale: 'Pele + respiratório + cardiovascular, minutos após exposição: anafilaxia altamente provável.' },
          { id: 'c2o2', text: 'Não: é uma reação infusional leve, comum com taxanos', quality: 'inadequada', consequence: 'Subtratamento de reação grave.', rationale: 'Hipotensão e broncoespasmo caracterizam reação grave, independentemente do mecanismo.' },
          { id: 'c2o3', text: 'Não é possível dizer sem dosar triptase', quality: 'inadequada', consequence: 'Atraso diagnóstico e terapêutico.', rationale: 'Anafilaxia é diagnóstico clínico.' },
        ],
      },
      teachingPoint: 'Não importa se a reação é IgE ou não IgE: hipotensão + broncoespasmo = anafilaxia → adrenalina.',
    },
    {
      id: 'c3',
      title: 'Etapa 3 — Intervenção imediata com adrenalina',
      narrative: ['A adrenalina está disponível no carrinho de emergência (ampola 1 mg/mL).'],
      visual: {
        illustration: 'anafilaxia-adrenalina',
        alt: 'Local de aplicação intramuscular da adrenalina na face anterolateral da coxa e seus efeitos alfa e beta.',
        caption: 'Adrenalina IM, face anterolateral da coxa.',
      },
      decision: {
        prompt: 'Qual a prescrição correta?',
        options: [
          { id: 'c3o1', text: 'Adrenalina 0,5 mg (0,5 mL da solução 1 mg/mL) IM na face anterolateral da coxa, repetível em 5–15 min; decúbito com membros elevados; O2; acesso venoso e cristaloide em bolus', quality: 'prioritaria', consequence: 'Em 5 minutos, a PA sobe para 102/64 mmHg e os sibilos diminuem.', rationale: 'Dose de 0,01 mg/kg (máx. 0,5 mg em adultos). A via IM na coxa atinge níveis rápidos com segurança.' },
          { id: 'c3o2', text: 'Hidrocortisona 500 mg IV e difenidramina IV, aguardando resposta', quality: 'inadequada', consequence: 'A PA cai para 70/40 mmHg.', rationale: 'Corticoide e anti-histamínico não revertem choque nem broncoespasmo; são adjuvantes.' },
          { id: 'c3o3', text: 'Adrenalina 1 mg IV em bolus', quality: 'inadequada', consequence: 'Risco de arritmia grave, crise hipertensiva e isquemia miocárdica.', rationale: 'Bolus IV de 1 mg é dose de parada cardiorrespiratória, não de anafilaxia com pulso.' },
        ],
      },
      teachingPoint: 'Adrenalina IM é a primeira linha. Não há contraindicação absoluta na anafilaxia.',
    },
    {
      id: 'c4',
      title: 'Etapa 4 — Estabilização',
      narrative: [
        'Após 10 minutos, Marta ainda tem sibilos leves; PA 104/66 mmHg; SatO2 95% com O2.',
        'A equipe discute os próximos passos e por quanto tempo observá-la.',
      ],
      decision: {
        prompt: 'Qual conduta agora?',
        options: [
          { id: 'c4o1', text: 'Manter monitorização; repetir adrenalina IM se piora ou resposta incompleta; beta-2 inalatório para broncoespasmo residual; anti-histamínico H1 para sintomas cutâneos; observação prolongada em ambiente monitorizado por ter sido reação grave', quality: 'prioritaria', consequence: 'Marta permanece estável e recebe alta no dia seguinte com orientação.', rationale: 'Reação grave e necessidade de adrenalina justificam observação mais longa (risco de reação bifásica).' },
          { id: 'c4o2', text: 'Reiniciar o paclitaxel na mesma velocidade, já que melhorou', quality: 'inadequada', consequence: 'Recorrência da reação, potencialmente mais grave.', rationale: 'Reexposição sem estratégia planejada é perigosa.' },
          { id: 'c4o3', text: 'Alta imediata com prescrição de anti-histamínico', quality: 'inadequada', consequence: 'Risco de reação bifásica sem suporte.', rationale: 'Após anafilaxia grave, observação é necessária.' },
        ],
      },
    },
    {
      id: 'c5',
      title: 'Etapa 5 — Investigação da ativação mastocitária',
      narrative: [
        'Uma amostra de sangue foi colhida **60 minutos após o início dos sintomas**, já com a paciente estabilizada. A dosagem basal foi feita 48 horas depois.',
      ],
      findings: [
        { label: 'Triptase aguda (60 min)', value: '18,4 ng/mL', flag: 'alto' },
        { label: 'Triptase basal (48 h)', value: '4,1 ng/mL', flag: 'normal' },
        { label: 'Limiar (20% do basal + 2)', value: '4,1 × 1,2 + 2 = 6,9 ng/mL', reference: 'Consenso de ativação mastocitária' },
      ],
      visual: {
        illustration: 'triptase-curva',
        alt: 'Curva de triptase sérica com pico 1–2 horas após o início da reação.',
        caption: 'A coleta aos 60 minutos captou a elevação; o basal confirma retorno ao normal.',
      },
      decision: {
        prompt: 'Como interpretar a triptase?',
        options: [
          { id: 'c5o1', text: 'Elevação acima de 20% do basal + 2 ng/mL: evidência de ativação mastocitária; não distingue, por si, IgE de não IgE', quality: 'prioritaria', consequence: 'Você documenta o mecanismo efetor (mastócito) sem extrapolar.', rationale: 'Triptase indica degranulação; a via de ativação (IgE, complemento, MRGPRX2) exige outras avaliações.' },
          { id: 'c5o2', text: 'Triptase confirma alergia IgE ao paclitaxel', quality: 'aceitavel', consequence: 'Conclusão além do que o exame permite.', rationale: 'Ativação mastocitária pode ocorrer por mecanismos não IgE.' },
          { id: 'c5o3', text: 'Valor sem significado, pois o basal é normal', quality: 'inadequada', consequence: 'Interpretação incorreta.', rationale: 'É justamente a diferença aguda/basal que tem significado.' },
        ],
      },
    },
    {
      id: 'c6',
      title: 'Etapa 6 — Estratégias preventivas',
      narrative: [
        'O oncologista considera o paclitaxel essencial para o tratamento. Marta pergunta se poderá continuar.',
      ],
      decision: {
        prompt: 'Qual a abordagem mais adequada?',
        options: [
          { id: 'c6o1', text: 'Registrar a reação, notificar, encaminhar à alergia e imunologia para estratificação de risco (incluindo testes cutâneos quando aplicáveis) e discutir com a paciente: alternativa terapêutica ou reintrodução por dessensibilização rápida em ambiente monitorizado', quality: 'prioritaria', consequence: 'Marta completa os ciclos com protocolo de dessensibilização, sem reações graves.', rationale: 'Séries de casos mostram que a dessensibilização rápida permite manter quimioterápicos essenciais com segurança em centros preparados.' },
          { id: 'c6o2', text: 'Repetir o paclitaxel com dobro da pré-medicação', quality: 'inadequada', consequence: 'Nova anafilaxia é possível; pré-medicação não previne reação grave com segurança.', rationale: 'Pré-medicação pode reduzir reações leves, mas não é estratégia para reação grave prévia.' },
          { id: 'c6o3', text: 'Contraindicar definitivamente qualquer quimioterapia', quality: 'inadequada', consequence: 'Prejuízo oncológico desnecessário.', rationale: 'Existem estratégias para manter o tratamento com segurança.' },
        ],
      },
      teachingPoint: 'Decisão compartilhada: segurança imunológica e benefício oncológico precisam ser pesados juntos.',
    },
    {
      id: 'c7',
      title: 'Etapa 7 — Elucidação do quadro e possíveis mecanismos',
      reveal: true,
      narrative: [
        '**Diagnóstico: Anafilaxia grave (reação de hipersensibilidade imediata) durante infusão de paclitaxel, com ativação mastocitária documentada por triptase.**',
        '**Possíveis mecanismos**: historicamente, reações a paclitaxel foram atribuídas sobretudo ao veículo (Cremophor EL), com ativação do complemento e liberação de anafilatoxinas (C3a/C5a) que ativam mastócitos — mecanismo **não IgE**, que explica reações na 1ª ou 2ª exposição. Evidências mais recentes indicam que **parte das reações pode ser IgE-mediada**. A definição para cada paciente depende de avaliação especializada.',
        'Independentemente do mecanismo, a via final comum é a **degranulação de mastócitos/basófilos** — histamina, leucotrienos, PAF — com vasodilatação, extravasamento e broncoconstrição. Por isso o tratamento agudo é o mesmo: **adrenalina IM sem atraso**.',
        'O caso mostra como o diagnóstico mecanístico definitivo não deve atrasar a intervenção emergencial — e como, depois, ele orienta a prevenção.',
      ],
      teachingPoint: 'Tratar primeiro (adrenalina), entender depois (triptase, mecanismo), prevenir sempre (registro, especialista, dessensibilização).',
    },
  ],
};
