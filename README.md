# Gavie — Site 2.0

Homepage da Gavie implementada a partir do Figma
[“Gavie — Site (cópia)”](https://www.figma.com/design/V6jYHgpsTrYg7Cntw3BbgA/Gavie-%E2%80%94-Site--c%C3%B3pia-?node-id=0-1)
(frames `Gavie — Homepage` 1440 e `iPhone 13 & 14` 390).

**Stack:** HTML5 semântico + Tailwind CSS v4 + JavaScript vanilla (ES Modules).
Sem framework, sem runtime — a saída é um site estático (`public/`) que pode
ser publicado em qualquer lugar (Cloudflare Pages, GitHub Pages, Netlify,
Vercel, S3…).

---

## Estrutura

```
src/
  data/
    site.js            ← textos globais, navegação, contato, WhatsApp
    products.js        ← catálogo (nome, preço, cores, tamanhos, enquadramento)
    size-guide.js       ← tabela de medidas do modal "Guia de tamanhos"
  templates/           ← "componentes": cada seção é uma função que devolve HTML
    page.js  header.js  hero.js  marquee.js
    collection.js  product-card.js  about.js  footer.js  size-guide.js  image.js
  css/input.css        ← design tokens (@theme) + camada de componentes
  js/
    main.js
    modules/  sticky-header · mobile-nav · radio-group · product-card
              · reveal · size-guide · marquee
scripts/               ← build de HTML, JS, fontes + verificação
public/                ← SAÍDA DO BUILD (é o que se publica)
```

### Componentização

Não existe framework, mas também não existe HTML repetido: cada seção é um
módulo em `src/templates/` e `public/index.html` é **gerado** a partir deles.
Os quatro cards de produto saem de `src/data/products.js`.

> ⚠️ Nunca edite `public/index.html`, `public/js/config.js` ou
> `public/css/fonts.css` à mão — eles são sobrescritos no build.

### Para adicionar um produto

Basta um objeto novo em `src/data/products.js`. As cores usam os hex exatos
das swatches do Figma; o campo opcional `colors[].image` aponta pra uma foto
real da peça naquela cor (`public/assets/img/colors/<slug>.{jpg,webp}`) — sem
ele, o card mantém a foto padrão do produto ao trocar de cor.

---

## Funcionalidades

- **Troca de foto por cor** — ao clicar num swatch, a foto do card muda para
  a foto real da peça naquela cor (quando existe uma cadastrada).
- **Guia de tamanhos** — modal único (`<dialog>`), compartilhado por todo o
  site, aberto pelo link "Guia de tamanhos" no rodapé.
- **Pedido via WhatsApp** — os botões "Comprar" montam um link `wa.me` com
  cor, tamanho e produto já preenchidos na mensagem.
- **Entrada em câmera lenta** — o título "Gavie" do hero e o eco no "Sobre"
  usam uma animação de entrada suave, desligada com `prefers-reduced-motion`.
- **Zoom da foto** — hover (mouse) ou toque (celular) aproxima a foto do
  produto nos cards.

---

## Design tokens

Definidos em `src/css/input.css`, no bloco `@theme` — ficam disponíveis como
utilitários do Tailwind **e** como CSS custom properties.

| Token                | Valor     | Uso no Figma                          |
| --------------------- | --------- | ------------------------------------- |
| `--color-ink`         | `#141312` | Texto principal, bordas do badge      |
| `--color-ink-soft`    | `#453F34` | Parágrafo da seção “Do seu jeito”     |
| `--color-muted`       | `#84796A` | Label “TAMANHO”                       |
| `--color-paper`       | `#F7F4EE` | Fundo do site e dos cards             |
| `--color-cream`       | `#FDFAF4` | Texto sobre o hero                    |
| `--color-line`        | `#E1D9C8` | Bordas de card, header e tamanhos     |
| `--color-gold`        | `#AD893C` | Preço, CTAs, marquee, footer          |
| `--color-sand`        | `#DCC7A6` | Fundo do CTA “Fale com a gente” (40%) |

Tipografia: **Cormorant Garamond** (500/600) para a marca e o título do hero,
**Jost** (300/400/500/600) para todo o resto. As fontes são self-hosted em
`public/assets/fonts` — nenhuma requisição a servidores de terceiros.

---

## Responsividade

| Faixa          | Comportamento                                                            |
| --------------- | ------------------------------------------------------------------------ |
| `< 1024px`      | Menu hambúrguer, hero centralizado, foto do "Sobre" acima do texto       |
| `640 – 1023px`  | Grid de produtos 2 colunas, footer em 2 colunas                          |
| `≥ 1024px`      | Nav horizontal, hero alinhado à direita, "Sobre" em 2 colunas (575 + 443)|
| `≥ 1280px`      | Padding lateral de 100px, exatamente como no frame de 1440               |

O grid de produtos é sempre de 2 colunas; a partir de 1024px o grid tem um
teto de largura (720px, centralizado) pra evitar cards altos demais em
telas largas.

---

## Acessibilidade

- HTML semântico (`header`, `main`, `section`, `article`, `figure`, `address`, `footer`).
- Skip link, um único `h1`, hierarquia de headings consistente.
- Cores e tamanhos são `radiogroup` ARIA completos: setas navegam, só o item
  selecionado fica no tab order, `aria-checked` reflete o estado.
- Menu mobile com `aria-expanded`/`aria-controls`, fecha com `Esc` e ao clicar fora.
- Modal de tamanhos (`<dialog>`) fecha com `Esc`, clique fora ou botão de fechar.
- Estados `:hover`, `:active` e `:focus-visible` em todos os elementos interativos.
- `prefers-reduced-motion` desliga o marquee e as animações de entrada.

---

## Decisões de implementação

1. **Marquee animado** — o Figma mostra a faixa estática (limitação da ferramenta)
   e a omite no frame mobile. Foi implementada como marquee em loop contínuo,
   visível em todos os tamanhos; pausa no hover (só em dispositivos com mouse)
   e com `prefers-reduced-motion`.
2. **Header mobile** — o frame de 390 não tem logo nem botão de menu (a nav
   aparece cortada). Foi implementado logo à esquerda + hambúrguer à direita.
3. **Guia de tamanhos** — não existe no Figma; foi adicionado como modal
   único compartilhado, com tabela de medidas padrão do mercado brasileiro.

## Pendências

1. **Número de WhatsApp** — está com placeholder em `src/data/site.js`
   (`whatsapp: '5562000000000'`). Trocar pelo número real antes de publicar.
2. **Cor "Areia" da Regata Canelada** — ainda não existe foto dessa peça
   nessa cor; o swatch foi removido do card até haver uma foto real.
