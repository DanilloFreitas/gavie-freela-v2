#!/usr/bin/env node
/**
 * Compõe public/index.html a partir dos módulos em src/templates.
 * Rode com `npm run build:html` (ou `npm run build`).
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { page } from '../src/templates/page.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'public/index.html');

const banner = `<!--
  ARQUIVO GERADO AUTOMATICAMENTE — não edite à mão.
  Origem: src/templates/*.js + src/data/*.js
  Regenerar: npm run build:html
-->
`;

await mkdir(dirname(out), { recursive: true });
await writeFile(out, page().replace('<!DOCTYPE html>', `<!DOCTYPE html>\n${banner}`), 'utf8');

console.log('✓ public/index.html gerado');
