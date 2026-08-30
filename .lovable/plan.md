# Plano — Logo no início da página Progetti

## Diagnóstico
- O hero de `src/routes/progetti.tsx` usa o componente `YarnResearch` (SVG de fio horizontal), não a logo circular.
- Nenhum asset existente corresponde à logo da imagem de referência (espiral roxa/laranja dentro de um círculo pêssego): `fibromental-logo.png` e `fibromental-logo-transparent.png` são a bola de lã laranja/preta com texto.
- A imagem enviada pelo usuário contém exatamente a logo desejada no topo.

## O que será feito

1. **Extrair a logo da imagem enviada**
   - Recortar o círculo com a espiral do topo de `/mnt/user-uploads/image-3.png` (Python/PIL).
   - Gerar um PNG quadrado com fundo transparente, salvo como `src/assets/progetti-swirl-logo.png`.

2. **Atualizar o hero em `src/routes/progetti.tsx`**
   - Substituir `<YarnResearch />` por `<img src={progettiSwirl} alt="Logo FibroMental — Il percorso, le persone, i risultati" />`.
   - Posicionar a logo **acima** do título, como na referência: logo (~140–160px) → título "Il percorso, le persone, *i risultati*" → subtítulo do report.
   - Remover o import de `YarnResearch` se ficar sem uso.

3. **Verificação**
   - Conferir build OK e validar visualmente `/progetti` (desktop e mobile) com screenshot.

## Detalhes técnicos
- Arquivos alterados: `src/assets/progetti-swirl-logo.png` (novo), `src/routes/progetti.tsx`.
- Nenhuma mudança em outras páginas; `YarnResearch` não é usado em outro lugar.
