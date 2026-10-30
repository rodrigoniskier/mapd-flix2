# Figuras didáticas (19)

Imagens em `public/img/figuras/<id>.webp` (1536×1024, convertidas dos PNG originais gerados por IA, guardados localmente em `imagens-ia/`, fora do Git). A lista de ids está em `src/data/figures.ts`; os SVG de `src/illustrations` ficam como alternativa. Roteiro usado: [PROMPT-MESTRE-IMAGENS.md](PROMPT-MESTRE-IMAGENS.md).

> Relatório de verificação entregue junto com as imagens (revisão pela própria ferramenta geradora, não por especialista).


Foram geradas 19 figuras com a ferramenta integrada de geração de imagens e salvas em imagens-ia/. Os arquivos foram abertos para verificar formato PNG, dimensões de 1536 × 1024 pixels, quantidade e nomes. A inspeção visual ocorreu sobre as imagens exibidas durante a geração. Os rótulos foram revisados visualmente em português brasileiro; siglas e nomes científicos em latim foram preservados.

Os gráficos 12 e 18 foram comparados visualmente aos valores fornecidos. A verificação visual não é uma medição de cada coordenada de pixel. Há variações de tons, gradientes e margens entre figuras; não se declara correspondência exata de todos os códigos hexadecimais ou estilo estritamente vetorial. São imagens rasterizadas.

Nenhum arquivo do aplicativo existente foi alterado. Hotspots não foram criados nem reposicionados nesta etapa.

| Nº | Arquivo | Revisão dos rótulos | Simplificação / ajuste |
|---|---|---|---|
| 1 | timo-selecao.png | Português revisado, sem erro ortográfico identificado. | Seleção e compartimentos esquemáticos; a figura começa com timócitos no córtex, sem representar toda a rota de entrada. AIRE e destino Treg resumidos. |
| 2 | treg-supressao.png | Português revisado, sem erro ortográfico identificado. | Supressão resumida em retirada de B7, citocinas e consumo de IL-2; removida apresentação de antígeno indevida pela Treg ao T efetor. |
| 3 | mimetismo-molecular.png | Português revisado, sem erro ortográfico identificado. | Um mesmo TCR representa reconhecimento alternado e reação cruzada, não ligação simultânea física às duas APCs. |
| 4 | mecanismos-lesao-autoimune.png | Português revisado, sem erro ortográfico identificado. | Três mecanismos representativos; outras vias e interações foram omitidas. |
| 5 | complemento-vias.png | Português revisado, sem erro ortográfico identificado. | Cascata abreviada, sem todos os componentes das convertases; incluída clivagem de C5 antes dos efetores terminais. A ação de C1q/MBL é indireta por etapas omitidas. |
| 6 | anticorpo-estrutura.png | Português revisado, sem erro ortográfico identificado. | Estrutura e interações fora de escala; C1q mostrado com IgG agrupadas; cadeia leve e pesada diferenciadas por tons. |
| 7 | fan-padroes.png | Português revisado, sem erro ortográfico identificado. | Padrões ilustrados em células em interfase; quantidade de pontos centroméricos aproximada, não contagem cromossômica nem imagem diagnóstica. |
| 8 | imunossupressao-alvos.png | Português revisado, sem erro ortográfico identificado. | Mapa funcional abreviado; T ajuda B, sem representar conversão de T em B. Anti-CD20 sobre B e plasmócito marcado CD20−. |
| 9 | imunidade-camadas.png | Português revisado, sem erro ortográfico identificado. | Associações típicas, não exclusivas; Neisseria relacionada à via terminal do complemento. Exemplos microbianos limitados. |
| 10 | linfocitos-b-t-defeitos.png | Português revisado, sem erro ortográfico identificado. | Árvore simplificada sem todos os progenitores; SCID com T reduzidos e B/NK variáveis; hipoplasia tímica e checkpoint pré-B resumidos. |
| 11 | hiv-cd4.png | Português revisado, sem erro ortográfico identificado. | História natural sem tratamento esquemática, com tempo variável; carga viral sem escala quantitativa e CD4 com escala ilustrativa. Interação molecular não está em escala. |
| 12 | citometria-subpopulacoes.png | Português revisado, sem erro ortográfico identificado. | Valores fornecidos são ilustrativos de subpopulações e não são critérios ou intervalos laboratoriais. |
| 13 | gell-coombs.png | Português revisado, sem erro ortográfico identificado. | Uma via representativa por tipo; tipo II inclui aqui o mecanismo citotóxico, com alterações funcionais abordadas na figura 15. |
| 14 | mastocito-degranulacao.png | Português revisado, sem erro ortográfico identificado. | Síntese e secreção de mediadores resumidas, sem vias de sinalização intracelular. |
| 15 | tipo2-citotoxicidade.png | Português revisado, sem erro ortográfico identificado. | Miastenia mostrada pelo bloqueio funcional; também pode envolver perda de receptores e lesão dependente de complemento, omitidas neste painel. ADCC separada em célula-alvo nucleada. |
| 16 | imunocomplexo-deposicao.png | Português revisado, sem erro ortográfico identificado. | Vaso e recrutamento em vista longitudinal simplificada; depósito na parede e lesão em locais separados para legibilidade, não uma reconstrução espacial real. |
| 17 | tipo4-celular.png | Português revisado, sem erro ortográfico identificado. | Th1/Th17 e CD8 resumidos; IL-17 representa recrutamento predominantemente indireto; 48–72 h é o tempo típico da resposta tardia, não de toda ação citotóxica. |
| 18 | triptase-curva.png | Português revisado, sem erro ortográfico identificado. | Curva hipotética com os pontos fornecidos; eixo temporal não linear e basal indicado ≥24 h após resolução. Não representa trajetória obrigatória de toda anafilaxia. |
| 19 | anafilaxia-adrenalina.png | Português revisado, sem erro ortográfico identificado. | Local e efeitos farmacológicos esquemáticos; profundidade desenhada sem escala, sem seleção de agulha, dose ou protocolo completo de administração. |

## Fontes consultadas para ajustes de precisão

- Entrada tímica e organização da seleção: [Assembling the thymus medulla](https://pmc.ncbi.nlm.nih.gov/articles/PMC11475500/) e [The Thymic Orchestration Involving Aire](https://pmc.ncbi.nlm.nih.gov/articles/PMC4500981/).
- CD20 e ausência em plasmócitos normais: [Rituximab — NCBI LiverTox](https://www.ncbi.nlm.nih.gov/books/NBK548249/pdf/Bookshelf_NBK548249.pdf).
- Fenótipos variáveis de SCID: [Immune Deficiency Foundation — SCID](https://primaryimmune.org/understanding-primary-immunodeficiency/types-of-pi/severe-combined-immunodeficiency-scid).
- Checkpoint de BTK: [Bruton's tyrosine kinase is required for signaling the CD79b-mediated pro-B to pre-B cell transition](https://pubmed.ncbi.nlm.nih.gov/11282988/).
- Triptase e adrenalina intramuscular: [World Allergy Organization Anaphylaxis Guidance 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7607509/) e [AAAAI — Anaphylaxis in Practice](https://www.aaaai.org/Aaaai/media/Media-Library-PDFs/Allergist%20Resources/Statements%20and%20Practice%20Parameters/Anaphylaxis-in-Practice-2023.pdf).

As fontes embasam os ajustes pontuais; esta revisão não equivale a avaliação independente por especialista de toda a coleção.

