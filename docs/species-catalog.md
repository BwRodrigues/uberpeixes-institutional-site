# Catálogo de espécies — histórico do protótipo V1

O PR #6 foi aprovado e incorporado à main. A seleção de cinco registros abaixo documenta a etapa original, não limita o catálogo atual. A expansão autorizada está em [processamento em lotes](catalogo/README.md) e no [relatório de pendências](catalogo-pendencias.md).

## Escopo e seleção

Exatamente os cinco primeiros registros válidos da aba `Tabela Peixes Atual`, linhas 6–10, do arquivo `VAREJO PEIXES NICHOS.xlsx`. O arquivo original e seus preços/valores financeiros não são distribuídos no repositório.

| Registro comercial     | Nome científico adotado |
| ---------------------- | ----------------------- |
| NEON CHINES (TANICTIS) | Tanichthys albonubes    |
| PEIXE AGULHINHA        | Dermogenys pusilla      |
| BARBUS CEREJA          | Rohanella titteya       |
| BARBUS CEREJA VEU      | Pethia conchonius       |
| BARBUS DENIZONI        | Dawkinsia denisonii     |

A loja confirmou Agulhinha Prata como `Dermogenys pusilla`. Os cinco registros comerciais representam cinco espécies biológicas após a correção da loja: BARBUS CEREJA VEU corresponde a Barbo Conchônio Cereja Véu, Pethia conchonius, e não a Rohanella titteya. O nome comercial original e o slug permanecem como registro histórico; a variedade véu não é um táxon separado. Não ampliar o catálogo antes da aprovação deste protótipo.

## Arquitetura

- `src/data/species/*.json`: um registro independente por animal comercial, incluindo identificação, fontes, créditos e seções.
- `src/data/species-schema.ts`: contrato TypeScript e seções esperadas.
- `src/data/species.ts`: descoberta automática, ordenação pela linha original e validação durante o build.
- `src/pages/especies/index.astro`: galeria estática com pesquisa sem acentos e filtro combinado por categoria; navegação permanece disponível sem JavaScript.
- `src/pages/especies/[slug].astro` e `SpeciesProfile.astro`: geração de todas as fichas com um único template.
- `src/config/site.ts`: contato oficial e mensagem específica de consulta. Não há preços nem indicação de estoque.
- `src/styles/species.css`: apresentação isolada do catálogo, sem redesenhar a home.

## Adicionar um animal após aprovação

1. Criar um JSON em `src/data/species/` seguindo o contrato de `species-schema.ts`; o prefixo do arquivo é organizacional; `sortOrder` define a ordem ou, nos registros importados, usa-se `source.row`. A origem de planilha é opcional para cadastros futuros.
2. Definir um slug único, preservar o nome comercial, preencher categoria, origem do registro e nome científico confirmado. Não copiar recomendações biológicas de outro animal.
3. Consultar fontes taxonômicas e de manutenção específicas. Cada campo precisa citar IDs existentes em `references`. Informar autor, título, ano quando publicado, URL e data real da consulta. Distinguir manutenção em aquário de registros na natureza.
4. Preencher as onze seções. Para informação não localizada, explicar a lacuna; não inventar longevidade, KH, números de indivíduos ou compatibilidade. `pending` permite deixar uma seção inteira pendente em um rascunho.
5. Colocar uma foto real e autorizada em `public/images/species/`. Informar dimensões reais, alt, autor, licença, URL da licença, página de origem e alterações efetuadas em `photo`. Acrescentar `note` para limitações da imagem. Não gerar uma imagem supostamente científica.
6. Acrescentar duas fotografias distintas em `additionalPhotos`, com o mesmo contrato de metadados de `photo`. A capa permanece em `photo`; as duas extras são mostradas automaticamente na galeria da ficha, com carregamento lazy. Não repetir a mesma captura em outro recorte.
7. Preencher `regions` com escala geográfica e IDs de referências do próprio animal. As sugestões são geradas automaticamente; avaliações de convivência revisadas ficam em `src/data/compatibility.json`. Copiar o registro dos créditos para `docs/species-image-credits.json` e conferir as condições da licença.
8. Manter `status: "draft"` até a revisão da loja e da ficha. Depois da aprovação, mudar para `reviewed`; o build rejeita registros revisados sem nome científico, foto, referências ou seções completas.
9. Executar check, build, formatação e testes. Conferir o animal real, as imagens, referências e o texto da consulta antes de abrir PR. Não editar templates para cada nova espécie.

## SEO e revisão

Cada rota possui título, descrição, canonical, Open Graph e BreadcrumbList próprios; fichas com conteúdo possuem Article sem autores, avaliações ou datas inventadas. Os cinco pilotos estão acessíveis, porém com `noindex, follow` até a revisão da loja. O sitemap inclui apenas rotas aprovadas e a página inicial; `/especies/` entra quando houver ao menos uma ficha revisada. Aprovar as cinco fichas libera suas URLs automaticamente sem alterar templates. O protótipo não afirma disponibilidade.

## Executar e revisar

```sh
npm ci
ASTRO_TELEMETRY_DISABLED=1 npm run check
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm run format:check
ASTRO_TELEMETRY_DISABLED=1 PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

Se Chromium estiver instalado por Playwright, omitir `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. `npm run dev` inicia o Astro para revisão local. Os testes exercitam desktop 1440 px, celular 375 px e celular estreito 320 px, incluindo home/aquário, navegação, busca, filtros, reset, ausência de resultados, cinco fichas, imagens, console, metadados e WhatsApp. Referências e identificação requerem revisão editorial: testes de interface não comprovam exatidão científica.

Revisão manual: abrir `/especies/`, pesquisar `VÉU` e `Dermogenys`, combinar com categoria, limpar, abrir cada ficha e expandir seções. Conferir links de fontes e créditos, mensagem de WhatsApp sem enviá-la, logo e ausência de rolagem horizontal. A home deve manter textos, imagens e destinos anteriores.

## Capturas de revisão

[Catálogo no desktop](review/species-catalog-desktop.png), [ficha da agulhinha no celular](review/species-profile-mobile.png) e [Conchônio Cereja Véu no celular](review/species-conchonio-mobile.png). Capturadas com movimento reduzido, sem modificar as animações do site.

## Preview navegável do PR #6

- Catálogo: https://feat-catalogo-especies.uberpeixes-institutional-site.pages.dev/especies/
- Exemplo de ficha: https://feat-catalogo-especies.uberpeixes-institutional-site.pages.dev/especies/peixe-agulhinha/

São páginas HTML navegáveis do Cloudflare Pages, não capturas. Abra o link HTTPS completo em uma nova aba do navegador; os botões “Ver ficha completa” abrem cada animal. O endereço da branch acompanha os novos deploys do PR, sem exigir merge na main. Uma imagem PNG/JPG da revisão é apenas uma captura e não contém navegação.

O check “Cloudflare Pages” do commit informa o endereço imutável de cada deploy e confirma seu resultado. O endereço da branch pode levar alguns instantes para apontar ao novo deploy. Um erro `CONNECT tunnel failed, response 403` no Codex indica bloqueio do proxy de saída antes de alcançar a hospedagem; não demonstra que a página esteja com erro para visitantes. Se o navegador apresentar uma tela de proteção do Cloudflare Access, revisar as configurações de acesso do preview no projeto existente; não publicar na main para contornar essa proteção.

## Revisão editorial

Os avisos públicos de protótipo foram removidos da listagem e das fichas. As ressalvas científicas e os créditos permanecem visíveis. O estado `draft` continua controlando indexação e sitemap até a aprovação editorial; a remoção do aviso visual não muda esse estado nem publica a main.

## Correção do quarto piloto

A loja confirmou o nome **Barbo Conchônio Cereja Véu — Pethia conchonius**. Todos os campos biológicos desse registro foram pesquisados novamente para essa espécie. O slug `/especies/barbus-cereja-veu/` foi mantido para não quebrar links já compartilhados; SEO, título, nome científico e mensagem de WhatsApp usam a identificação corrigida.

A galeria utiliza somente fotografias reais com licenças abertas, obtidas no Wikimedia Commons. Cada ficha reúne uma capa em `photo` e duas imagens em `additionalPhotos`, com créditos individuais em `docs/species-image-credits.json`. A seleção de Pethia inclui registros da espécie com diferentes extensões de nadadeiras; a legenda não afirma que toda foto representa a mesma linhagem comercial da loja. Nenhuma imagem é gerada por IA ou apresenta estoque confirmado.

## Conferência do deploy atualizado

O Cloudflare confirmou o deploy do commit `f4d6cb0`, e o endereço navegável da branch respondeu HTTP 200 sem autenticação. Deploy imutável dessa revisão: https://84e7811d.uberpeixes-institutional-site.pages.dev/especies/ . Os 12 testes do catálogo passaram no preview público, em desktop de 1440 px e celulares de 375/320 px; o link da branch acima acompanha os commits seguintes. Essa verificação é independente das capturas PNG.

[Galeria no desktop](review/species-gallery-desktop.png) e [galeria no celular](review/species-gallery-mobile.png).

## Galerias de três fotografias

As cinco fichas têm três fotografias distintas cada: 15 imagens no total, mantidas localmente em WebP. A listagem carrega apenas a capa e informa “3 fotos da espécie”; clicar na capa abre a ficha, sem levar o visitante a um arquivo JPG. Na ficha, a capa e as duas fotos extras podem ser abertas em tamanho completo pelo teclado ou toque, sem dependência de JavaScript ou carrossel externo.

Todas as fotos incluem dimensões reais, alt descritivo, fotógrafo, origem, licença gratuita e declaração da conversão. Fotos CC BY/CC BY-SA mantêm atribuição e a licença de cada arquivo; imagens em domínio público também conservam seus créditos de origem. `validateSpeciesCatalog` verifica os metadados das imagens adicionais e rejeita caminhos/páginas de origem duplicados na mesma ficha. A conferência visual também excluiu recortes da mesma captura e uma imagem cuja própria descrição indicava dúvida de identificação.

## Seções expansíveis, semântica e conteúdo inicial

`SpeciesProfile.astro` renderiza todo o conteúdo científico diretamente no HTML estático, incluindo os campos das seções fechadas e todas as referências. Os textos não dependem de clique, fetch ou JavaScript para existir no documento. Cada ficha possui um H1, seções principais com H2 e campos/subseções com H3.

Os elementos nativos `details`/`summary` deixam Apresentação, Classificação científica e Habitat e parâmetros da água abertos por padrão. As outras oito seções científicas começam fechadas e podem ser abertas/fechadas pelo teclado ou toque. Referências bibliográficas permanecem em uma seção normal, sempre aberta, fora das seções expansíveis. Não há atributos ARIA manuais duplicando o estado expandido controlado pelo navegador.

O menu lateral é preservado. Um aprimoramento pequeno em JavaScript abre a seção de destino e encaminha o foco ao seu `summary`; hashes diretos também abrem o destino. Sem JavaScript, os links e as seções expansíveis nativas continuam disponíveis. O botão persistente do WhatsApp e os metadados/canonicals/JSON-LD foram preservados. A política de revisão/noindex do protótipo é independente deste ajuste.

Os testes adicionais com JavaScript desativado verificam as cinco respostas HTML iniciais contra todos os campos científicos dos JSONs, inclusive conteúdo recolhido, títulos H1/H2/H3, referências abertas, expansão com Enter, recolhimento com espaço e acesso ao WhatsApp em 1440, 375 e 320 px. Também verificam abertura e foco ao navegar pelo menu e por URL com fragmento.

## Recomendações, novas espécies e integrações

A seção **Conheça outras espécies** é gerada por `SpeciesRecommendations.astro` e pelo repositório de dados compartilhado. Consulte [a arquitetura e as decisões técnicas](catalog-architecture.md) para cadastro, critérios de indicação, contrato de exportação e futura integração com banco/chatbot.

Cada novo JSON validado gera automaticamente ficha, cartão, pesquisa/filtro, candidatos de sugestão, links internos e SEO individualizado. Forneça dados e três fotos próprios da espécie, sem copiar cuidados biológicos de outro cadastro. Regiões exigem fontes; convivência exige avaliação específica revisada. Se não houver candidatos fundamentados suficientes, o catálogo mostra menos de três sugestões, em vez de preencher com afirmações não comprovadas.
