import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const output = resolve(root, 'dist');
const dataOutput = resolve(output, 'data');
mkdirSync(dataOutput, { recursive: true });
copyFileSync(resolve(root, 'index.html'), resolve(output, 'index.html'));

for (const name of [
  'sources.json', 'claims.json', 'topics.json', 'providers.json',
  'pricing-snapshots.json', 'glossary.json', 'update-history.json',
  'research-state.json', 'benchmarks.json'
]) {
  copyFileSync(resolve(root, 'data', name), resolve(dataOutput, name));
}

const sources = JSON.parse(readFileSync(resolve(dataOutput, 'sources.json'), 'utf8'));
const claims = JSON.parse(readFileSync(resolve(dataOutput, 'claims.json'), 'utf8'));
const state = JSON.parse(readFileSync(resolve(dataOutput, 'research-state.json'), 'utf8'));
const pricing = JSON.parse(readFileSync(resolve(dataOutput, 'pricing-snapshots.json'), 'utf8'));
const glossary = JSON.parse(readFileSync(resolve(dataOutput, 'glossary.json'), 'utf8'));
const benchmarks = JSON.parse(readFileSync(resolve(dataOutput, 'benchmarks.json'), 'utf8'));

writeFileSync(resolve(output, 'research-summary.json'), `${JSON.stringify({
  version: "1.1.0",
  researchCutoff: state.researchCutoff,
  sourceCount: sources.sources.length,
  claimCount: claims.claims.length,
  pricingStatus: pricing.status,
  snapshotCount: pricing.snapshots?.length || 0,
  glossaryCount: glossary.terms?.length || 0,
  benchmarkCount: benchmarks.benchmarks?.length || 0,
  builtAt: new Date().toISOString()
}, null, 2)}\n`);

writeFileSync(resolve(output, '.nojekyll'), '');
console.log(`Built static site in ${output}`);
