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

### Machine Enforceability Priority
- **Rules 9, 11, 12, and 13 are machine-enforced.** Automated pre-build tests must fail compilation on any violation.
- **Two-Model Review**: Work should be validated by an independent agent or protocol comparing live production output against primary sources (e.g. Ballotpedia).
