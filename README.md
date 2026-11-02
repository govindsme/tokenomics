# Tokenomics

**AI Cost Operations Field Guide**: practical guidance for AI FinOps, TokenOps, model economics, usage attribution, and cost control.

## Site

[Open the published Tokenomics site](https://govindsme.github.io/tokenomics/)

The site deploys via GitHub Pages automatically on push to `main`. To enable deployment for a fork, set **Settings > Pages > Build and deployment > Source** to **GitHub Actions**.

## Key Features

- **Unit Economics & Token Calculator**: Interactive calculator with preset pricing snapshots across OpenAI, Anthropic, Google Gemini, and AWS Bedrock. Accurately calculates prompt cache discounts (50%–90%) and 50% Batch API savings with live per-request and per-month breakdowns.
- **Verified Pricing Snapshots**: Snapshot table covering 9 leading model configurations (GPT-4o, GPT-4o mini, o1, Claude 3.5 Sonnet, Claude 3.5 Haiku, Gemini 1.5 Flash, Gemini 1.5 Pro, Bedrock Claude, and Azure OpenAI) with one-click calculator loading.
- **Metering & Telemetry**: OpenTelemetry GenAI semantic conventions (`gen_ai.*`), AI Gateway architecture, and Showback/Chargeback accounting methodologies.
- **Context & Cost Optimization**: Prompt caching economics, context window compaction, output token constraints, and structured outputs.
- **Routing & Infrastructure Economics**: Hosted APIs vs. Cloud Provisioned Throughput (PTU) vs. Self-hosted open weights (vLLM / GPU cluster TCO) break-even analysis.
- **Empirical Benchmarks**: Task-based comparative evaluations across coding, enterprise RAG, and intent routing with quality scores, median TTFT, TPS, and cost per 1k completed tasks.
- **Comprehensive Glossary**: 18 searchable practitioner definitions with direct source citations.
- **Evidence Register**: Searchable registry of primary documentation and specifications with verification timestamps.

## Run locally

Open `index.html` directly in any modern browser, or serve locally over HTTP:

```sh
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000`.

## Validate and build

Requires Node.js 20.11 or newer. Zero external npm dependencies required.

```sh
npm run validate
npm run build
```

- `npm run validate`: Tests referential integrity across all data files (`data/*.json`), verifies snapshot structures, and confirms required interactive DOM elements.
- `npm run build`: Bundles the deployable static site, copies machine-readable data, and generates `dist/research-summary.json`.

## Machine-Readable Ledger

All research claims, provider rates, and methodology are maintained as structured JSON in `data/`:
- `sources.json`: 10 verified primary standards and provider documentation sources.
- `claims.json`: 10 evidence-backed FinOps and TokenOps architectural guidance claims.
- `pricing-snapshots.json`: Verified rates per million tokens, prompt caching discounts, and effective dates.
- `benchmarks.json`: Workload profiles, evaluation rubrics, quality scores, TTFT/TPS latency, and task costs.
- `glossary.json`: 18 operational terms and formal definitions.
- `providers.json`: 7 model providers and inference platforms.
- `topics.json`: 10 core topic areas with anchor mapping and source citations.
- `update-history.json` & `research-state.json`: Autonomous audit ledger tracking runs, research cut-off dates, and SemVer increments.
