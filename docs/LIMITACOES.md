# Limitações e pendências reais

1. **Next.js não utilizado.** O registro npm estava bloqueado no ambiente de desenvolvimento; o app foi feito com React + TypeScript + Tailwind + esbuild (todos testados). A migração para Next.js está descrita em `ARQUITETURA.md`.
2. **Deploy na Vercel/GitHub não realizado.** Não havia credencial válida do GitHub nem da Vercel no ambiente. O projeto está pronto (`vercel.json`); basta importar o repositório na Vercel. Uma versão hospedada foi publicada como Artifact no claude.ai (privada até ser compartilhada).
3. **Paginação da obra-base.** O manuscrito consultado não tem paginação; os caps. 19, 20 e 22 são citados sem página. Na versão do manuscrito, imunidade inata e adaptativa são os caps. 17 e 18 (no prompt e nos slides do autor: 16 e 17). Recomenda-se conferir a numeração com a edição impressa (ISBN 9798187758487).
4. **Vídeos.** Verificados por metadados (disponibilidade, duração, canal, incorporação). O conteúdo falado deve ser assistido pelo docente antes do uso. O vídeo de Autoimunidade é em inglês (legendas em inglês; tradução automática para português).
5. **Incorporação de vídeo em ambientes restritos.** Em alguns hospedeiros (ex.: páginas com política de conteúdo restritiva), o `iframe` do YouTube pode não carregar; o link direto permanece.
6. **Fontes web.** Inter e Sora vêm do Google Fonts; sem internet, o app usa fontes do sistema.
7. **Progresso apenas local.** Não há sincronização entre dispositivos nem acompanhamento docente — a arquitetura está preparada (armazenamento injetável e modelo versionado).
8. **Revisão docente.** O conteúdo foi alinhado à obra-base e a referências verificáveis, mas deve ser revisado pelo autor antes do uso com estudantes, especialmente doses, condutas e informações sobre disponibilidade no SUS (TREC, PCDT), que mudam com o tempo.
9. **Acessibilidade.** Testes automatizados básicos; não houve auditoria com leitores de tela reais.
10. **Séries futuras.** Antitumoral e Transplantes aparecem como “Em breve”, sem conteúdo.
