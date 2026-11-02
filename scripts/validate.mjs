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
const providerIds = new Set(data.providers.providers.map((p) => p.id));

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
if (data.pricing.snapshots.length > 0) {
  uniqueIds(data.pricing.snapshots, 'Pricing Snapshot');
}
if (data.benchmarks.benchmarks.length > 0) {
  uniqueIds(data.benchmarks.benchmarks, 'Benchmark Workload');
}

for (const source of data.sources.sources) {
  assert.match(source.url, /^https:\/\//, `Source must use HTTPS: ${source.id}`);
  assert.match(source.checkedAt, /^\d{4}-\d{2}-\d{2}$/, `Source needs checkedAt date: ${source.id}`);
  assert.ok(page.includes(`data-source-id="${source.id}"`), `Source is missing from the evidence register: ${source.id}`);
}

for (const claim of data.claims.claims) {
  knownSources(claim.sourceIds, `Claim ${claim.id}`);
  assert.match(claim.checkedAt, /^\d{4}-\d{2}-\d{2}$/, `Claim needs checkedAt date: ${claim.id}`);
}

for (const topic of data.topics.topics) {
  knownSources(topic.sourceIds, `Topic ${topic.id}`);
  assert.ok(page.includes(`id="${topic.anchor}"`), `Topic anchor is missing from index.html: ${topic.anchor}`);
}

for (const provider of data.providers.providers) {
  knownSources([provider.pricingSourceId], `Provider ${provider.id}`);
}

for (const term of data.glossary.terms) {
  assert.ok(term.term && term.definition, 'Glossary term and definition are required');
  knownSources(term.sourceIds, `Glossary term ${term.term}`);
}

knownSources(data.pricing.sources, 'Pricing snapshot');
assert.ok(['verified-snapshots', 'links-only'].includes(data.pricing.status), 'Pricing status must be valid');

for (const snapshot of data.pricing.snapshots) {
  assert.ok(providerIds.has(snapshot.providerId), `Snapshot ${snapshot.id} references unknown provider ${snapshot.providerId}`);
  assert.ok(sourceIds.has(snapshot.sourceId), `Snapshot ${snapshot.id} references unknown source ${snapshot.sourceId}`);
  assert.ok(typeof snapshot.inputPerMillion === 'number' && snapshot.inputPerMillion >= 0, `Invalid input rate: ${snapshot.id}`);
  assert.ok(typeof snapshot.outputPerMillion === 'number' && snapshot.outputPerMillion >= 0, `Invalid output rate: ${snapshot.id}`);
  assert.ok(typeof snapshot.cachedInputPerMillion === 'number' && snapshot.cachedInputPerMillion >= 0, `Invalid cached input rate: ${snapshot.id}`);
  assert.match(snapshot.effectiveDate, /^\d{4}-\d{2}-\d{2}$/, `Invalid effective date: ${snapshot.id}`);
}

assert.ok(data.benchmarks.publicationRequirements.length >= 4, 'Benchmark publication criteria are required');
for (const benchmark of data.benchmarks.benchmarks) {
  assert.ok(sourceIds.has(benchmark.sourceId), `Benchmark ${benchmark.id} references unknown source ${benchmark.sourceId}`);
  assert.ok(benchmark.evaluations.length > 0, `Benchmark ${benchmark.id} requires evaluation entries`);
  for (const evalItem of benchmark.evaluations) {
    assert.ok(providerIds.has(evalItem.providerId), `Evaluation in ${benchmark.id} references unknown provider ${evalItem.providerId}`);
    assert.ok(typeof evalItem.costPer1kTasks === 'number' && evalItem.costPer1kTasks >= 0, `Invalid costPer1kTasks in ${benchmark.id}`);
  }
}

assert.equal(data.state.status, 'complete');
assert.equal(data.history.runs.at(-1)?.status, 'complete');
assert.equal(data.state.researchCutoff, data.history.runs.at(-1)?.researchCutoff);

// Verify required interactive DOM elements
assert.ok(page.includes('id="cost-form"'), 'The cost estimator form is required');
assert.ok(page.includes('id="tco-form"'), 'The TCO simulator form is required');
assert.ok(page.includes('id="source-search"'), 'The evidence filter is required');
assert.ok(page.includes('id="model-preset"'), 'The model preset selector is required');
assert.ok(page.includes('id="glossary-search"'), 'The glossary search filter is required');

console.log(`Validated ${data.sources.sources.length} sources, ${data.claims.claims.length} claims, ${data.topics.topics.length} topics, ${data.providers.providers.length} providers, ${data.pricing.snapshots.length} pricing snapshots, ${data.glossary.terms.length} glossary terms, ${data.benchmarks.benchmarks.length} benchmarks, and all research records.`);
