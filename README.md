# Tokenomics

**AI FinOps, TokenOps, and Model Economics Body of Knowledge (BoK)**: authoritative, evidence-led operational frameworks for generative AI cost attribution, prompt caching economics, model routing, and unit economics.

## Published Knowledge Site

[Open the published Tokenomics site](https://govindsme.github.io/tokenomics/)

The site deploys via GitHub Pages automatically on push to `main`, and runs automated weekly reconciliation audits via GitHub Actions.

## Key Capabilities & Body of Knowledge (v1.2.0)

- **AI FinOps Maturity Model**: Structured roadmap across three stages (**Crawl** for baseline visibility, **Walk** for gateway control & attribution, **Run** for dynamic routing & unit economic optimization).
- **Unit Economics & Token Calculator**: Interactive calculator with preset pricing snapshots across OpenAI, Anthropic, Google Gemini, and AWS Bedrock. Accurately calculates prompt cache discounts (50%–90%) and 50% Batch API savings with live per-request and per-month breakdowns.
- **Hosted API vs. Self-Hosted GPU Cluster TCO Simulator**: Decision engine modeling total cost of ownership across hosted pay-as-you-go APIs and dedicated 8x H100 GPU clusters, factoring in idle off-peak hardware waste, utilization curves, and MLOps engineering overhead.
- **Production Code Blueprints**:
  - Python & TypeScript OpenTelemetry GenAI instrumentation recipes (`gen_ai.system`, `gen_ai.request.model`, `gen_ai.usage.*`, and tenant attribution headers).
  - Production LiteLLM AI Gateway YAML with latency routing, Redis prompt caching, and RPM/TPM rate limits.
  - FinOps Foundation FOCUS™ 1.0 SQL transformation queries for unified multi-cloud billing.
- **Verified Pricing Snapshots**: Snapshot table covering 9 leading model configurations (GPT-4o, GPT-4o mini, o1, Claude 3.5 Sonnet, Claude 3.5 Haiku, Gemini 1.5 Flash, Gemini 1.5 Pro, Bedrock Claude, and Azure OpenAI) with one-click calculator loading.
- **Empirical Benchmarks**: Task-based comparative evaluations across coding, enterprise RAG, and intent routing with quality scores, median TTFT, TPS, and cost per 1k completed tasks.
- **Comprehensive Glossary**: 21 searchable practitioner definitions with direct source citations.
- **Evidence Register**: 12 verified primary standards and documentation sources.

## Run locally

Open `index.html` directly in any modern browser, or serve locally over HTTP:

```sh
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000`.

## Automated Validation & Build

Requires Node.js 20.11 or newer. Zero external npm dependencies required.

```sh
npm run validate
npm run build
```

- `npm run validate`: Tests referential integrity across all data files (`data/*.json`), verifies snapshot structures, and confirms required interactive DOM elements.
- `npm run build`: Bundles the deployable static site, copies machine-readable data, and generates `dist/research-summary.json`.

## Machine-Readable Ledger (`data/`)

All research claims, provider rates, and methodology are maintained as structured JSON in `data/`:
- `sources.json`: 12 verified primary standards and provider documentation sources.
- `claims.json`: 12 evidence-backed FinOps and TokenOps architectural guidance claims.
- `pricing-snapshots.json`: Verified rates per million tokens, prompt caching discounts, and effective dates.
- `benchmarks.json`: Workload profiles, evaluation rubrics, quality scores, TTFT/TPS latency, and task costs.
- `glossary.json`: 21 operational terms and formal definitions.
- `providers.json`: 7 model providers and inference platforms.
- `topics.json`: 13 core topic areas with anchor mapping and source citations.
- `update-history.json` & `research-state.json`: Autonomous audit ledger tracking runs, research cut-off dates, and SemVer increments.
