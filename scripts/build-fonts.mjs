#!/usr/bin/env node
/**
 * Fontes self-hosted (sem chamada a servidores de terceiros).
 * Copia apenas os pesos usados no design e gera public/css/fonts.css.
 *
 * Pesos usados no Figma:
 *   Cormorant Garamond → 500 (hero) e 600 (marca)
 *   Jost              → 300 (título de seção), 400, 500 e 600
 */
import { cp, mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public/assets/fonts');

const FAMILIES = [
  {
    family: 'Jost',
    pkg: 'jost',
    slug: 'jost',
    weights: [300, 400, 500, 600],
    subsets: ['latin', 'latin-ext'],
  },
  {
    family: 'Cormorant Garamond',
    pkg: 'cormorant-garamond',
    slug: 'cormorant-garamond',
    weights: [500, 600],
    subsets: ['latin', 'latin-ext'],
  },
];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

let css = '/* GERADO AUTOMATICAMENTE por scripts/build-fonts.mjs */\n';

for (const f of FAMILIES) {
  for (const subset of f.subsets) {
    for (const weight of f.weights) {
      const file = `${f.slug}-${subset}-${weight}-normal.woff2`;
      const src = resolve(root, `node_modules/@fontsource/${f.pkg}/files/${file}`);
      await cp(src, resolve(outDir, file));

      css += `
@font-face {
  font-family: '${f.family}';
  font-style: normal;
  font-weight: ${weight};
  font-display: swap;
  src: url('../assets/fonts/${file}') format('woff2');
}
`;
    }
  }
}

await mkdir(resolve(root, 'public/css'), { recursive: true });
await writeFile(resolve(root, 'public/css/fonts.css'), css, 'utf8');

console.log('✓ fontes copiadas e public/css/fonts.css gerado');
