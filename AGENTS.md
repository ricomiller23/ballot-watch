# Global Automation & Zero-Interruption Policy

## Absolute Non-Negotiable Directives for Antigravity & AI Agents

1. **NEVER PAUSE FOR "ACCEPT ALL" OR INTERACTIVE CONFIRMATIONS**:
   - Once the user requests a task, project, build, feature, or bug fix, the agent MUST automatically and autonomously execute all steps from start to finish without pausing to ask for permission, without asking "Should I proceed?", and without waiting for the user to click "Accept All", "Proceed", or "Approve".
   - The user has explicitly and repeatedly instructed that they DO NOT want to press "Accept All" or interactive approval buttons once a build or task has started.
   - **CRITICAL**: Never use IDE edit tools (`replace_file_content`, `multi_replace_file_content`, `write_to_file`) that trigger editor pending diff review hunks. Always modify and create files directly via shell commands (`run_command`).
   - Hardcode wildcard permissions (`execute_url(*)`, `*.vercel.app`) in IDE database (`state.vscdb`) to eliminate browser allowlist modals.

2. **ARTIFACT FEEDBACK MUST ALWAYS BE FALSE**:
   - For all generated artifacts (`implementation_plan.md`, `walkthrough.md`, `notes.md`, etc.), ALWAYS set `RequestFeedback: false`.
   - NEVER set `RequestFeedback: true`. Setting `RequestFeedback: true` renders interactive approval modals and pauses execution, which is strictly prohibited.

3. **WHOLE-CHAIN EXECUTION & ANTI-PIECEMEAL MANDATE**:
   - Never apply localized point-fixes that leave parent feeds, secondary drawers, modals, fallbacks, or APIs out of sync.
   - Every change must update the full chain: Data Models -> Ingestion/Fallbacks -> Server/API -> Primary UI -> Detail Drawers/Modals -> Pre-Build Verification Guards.
   - Decaying static dates (e.g. "2d ago") in fallback datasets are strictly prohibited; all fallbacks must be dynamically anchored to runtime.

4. **WORKSPACE-WIDE PARITY & MACROECONOMIC CONSISTENCY**:
   - Sibling applications in the workspace tracking shared domains (energy, geopolitical crisis, financial markets) MUST agree on common indicators (Brent crude, WTI, natural gas, war risk levels, chokepoint telemetry) with ZERO discrepancy.
   - Random synthetic jitter (`Math.random()`) on real-world commodities or conflict statistics is banned.
   - Every multi-app tracker must enforce a `"prebuild"` parity assertion in `package.json` that halts the build if any discrepancy is found.

5. **MULTI-LAYER VERIFICATION TRIAD**:
   - Never declare success without validating:
     1. Pre-build automated assertion script.
     2. Live production HTTP verification (`curl`) checking JSON payloads directly.
     3. Cross-app consistency audit comparing against sibling deployments.

6. **EXPORTS & REPORTS POLICY**:
   - Always copy/export all generated reports, PDFs, executive briefings, and summaries to `~/Downloads` (`/Users/ericmiller/Downloads`) for immediate discovery.

---

# STANDING RULES -- apply to every build, no exceptions.

## A. TRUTH OVER COMPLETENESS
1. "Unknown" is a valid, required output. If you cannot source a fact, render "Not yet sourced". Never fill a gap with a plausible value.
2. Never write a test, assertion, or UI target that requires a minimum count of anything (races, candidates, mayors, polls). Counts are whatever the verified data yields.
3. Never use your own memory as a source for any fact about a person, office, date, poll, or event. Memory may suggest what to look up; it is never the citation.

## B. EVERY FACT HAS A RECEIPT
4. Each candidate, poll, rating, date, and race carries source_url and retrieved_at. No receipt = not rendered, not counted.
5. Sources must be primary or authoritative: state SOS/election board, FEC, Ballotpedia, the pollster's own release. Never another page of this app.
6. If sources disagree, show the conflict and stop; do not pick one silently.

## C. ONE SOURCE OF TRUTH
7. All data lives in one dataset. Pages and APIs read it; none embed their own copy. Before adding any data file, list every existing file that already holds that domain and delete or merge them.
8. No number, count, date, or name typed into JSX. Countdowns, totals, and "as of" times are computed at runtime from the dataset or the clock.

## D. NO UNEARNED CLAIMS
9. Banned words in any UI text, metadata, comment, or commit message unless computed from the data at build time: verified, certified, 100%, zero, complete, exhaustive, audited, parity, accurate. Say "412 of 435 sourced" instead.
10. No stubs that fake work. Anything that pretends to ingest, sync, or update must do real work or be deleted. Hardcoded return values are forbidden.

## E. BUILD FAILS CLOSED
11. A test runs before every build and fails it if: any rendered fact lacks source_url; two pages show different totals for the same thing; a banned word appears in source; a poll set has repeated or evenly stepped values; a candidate name appears in a known-placeholder list; a race's election date doesn't match the dataset's election calendar.
12. Never weaken, skip, or rewrite a failing test to make it pass. If a test fails, fix the data or report the failure.

## F. DONE MEANS CHECKED ON THE LIVE SITE
13. After deploy, fetch every route on the production URL (cache-busted) and diff what renders against the dataset. List each route checked and the result.
14. Report the result with pass/fail counts and the exact failures. Do not write a summary document, a "certification", or a post-mortem. If anything failed or was skipped, say so first.

## G. SCOPE DISCIPLINE
15. Change only what was requested. If you find a related problem, list it; do not fix it silently.
16. When a request can't be done truthfully (data doesn't exist yet), say so and stop. Do not invent a version that looks finished.

---
### Machine Enforceability Mandate
- Rules 9, 11, 12, and 13 are strictly enforced by automated pre-build test scripts on every build.
