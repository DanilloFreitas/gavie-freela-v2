# Gavie — Site 2.0

Homepage da Gavie implementada a partir do Figma
[“Gavie — Site (cópia)”](https://www.figma.com/design/V6jYHgpsTrYg7Cntw3BbgA/Gavie-%E2%80%94-Site--c%C3%B3pia-?node-id=0-1)
(frames `Gavie — Homepage` 1440 e `iPhone 13 & 14` 390).

**Stack:** HTML5 semântico + Tailwind CSS v4 + JavaScript vanilla (ES Modules).
Sem framework, sem runtime — a saída é um site estático que pode ser publicado
em qualquer lugar (GitHub Pages, Netlify, Vercel, S3…).

---

## Como rodar

```bash
npm install
npm run dev        # build + Tailwind em watch + servidor em http://localhost:5173
```

Outros comandos:

| Comando               | O que faz                                                       |
| --------------------- | --------------------------------------------------------------- |
| `npm run build`       | Gera `public/` completo (HTML + JS + fontes + CSS minificado)    |
| `npm run build:html`  | Compõe `public/index.html` a partir de `src/templates`           |
| `npm run build:js`    | Copia `src/js` → `public/js` e gera `public/js/config.js`        |
| `npm run build:fonts` | Copia os `.woff2` usados e gera `public/css/fonts.css`           |
| `npm run build:css`   | Compila o Tailwind                                               |
| `npm run verify`      | Testes de interação e acessibilidade (Playwright)                |
| `npm run screenshots` | Prints full-page em 1440 / 820 / 390 dentro de `.tmp/`           |

> `npm run verify` e `npm run screenshots` usam o Playwright (devDependency).
> Na primeira execução pode ser necessário `npx playwright install chromium`.

---

## Deploy (Cloudflare Pages)

O projeto já está pronto para publicar direto do repositório:

1. Em [Cloudflare Pages](https://pages.cloudflare.com/) → **Create a project** → **Connect to Git** → escolha este repositório.
2. Configuração de build:
   | Campo                  | Valor           |
   | ----------------------- | --------------- |
   | Framework preset        | `None`          |
   | Build command            | `npm run build` |
   | Build output directory   | `public`        |
3. Deploy. Cada push em `main` gera um deploy novo automaticamente; PRs geram preview URLs.

> `public/` também fica versionado no repo (ver `.gitignore`), então dá pra
> apontar o output direto pra ele sem build (`Build command` em branco) se
> preferir — mas rodar `npm run build` no Cloudflare garante que o deploy
> sempre reflete o código-fonte mais recente, mesmo que alguém esqueça de
> rodar `npm run build` localmente antes do commit.

---

## Estrutura

```
src/
  data/
    site.js            ← textos globais, navegação, contato, WhatsApp
    products.js        ← catálogo (nome, preço, cores, tamanhos, enquadramento)
  templates/           ← "componentes": cada seção é uma função que devolve HTML
    page.js  header.js  hero.js  marquee.js
    collection.js  product-card.js  about.js  footer.js  image.js
  css/input.css        ← design tokens (@theme) + camada de componentes
  js/
    main.js
    modules/  sticky-header · mobile-nav · radio-group · product-card · reveal
scripts/               ← build de HTML, JS, fontes + verificação
public/                ← SAÍDA DO BUILD (é o que se publica)
```

### Componentização

Não existe framework, mas também não existe HTML repetido: cada seção é um
módulo em `src/templates/` e `public/index.html` é **gerado** por
`npm run build:html`. Os quatro cards de produto saem de `src/data/products.js`.

> ⚠️ Nunca edite `public/index.html`, `public/js/config.js` ou
> `public/css/fonts.css` à mão — eles são sobrescritos no build.

### Para adicionar um produto

Basta um objeto novo em `src/data/products.js` e rodar `npm run build`.
As cores usam os hex exatos das swatches do Figma.

---

## Design tokens

Definidos em `src/css/input.css`, no bloco `@theme` — ficam disponíveis como
utilitários do Tailwind **e** como CSS custom properties.

| Token                | Valor     | Uso no Figma                          |
| -------------------- | --------- | ------------------------------------- |
| `--color-ink`        | `#141312` | Texto principal, bordas do badge      |
| `--color-ink-soft`   | `#453F34` | Parágrafo da seção “Do seu jeito”     |
| `--color-muted`      | `#84796A` | Label “TAMANHO”                       |
| `--color-paper`      | `#F7F4EE` | Fundo do site e dos cards             |
| `--color-cream`      | `#FDFAF4` | Texto sobre o hero                    |
| `--color-line`       | `#E1D9C8` | Bordas de card, header e tamanhos     |
| `--color-gold`       | `#AD893C` | Preço, CTAs, marquee, footer          |
| `--color-sand`       | `#DCC7A6` | Fundo do CTA “Fale com a gente” (40 %)|

Tipografia: **Cormorant Garamond** (500/600) para a marca e o título do hero,
**Jost** (300/400/500/600) para todo o resto. As fontes são self-hosted em
`public/assets/fonts` — nenhuma requisição a servidores de terceiros.

---

## Responsividade

| Faixa              | Comportamento                                                                 |
| ------------------ | ----------------------------------------------------------------------------- |
| `< 1024px`         | Menu hambúrguer, hero centralizado, foto do “Sobre” acima do texto            |
| `640 – 1023px`     | Grid de produtos 2 colunas, footer em 2 colunas                                |
| `≥ 1024px`         | Nav horizontal, hero alinhado à direita, “Sobre” em 2 colunas (575 + 443)      |
| `≥ 1280px`         | Padding lateral de 100px, exatamente como no frame de 1440                     |

O grid de produtos é sempre de 2 colunas, como nos dois frames do Figma.

---

## Acessibilidade

- HTML semântico (`header`, `main`, `section`, `article`, `figure`, `address`, `footer`).
- Skip link, um único `h1`, hierarquia de headings consistente.
- Cores e tamanhos são `radiogroup` ARIA completos: setas navegam, só o item
  selecionado fica no tab order, `aria-checked` reflete o estado.
- Menu mobile com `aria-expanded`/`aria-controls`, fecha com `Esc` e ao clicar fora.
- Estados `:hover`, `:active` e `:focus-visible` em todos os elementos interativos.
- `prefers-reduced-motion` desliga o marquee e as animações de entrada.

---

## Pendências / decisões a confirmar

1. **Número de WhatsApp** — está com placeholder em `src/data/site.js`
   (`whatsapp: '5562000000000'`). Trocar pelo número real e rodar `npm run build`.
2. **Marquee animado** — o Figma mostra a faixa estática (limitação da ferramenta)
   e a omite no frame mobile. Foi implementada como marquee em loop contínuo,
   visível em todos os tamanhos; pausa no hover e com `prefers-reduced-motion`.
3. **Proporção da foto nos cards** — `607 × 386` (paisagem) a partir de 1024px,
   como no frame desktop; abaixo disso usa `4 / 5` em vez do `197 × 386` do frame
   mobile, que deixaria a foto desproporcionalmente alta num celular real.
4. **Header mobile** — o frame de 390 não tem logo nem botão de menu (a nav
   aparece cortada). Foi implementado logo à esquerda + hambúrguer à direita.
5. **Links de rodapé** — “Trocas e devoluções” e “Guia de tamanhos” apontam para
   `#contato`/`#colecao` até existirem as páginas correspondentes.
