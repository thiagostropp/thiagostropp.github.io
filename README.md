# Thiago Stropp — página pessoal

Site estático em português, preparado para GitHub Pages, sem dependências de build. Apresenta Thiago e conecta o perfil pessoal à Cia. do Circuito em Bauru.

## Rodar localmente

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Acesse http://127.0.0.1:8765/. O conteúdo, os links e as perguntas frequentes funcionam sem JavaScript.

## Arquivos

- `index.html`: conteúdo, metadados e dados estruturados.
- `assets/style.css`: tema escuro, tipografia ampliada, layout responsivo e movimento reduzido.
- `assets/main.js`: circuito e easter eggs, sem requisições externas nem armazenamento do visitante.
- `assets/favicon.svg`: monograma vetorial.
- `assets/social.png`: cartão de compartilhamento, 1200 × 630.
- `robots.txt` e `sitemap.xml`: descoberta da página por buscadores.
- `_config.yml`: configuração mínima para GitHub Pages/Jekyll.

## Decisões de conteúdo e SEO

A versão anterior tinha textos genéricos, vários links HTTP para a mesma página e dependia de fontes e ícones externos. A revisão dá destaque ao perfil pessoal, diferencia contato pessoal e assistência técnica e encaminha cada serviço à sua página específica.

A apresentação pessoal coloca eletrônica, diagnóstico e reparo em primeiro plano, junto às competências em infraestrutura física e nuvem, conforme informado por Thiago. Não atribui a ele a profissão de desenvolvedor.

O título, a descrição e o conteúdo associam Thiago à Cia. do Circuito de forma contextual. O JSON-LD conecta `ProfilePage`, `Person` e `LocalBusiness` por identificadores estáveis. Foram incluídos canonical, imagem social, sitemap e favicon; a antiga meta keywords foi removida.

Serviços, endereço, telefone e rotas foram conferidos no [site oficial da empresa](https://ciadocircuito.com.br/). A estrutura segue o [guia de SEO do Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). Não foram adicionadas avaliações, estatísticas ou credenciais não comprovadas. Preços e horários continuam no site comercial para evitar duplicar informações que mudam.

## Easter eggs — spoilers

Inspirados nos relatórios sarcásticos e no console escondido da Cia. do Circuito:

- Toque/clique no chip `ts.`: abre o terminal de bancada.
- `↑ ↑ ↓ ↓ ← → ← → B A`: abre o terminal com uma mensagem especial.
- `bancada()` no console do navegador: outro acesso ao terminal.
- Comandos: `ajuda`, `diagnostico`, `status`, `cafe`, `dns`, `ping`, `sudo`, `42`, `limpar` e `sair`.
- `diagnostico` alterna seis relatórios fictícios de bancada.
- Clique em “café” no rodapé: três mensagens progressivas.
- Ligue e desligue o circuito algumas vezes: ele também perde a paciência.

O terminal é uma brincadeira local: usa respostas predefinidas e `textContent`, sem executar código digitado. Escape, botão de fechar e clique fora fecham o diálogo; o foco volta ao gatilho. As animações respeitam a preferência por movimento reduzido.

## Validação realizada

Chromium: larguras de 320, 375, 768, 1024 e 1440 px sem overflow horizontal; circuito, terminal, café, Konami, FAQ, Escape e retorno de foco; ausência de erros JavaScript; conteúdo com JavaScript desativado; JSON-LD válido; âncoras internas válidas; movimento reduzido. Auditoria axe-core 4.10.3 sem violações automáticas WCAG A/AA nos recortes testados da página e do diálogo. A auditoria automática não substitui uma revisão completa com tecnologias assistivas.

## Cache dos arquivos

Antes de publicar, execute `python3 scripts/version_assets.py`. As URLs do CSS, JavaScript, favicon e imagem social recebem `?v=` com um hash do conteúdo. Arquivos alterados passam a usar URLs novas; arquivos iguais preservam suas versões. Confira com `python3 scripts/version_assets.py --check`.

Isso evita reutilizar assets antigos quando o HTML atualizado chega ao navegador. O HTML ainda pode ficar em cache: o GitHub Pages entregava `Cache-Control: max-age=600` na verificação de 04/10/2026. A mudança não elimina esse cache nem controla o cache das redes sociais.

## Publicação e manutenção

As alterações precisam ser enviadas ao repositório para entrar no fluxo de publicação do GitHub Pages já configurado. Depois da publicação, conferir a URL pública e enviar `https://thiagostropp.github.io/sitemap.xml` no Search Console da propriedade correspondente. Melhorias técnicas não garantem posição no Google.

Ao mudar domínio, atualizar canonical, URLs sociais, IDs do JSON-LD, sitemap, robots e `_config.yml`. Ao mudar os dados da empresa, atualizar tanto o texto visível quanto o JSON-LD.
