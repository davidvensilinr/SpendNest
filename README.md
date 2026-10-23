# SpendNest Revenue Intelligence Inbox
**Volopay Hiring Assignment — Production Deliverable**

An enterprise conversation intelligence and evidence-grounded routing application built with Next.js, SQLite (via Drizzle ORM / better-sqlite3), Tailwind CSS, and TypeScript.

---

## Quick Startup (Local Development)

### 1. Prerequisites
- Node.js 18+ (tested on Node v20/v22)
- npm or pnpm

### 2. Setup & Installation
```bash
# Navigate to the application directory
cd revenue-intelligence-inbox

# Dependencies are already installed; to reinstall if needed:
npm install

# Run database replay and verify all 10 acceptance tests
python ../scripts/run_automated_tests.py

# Launch the production application
npm run build
npm run start
# Or for live hot-reloading development:
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Reproducing the Replay & Acceptance Test Sequence

The application enforces all import rules from `DATA_CONTRACT.md`. You can verify this interactively via the UI at `/imports` or via the automated CLI test runner:

```bash
python scripts/run_automated_tests.py
```

### Verified Test Scenarios (10/10 Passed)
1. **Initial Import (Test 1):** Imports `01_initial.json`. Produces exactly 44 unique records and 17 usable transcripts.
2. **Duplicate Import (Test 2):** Re-importing batch 1 creates 0 duplicates; record count stays at 44.
3. **Order Independence (Test 3):** Replaying batch 1 in scrambled order preserves identical record state.
4. **Manual Route Correction (Test 4):** Applying a manager override to M07 persists in SQLite.
5. **Late Transcript Update (Test 5):** Importing `02_update.json` updates M07 to revision 2, supplying its 27-turn transcript (total transcripts = 18). Unique record count remains 44.
6. **Preserve Manual Judgment (Test 6):** M07's manual route override survives the update batch and restarts.
7. **Transcript Coverage Denominator (Test 7):** Coverage is strictly calculated as `18 / 44 = 40.9%`.
8. **Evidence Integrity (Test 8):** Verbatim turn citations and quotes validated for all 18 conversations.
9. **Export Consistency (Test 9):** Generated ZIP contains valid `manifest.json`, `manifest.csv`, and all output files.
10. **Production Readiness (Test 10):** Next.js build succeeds with 0 errors across all static and dynamic routes.

---

## Deliverables Summary

| Deliverable | Location | Description |
|---|---|---|
| **Live App** | `revenue-intelligence-inbox/` | Complete working Next.js full-stack application |
| **Export ZIP** | `candidate/revenue-intelligence-export.zip` | Downloadable archive with categorized folders |
| **Manifests** | `candidate/manifest.json` & `.csv` | Machine-readable manifests with 44 records |
| **5-Slide Deck** | `candidate/presentation.pptx` | Editable PowerPoint presentation |
| **Findings** | `candidate/FINDINGS_AND_DECISIONS.md` | 3 Evidence findings & 1 rejected decision |
| **Demo Script** | `candidate/DEMO_SCRIPT.md` | 3-minute continuous narration script |
| **Manager Brief** | `candidate/manager-brief.md` | Executive synthesis for 21 August 2026 |

---

## Disclosure of AI Usage & Pre-Generated Analysis
- **AI Usage:** AI was utilized during development to assist with layout structuring and evidence extraction from supplied transcripts.
- **Runtime Execution:** The running web application requires **zero external AI API keys** at runtime. All queries, filtering, routing overrides, and export generation are 100% deterministic and execute against the local SQLite database.
- **Intentionally Omitted Content:** 26 source records lack conversation transcripts. In accordance with data integrity principles, we intentionally withheld speculative summaries for those records.

## Estimated Hours Spent
- **Total Time:** ~7.5 hours (Data analysis: 1.5h, Full-stack architecture: 3.5h, Data contract validation & testing: 1.5h, Presentation & documentation: 1.0h).
