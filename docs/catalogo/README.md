# Expansão em lotes, sem recriar páginas

## O que fica salvo

- `importacao.json`: inventário imutável da entrada, com hash do XLSX, aba, linha, categoria e nome comercial. Não contém preços, valores financeiros, telefones nem texto das abas de prompts.
- `resolucoes.json`: decisão explícita para cada uma das 212 linhas, incluindo identificação pendente. Um agrupamento candidato não comprova identidade comercial.
- `fontes.json`: nome aceito, autoridade, família e URL individual do Catalog of Fishes; comparação GBIF; fonte específica de manutenção; números transcritos dessa fonte; estado de conferência das fotos.
- `pesquisa.json`: sínteses originais por espécie; não há texto biológico padrão copiado de outra ficha. Não usar uma ficha vizinha como modelo de parâmetros.
- `fotos.json`: seleção por espécie e metadados de cada arquivo Commons: ID, autor, licença, página de origem, SHA-1 do original, dimensões, conversão e SHA-256 do WebP quando processado. Seleções ainda não baixadas não são fotografias publicadas.
- `preservados.json`: hashes dos cinco JSONs do PR #6, para impedir sobrescrita silenciosa.
- `lotes.json`: checkpoint das fichas geradas e validação de cada lote.

A planilha original não é versionada porque contém informações comerciais que não devem ser publicadas como conhecimento científico ou estoque. Mantenha o XLSX de entrada em local privado e use seu caminho local nos comandos abaixo.

## 1. Importar uma entrada sem executar seu conteúdo

```sh
python3 scripts/import_species_workbook.py /caminho/VAREJO\ PEIXES\ NICHOS.xlsx
```

O importador percorre todas as abas e aceita somente tabelas com cabeçalhos NICHO/ESPÉCIE. Fórmulas não são executadas; abas de instruções são inventariadas sem exportar seus textos. Nomes usam normalização apenas para comparação; nenhum nome científico é inferido por similaridade. Rodar novamente a mesma entrada é idempotente. Uma entrada diferente provoca erro e exige revisão explícita do inventário; não substituir a origem de um lote em andamento silenciosamente.

## 2. Resolver identificação e pesquisar

Para cada registro: conferir espécie, sinônimos, fonte e categoria. Cadastrar agrupamento explícito em `resolucoes.json` e `fontes.json`. Linhas da mesma espécie podem apontar a um único grupo; a primeira linha define a ordem e a categoria pública, e as outras preservam nomes alternativos. Não juntar híbridos, cores ambíguas ou espécies de gênero próximo por conveniência.

Consultar a ficha oficial individual do Catalog of Fishes para taxonomia. As ordens e a classe seguem a tabela por famílias do mesmo catálogo. GBIF serve para comparação e reino/filo; suas famílias e gêneros podem estar defasados. Nas novas fichas, exemplos confirmados incluem Danionidae para Danio, Botiidae para Yasuhikotakia, Acestrorhamphidae para vários tetras, Hoplisoma schwartzi, Megalamphodus eques e Bario sanctaefilomenae. Os cinco JSONs aprovados anteriormente não são alterados por essa decisão.

Pesquisar manutenção sob o nome atual ou um sinônimo comprovado. Registrar fatos próprios em `pesquisa.json`; números em `careNumbers` precisam vir da fonte daquela espécie. Valores ausentes permanecem pendentes. As faixas são de manutenção, não extremos naturais. Os litros de fontes antigas recebem contexto; não autorizam superlotação nem dispensam dimensões, sexo, grupo e território.

## 3. Fotografias e licenças

Consultar metadados individuais do Wikimedia Commons; conferir identificação, autor e licença comercial. Não obter imagens de lojas, redes sociais, busca de imagens ou geração por IA. Excluir desenhos, espécimes preservados, fotos de espécie duvidosa e recortes duplicados da mesma captura. Selecionar três capturas distintas e preencher `fotos.json`.

A ferramenta de otimização usa Python 3 com Pillow disponível no ambiente de revisão; o site e o build não ganham dependências. Para recriar essa ferramenta em outra máquina, instalar Pillow no ambiente Python de desenvolvimento, sem mudar dependências de produção do Astro.

```sh
# Somente cache: não realiza chamadas externas.
python3 scripts/catalog/download_photos.py
# Baixa no máximo dez arquivos; originais e processamento ficam em /tmp.
python3 scripts/catalog/download_photos.py --download --limit 10
```

O downloader utiliza o original HTTPS oficial, verifica SHA-1 informado pelo Commons, preserva proporções, limita a 960 × 900 px e converte para WebP com qualidade 83. Não amplia fotos pequenas e não recorta nem remove elementos. Originais ficam fora do Git. SHA-256 e dimensões reais são salvos no manifesto. Ao receber HTTP 429, registra Retry-After no cache e interrompe a fila; uma nova execução antes do prazo é recusada. Não usar outro domínio ou identidade para contornar a limitação.

Conferir visualmente os três arquivos e suas atribuições. Copiar apenas o conjunto aprovado para `public/images/species/` e marcar `photoReview: "verified"`. Isso significa conferência visual/licença dos arquivos, não aprovação científica final do cadastro. Não marcar como verificado apenas porque uma busca retornou o nome do peixe. Se mudar o arquivo escolhido, conferir ID e hash antes de reutilizar o cache.

## 4. Preparar e validar um lote

```sh
# Mostra candidatos elegíveis; não modifica o catálogo.
python3 scripts/catalog/prepare_batch.py --batch lote-02 --limit 10
# Gera apenas os novos, sem sobrescrever arquivos existentes.
python3 scripts/catalog/prepare_batch.py --batch lote-02 --limit 10 --apply
npm run test:import
npm run catalog:audit
ASTRO_TELEMETRY_DISABLED=1 npm run check
ASTRO_TELEMETRY_DISABLED=1 npm run build
ASTRO_TELEMETRY_DISABLED=1 PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

Sem o Chromium do sistema, usar o navegador instalado pelo Playwright e omitir a variável. Antes de continuar, resolver falhas do lote. Após os comandos passarem:

```sh
python3 scripts/catalog/audit_catalog.py --validated-batch lote-02 --write
npm run format
# Revisar somente as alterações desta etapa; registrar commit com título e corpo em inglês.
```

O gerador exige taxonomia, síntese individual, números documentados, três fotos conferidas, arquivos locais e hashes correspondentes. Retoma pulando nomes científicos já cadastrados e rejeita conflitos de slug, sem reescrever fichas. A geração não cria compatibilidade biológica por inferência. Todos os novos cadastros permanecem em draft/noindex até revisão editorial.

O relatório `../catalogo-pendencias.md` reconcilia cada linha e lista nominalmente todo o trabalho pendente. Estados são exclusivos: existente, ficha nova, alias incorporado, pendente científico/fotográfico ou identificação pendente. Um nome comercial pendente não entra como espécie biológica confirmada; o total final permanece indeterminado até resolver as ambiguidades. Repetir a auditoria e a geração não duplica fichas.

## Sugestões e integrações

O mesmo repositório de dados continua gerando fichas, busca, filtros, sugestões, links e SEO. Relações geográficas exigem fonte e escala nos dois animais. Indonésia é um país transcontinental; compartilhar o país não significa mesma ilha ou habitat. Convivência só pode ser exibida com avaliação específica revisada do par, incluindo água, comportamento, tamanho adulto e espaço. A fila de pesquisa não aprova avaliações automaticamente.

O contrato de banco e chatbot permanece o do PR #6: `CatalogRepository` e `/dados/catalogo-especies.json`. O conteúdo público novo entra no mesmo exportador, com estado editorial e referências; preços, estoque e dados privados da planilha permanecem fora. Nenhum serviço de banco, chatbot ou hospedagem extra foi criado.

## Publicação

Abrir PR da branch `feat/expandir-catalogo-especies` para main e aguardar revisão. O preview navegável deve vir do check Cloudflare Pages do próprio commit. Não fazer merge nem publicar produção sem autorização da loja.

## Interface e revisão final desta etapa

- O componente compartilhado não exibe mais as notas de redimensionamento/conversão. Os créditos de autor, origem e licença continuam acessíveis, assim como avisos relevantes sobre identificação/população.
- Os identificadores internos `cof`, `care`, `revision`, `class` e `gbif` continuam estáveis nos dados, mas são apresentados como Taxonomia, Cuidados, Revisão científica, Classificação e Biodiversidade. Não é necessário editar todas as fichas para mudar rótulos.
- O bloco técnico com nome/linha da planilha saiu da interface; a rastreabilidade permanece nos dados e neste diretório.
- A ficha continua sendo o template aprovado: conteúdo completo no HTML, seções nativas, referências abertas, navegação lateral, logo e WhatsApp. Nenhuma informação comercial ou animação foi alterada.
- Nenhuma nova convivência foi inferida. As três sugestões automáticas usam regiões explicitamente documentadas e identificam a relação geográfica, com ressalva de que não recomenda aquário comunitário.
- Cinco fichas prévias são protegidas por hashes. A substituição da terceira fotografia de Puntigrus tetrazona afeta somente uma ficha nova desta expansão, para trocar uma tomada distante por um retrato representativo.
- O endpoint JSON versionado mantém os campos estruturados e referências para futura camada de persistência ou chatbot; esta etapa não cria banco de dados, recomendações veterinárias nem respostas automáticas sem fontes.

As 123 linhas pendentes incluem 22 plantas, nomes comerciais não resolvidos, variedades e oito grupos candidatos não concluídos. Não correspondem necessariamente a 123 espécies distintas. A lista nominal e os motivos estão no relatório gerado, que deve ser atualizado a cada retomada.
