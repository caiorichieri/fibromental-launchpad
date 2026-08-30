# Plano — Progetti como índice de projetos + gestão admin

## Estrutura de rotas
- `src/routes/progetti.tsx` → vira **layout** (só `<Outlet />`).
- `src/routes/progetti.index.tsx` → **índice** em `/progetti`: hero + grade de cards retangulares, um por projeto.
- `src/routes/progetti.report-2026.tsx` → o report atual é movido para `/progetti/report-2026`, conteúdo inalterado.
- `head()` próprio em cada rota. Nenhum link existente quebra.

## Índice (/progetti)
- Hero: pill "Progetti · FibroMental", título "I nostri progetti", subtítulo.
- Grade responsiva de cards retangulares (`repeat(auto-fit, minmax(280px, 1fr))`), no estilo `area-card`.
- **Card fixo** do projeto atual: logo **CFU-Italia ODV** (`src/assets/cfu-italia-logo.png`), título "Percorso psicologico FibroMental 2026", meta "8 partecipanti · maggio–agosto 2026", texto breve e CTA "Leggi il report" → `/progetti/report-2026`.
- Abaixo dele, os projetos cadastrados no backend (ver abaixo) na mesma grade.

## Gestão pelo admin
- Nova tabela `projects` no backend: título, sottotitolo, descrição breve, logo/immagine (URL), link (interno ou esterno), data/periodo, ordem, publicado.
  - RLS: leitura pública apenas dos publicados; escrita restrita a admin via `has_role`; GRANTs padrão.
  - Upload de logo/imagem no bucket público já existente `blog-covers` (pasta `projects/`).
- Server functions em `src/lib/projects.functions.ts` seguindo o padrão de `blog.functions.ts`: `getPublishedProjects`, `listManagedProjects`, `createManagedProject`, `updateManagedProject`, `publishManagedProject`, `deleteManagedProject`, `uploadProjectImage` — todas as de escrita validando admin.
- Nova aba admin `src/routes/admin.progetti.tsx`, mesmo layout/estilos do `admin.blog.tsx` (form à esquerda, lista à direita, login reutilizado).
- Link "Progetti" na área riservata para alternar entre gestão de Blog e Progetti.
- O índice `/progetti` carrega os projetos publicados via loader e os renderiza como cards.

## Logo no hero do report (pendente anterior)
- Extrair a espiral circular do topo da imagem enviada (`/mnt/user-uploads/image-3.png`) e salvar como `src/assets/progetti-swirl-logo.png` (transparente).
- No hero do report: usar essa logo acima do título, substituindo `<YarnResearch />`.

## Verificação
- Build OK; screenshots de `/progetti`, `/progetti/report-2026` e `/admin/progetti` (desktop e mobile).

## Detalhes técnicos
- Arquivos: `src/routes/progetti.tsx`, `src/routes/progetti.index.tsx` (novo), `src/routes/progetti.report-2026.tsx` (movido), `src/routes/admin.progetti.tsx` (novo), `src/lib/projects.functions.ts` (novo), migração SQL da tabela `projects`, `src/assets/progetti-swirl-logo.png`.
- Layout pai renderiza só `<Outlet />`; strings de `createFileRoute` coincidem com os nomes dos arquivos.
