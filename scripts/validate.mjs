import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const readJson = (name) => JSON.parse(readFileSync(resolve(root, 'data', name), 'utf8'));
const data = {
  sources: readJson('sources.json'),
  claims: readJson('claims.json'),
  topics: readJson('topics.json'),
  providers: readJson('providers.json'),
  pricing: readJson('pricing-snapshots.json'),
  glossary: readJson('glossary.json'),
  history: readJson('update-history.json'),
  state: readJson('research-state.json'),
  benchmarks: readJson('benchmarks.json')
};
const page = readFileSync(resolve(root, 'index.html'), 'utf8');
const sourceIds = new Set(data.sources.sources.map((source) => source.id));

function uniqueIds(items, label) {
  const ids = items.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length, `${label} IDs must be unique`);
  assert.ok(ids.every(Boolean), `${label} IDs must be non-empty`);
}

function knownSources(ids, label) {
  for (const id of ids) assert.ok(sourceIds.has(id), `${label} references unknown source: ${id}`);
}

uniqueIds(data.sources.sources, 'Source');
uniqueIds(data.claims.claims, 'Claim');
uniqueIds(data.topics.topics, 'Topic');
uniqueIds(data.providers.providers, 'Provider');

for (const source of data.sources.sources) {
  assert.match(source.url, /^https:\/\//, `Source must use HTTPS: ${source.id}`);
  assert.match(source.checkedAt, /^\d{4}-\d{2}-\d{2}$/, `Source needs checkedAt date: ${source.id}`);
  assert.ok(page.includes(`data-source-id="${source.id}"`), `Source is missing from the evidence register: ${source.id}`);
}
for (const claim of data.claims.claims) knownSources(claim.sourceIds, `Claim ${claim.id}`);
for (const topic of data.topics.topics) {
  knownSources(topic.sourceIds, `Topic ${topic.id}`);
  assert.ok(page.includes(`id="${topic.anchor}"`), `Topic anchor is missing from index.html: ${topic.anchor}`);
}
for (const provider of data.providers.providers) knownSources([provider.pricingSourceId], `Provider ${provider.id}`);
for (const term of data.glossary.terms) knownSources(term.sourceIds, `Glossary term ${term.term}`);
knownSources(data.pricing.sources, 'Pricing snapshot');

assert.equal(data.pricing.status, 'links-only', 'Unverified numeric rates must not be presented as snapshots');
assert.equal(data.pricing.snapshots.length, 0, 'No numeric snapshot is expected for the first run');
assert.equal(data.state.status, 'complete');
assert.equal(data.history.runs.at(-1)?.status, 'complete');
assert.equal(data.state.researchCutoff, data.history.runs.at(-1)?.researchCutoff);
assert.ok(data.benchmarks.publicationRequirements.length >= 4, 'Benchmark publication criteria are required');
assert.ok(page.includes('id="cost-form"'), 'The cost estimator form is required');
assert.ok(page.includes('id="source-search"'), 'The evidence filter is required');

console.log(`Validated ${data.sources.sources.length} sources, ${data.claims.claims.length} claims, ${data.topics.topics.length} topics, ${data.providers.providers.length} providers, and all research records.`);