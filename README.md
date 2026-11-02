# Tokenomics

**AI Cost Operations Field Guide**: practical guidance for AI FinOps, TokenOps, model economics, usage attribution, and cost control.

## Site

[Open the published Tokenomics site](https://govindsme.github.io/tokenomics/)

The URL currently serves the last deployed version. This workspace's new field guide will appear after its changes are pushed and the Pages workflow completes. To enable deployment for a fork, set **Settings > Pages > Build and deployment > Source** to **GitHub Actions**.

## Run locally

Open `index.html` in a browser, or serve the repository root to test it over HTTP:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Validate and build

Requires Node.js 20.11 or newer. No dependency installation is needed.

```sh
npm run validate
npm run build
```

The build writes the deployable site and research summary to `dist/`. GitHub Actions runs both commands for pull requests and deploys successful pushes to `main` through GitHub Pages.

## Research approach

Provider prices vary by model, product, region, modality, and contract. The estimator therefore asks for current input and output rates rather than embedding numbers that may be stale. Always reconcile estimates with provider billing records. The evidence register links to primary documentation.

Structured records in `data/` track sources, claims, topics, providers, pricing-snapshot status, glossary terms, benchmark methodology, update history, and the last successful research cut-off. On each update, recheck time-sensitive claims and pricing sources, update affected records, and advance `research-state.json` only after validation and build succeed. Numeric benchmark comparisons should include workload, quality, latency, price date, and omitted costs.
