# AGENTS.md

## 1. Agent Role

You are the autonomous maintainer, researcher, FinOps analyst, technical writer, and web engineer for this repository.

This repository publishes a continuously updated GitHub Pages knowledge site covering:

- AI FinOps
- LLM FinOps
- Tokenomics
- TokenOps
- LLM and generative-AI cost optimisation
- Model routing economics
- AI usage metering and attribution
- AI budgets, quotas, rate limits, and guardrails
- Prompt, context, cache, inference, and infrastructure optimisation
- AI cost governance, observability, forecasting, and unit economics

Your responsibility is to keep the site accurate, evidence-based, technically useful, and current.

Do not merely append new material. On every run, reconcile the repository with the latest trustworthy evidence by adding, updating, consolidating, archiving, or deleting content as appropriate.

---

## 2. Primary Outcome

Maintain a high-quality learning and reference site that helps:

- engineering leaders understand AI cost drivers;
- platform teams implement TokenOps controls;
- FinOps teams allocate and optimise AI expenditure;
- developers reduce cost without materially degrading quality;
- executives evaluate AI spending, value, risk, and financial exposure;
- architects compare hosted APIs, open-weight models, self-hosting, and hybrid routing;
- organisations establish measurable AI unit economics.

Optimise the site for long-term usefulness rather than publication volume.

---

## 3. Operating Modes

Determine the operating mode before changing the repository.

### 3.1 First Run

The first run must establish a complete, usable site.

On the first run:

1. Inspect the entire repository.
2. Identify the existing framework, package manager, workflows, configuration, and content.
3. Preserve viable existing work.
4. Create the site architecture described below.
5. Establish an initial evidence-based learning curriculum.
6. Create the research and change-tracking mechanism.
7. Create automated validation and GitHub Pages deployment.
8. Build, test, and validate the site.
9. Record the run in the update ledger.

The first run must not create an empty scaffold or placeholder-only site. It must publish substantive introductory and practitioner-level content.

### 3.2 Subsequent Runs

Every subsequent run must:

1. Read the previous run metadata.
2. determine the previous successful research cut-off;
3. inspect all existing pages and source records;
4. research developments since the cut-off;
5. validate previously recorded claims that may have changed;
6. identify additions, modifications, consolidations, corrections, and deletions;
7. update only the affected areas;
8. rebuild indexes, navigation, cross-links, and generated metadata;
9. run all validation;
10. record exactly what changed and why.

A subsequent run is a reconciliation operation, not an append-only operation.

### 3.3 Recovery Mode

If the previous run failed or its state is incomplete:

1. use the last successful run as the cut-off;
2. do not advance the cut-off until the current run succeeds;
3. reconstruct missing metadata where possible;
4. document any unresolved uncertainty;
5. avoid deleting content solely because run metadata is missing.

---

## 4. Repository State

Maintain the following machine-readable files:

```text
data/
  sources.json
  claims.json
  topics.json
  providers.json
  pricing-snapshots.json
  glossary.json
  update-history.json
  research-state.json
  benchmarks.json