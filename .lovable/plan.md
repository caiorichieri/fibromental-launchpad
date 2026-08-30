# Plano — Progetti vira índice com cards de projetos

## Estrutura de rotas
- `src/routes/progetti.tsx` → vira **layout** (`<Outlet />`).
- `src/routes/progetti.index.tsx` → **nova página índice** em `/progetti`: hero + grade de cards retangulares, um por projeto.
- `src/routes/progetti.report-2026.tsx` → o report atual ("Il percorso, le persone, i risultati") é movido para `/progetti/report-2026`, sem alterar conteúdo.
- Atualizar o `head()` de cada rota (título/descrição próprios). `/progetti` continua existindo (agora como índice), então nenhum link quebra.

## Página índice (/progetti)
- Hero no padrão do site: pill "Progetti · FibroMental", título "I nostri progetti", subtítulo.
- Grade responsiva de **cards retangulares** (`repeat(auto-fit, minmax(280px, 1fr))`), mesmo visual dos `area-card` do site.
- **Primeiro card**: logo do **CFU-Italia ODV** (`src/assets/cfu-italia-logo.png`) em destaque, título "Percorso psicologico FibroMental 2026", linha "In collaborazione con CFU-Italia ODV · 8 partecipanti · maggio–agosto 2026", texto breve e CTA "Leggi il report" → link para `/progetti/report-2026`.
- Estrutura pronta para próximos projetos: basta adicionar novos cards ao array.

## Logo no hero do report (pendente anterior)
- Extrair a espiral circular do topo da imagem enviada (`/mnt/user-uploads/image-3.png`) via PIL, salvar como `src/assets/progetti-swirl-logo.png` (fundo transparente).
- No hero do report: substituir `<YarnResearch />` pela imagem da logo acima do título, remover o import se ficar sem uso.

## Navegação
- Link "Progetti" no header continua apontando para `/progetti` (agora o índice).

## Verificação
- Build OK; screenshots de `/progetti` e `/progetti/report-2026` em desktop e mobile.

## Detalhes técnicos
- Arquivos: `src/routes/progetti.tsx` (layout), `src/routes/progetti.index.tsx` (novo), `src/routes/progetti.report-2026.tsx` (movido), `src/assets/progetti-swirl-logo.png` (novo).
- Regra TanStack: layout pai renderiza só `<Outlet />`; strings de `createFileRoute` correspondem aos nomes dos arquivos (`/progetti`, `/progetti/`, `/progetti/report-2026`).
