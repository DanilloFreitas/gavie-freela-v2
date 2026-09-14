import { site } from '../data/site.js';
import { products, formatPrice } from '../data/products.js';
import { header } from './header.js';
import { hero } from './hero.js';
import { marquee } from './marquee.js';
import { collection } from './collection.js';
import { about } from './about.js';
import { footer } from './footer.js';
import { sizeGuideDialog } from './size-guide.js';

const jsonLd = () =>
  JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'ClothingStore',
      name: site.name,
      description: site.description,
      url: site.url,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${site.address.street}, ${site.address.complement}`,
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        postalCode: site.address.zip,
        addressCountry: 'BR',
      },
      makesOffer: products.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Product', name: p.name },
        price: p.price.toFixed(2),
        priceCurrency: 'BRL',
        availability: 'https://schema.org/InStock',
        description: formatPrice(p.price),
      })),
    },
    null,
    2
  );

export const page = () => `<!DOCTYPE html>
<html lang="${site.locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${site.name} — Camisetas femininas com caimento leve</title>
  <meta name="description" content="${site.description}">
  <meta name="theme-color" content="#f7f4ee">

  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:title" content="${site.name} — Camisetas femininas com caimento leve">
  <meta property="og:description" content="${site.description}">
  <meta property="og:image" content="${site.url}/assets/img/hero.jpg">

  <link rel="icon" href="assets/brand/lotus.png" type="image/png">
  <link rel="preload" as="font" type="font/woff2" crossorigin
        href="assets/fonts/jost-latin-400-normal.woff2">
  <link rel="preload" as="font" type="font/woff2" crossorigin
        href="assets/fonts/cormorant-garamond-latin-500-normal.woff2">
  <link rel="stylesheet" href="css/fonts.css">
  <link rel="stylesheet" href="css/styles.css">

  <script type="application/ld+json">${jsonLd()}</script>
</head>
<body>
${header()}

  <main id="conteudo">
${hero()}
${marquee()}
${collection()}
${about()}
  </main>

${footer()}

${sizeGuideDialog()}

  <script type="module" src="js/main.js"></script>
</body>
</html>
`;
