#!/usr/bin/env node
/**
 * Copia src/js → public/js e gera public/js/config.js a partir de src/data/site.js,
 * mantendo o número de WhatsApp com uma única fonte de verdade.
 */
import { cp, mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from '../src/data/site.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const from = resolve(root, 'src/js');
const to = resolve(root, 'public/js');

await rm(to, { recursive: true, force: true });
await mkdir(to, { recursive: true });
await cp(from, to, { recursive: true });

await writeFile(
  resolve(to, 'config.js'),
  `// GERADO AUTOMATICAMENTE a partir de src/data/site.js — não edite à mão.
export const WHATSAPP_NUMBER = '${site.whatsapp}';
`,
  'utf8'
);

console.log('✓ public/js atualizado');
