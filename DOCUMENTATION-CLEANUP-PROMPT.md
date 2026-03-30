# Documentation Cleanup & Organization Prompt

Copy this prompt into an AI coding assistant (Claude Code, Cursor, Windsurf, etc.) that has full read access to the repository you want to audit.

---

## Prompt

You are a documentation auditor. Your job is to audit every Markdown file in this repository, classify it, assess whether it's still accurate and relevant, and produce an actionable cleanup plan. **Do not delete or modify any files** — only produce the plan.

Start by orienting yourself: read the project's README, any CLAUDE.md / .cursorrules / AGENTS.md files, and the top-level directory structure so you understand what this project does and how it's organized.

---

### Phase 1 — Inventory

Scan the entire repo for `**/*.md` and `**/*.mdx` files. Exclude `node_modules/`, `.next/`, `dist/`, `build/`, and other build output directories. **Also exclude AI conversation history directories** (`.specstory/`, `.cursorstory/`, `.continue/`, aider chat logs, etc.) — these are tool-managed session logs, not project documentation. Do not inventory, categorize, or recommend actions for them.

For each file, record:

1. **Path**
2. **Title** (first `#` heading, or filename if no heading)
3. **Category** — assign exactly one from the list below. If a file doesn't fit neatly, pick the closest match and note the ambiguity.
   - `active-reference` — Docs developers actively consult: root README, architecture overviews, setup/install guides, schema docs, API references
   - `prd` — Product requirement documents, feature specs, design proposals
   - `adr` — Architecture decision records
   - `audit` — Post-mortem audits, failure analyses, remediation plans
   - `ai-prompt` — Prompts written to be fed to AI coding assistants (Claude, Cursor, Copilot, etc.), including .mdc rule files
   - `ai-context` — AI assistant configuration files (CLAUDE.md, .cursorrules, AGENTS.md, .claude/context/*)
   - `design` — Design specs, handoffs, critiques, UI/UX references
   - `research` — Competitor analysis, market research, technical research
   - `how-to` — Step-by-step guides for specific tasks
   - `changelog` — Changelogs, release notes, migration guides, update summaries
   - `generated-artifact` — Auto-generated output: benchmark reports, test results, coverage reports, playwright traces
   - `task` — Task lists, sprint plans, architecture proposals from planning phases
   - `readme-snapshot` — Timestamped or versioned copies of a README (e.g., `README-20260122.md`, `README-v2.md`)
   - `module-readme` — README files nested inside subdirectories (packages, templates, tools, etc.)
   - `onboarding` — New developer setup, contribution guides, coding standards
   - `ops` — Deployment, CI/CD, infrastructure, environment variable docs
   - `other` — Anything that doesn't fit the above
4. **Last modified** — use `git log -1 --format="%ai" -- <filepath>` (or timestamp-in-filename pattern if git history is unavailable)
5. **Size** — line count

Present Phase 1 results as a table grouped by directory, sorted by category within each group.

---

### Phase 2 — Freshness & Relevance Assessment

For each file (except `generated-artifact` categories, which can be bulk-assessed), determine its status using these checks:

#### 2.1 — Code Reference Check
For any doc that references specific file paths, function names, CLI commands, routes, or class names:
- **Verify** those references still exist in the codebase using grep/find
- Sample at least 5 references per doc (or all references if fewer than 5)
- Score:
  - **current** — >70% of sampled references still valid
  - **likely-stale** — 30–70% of sampled references valid
  - **archive-candidate** — <30% of sampled references valid

#### 2.2 — Superseded Check
Identify docs that have been replaced by newer versions:
- PRDs with version suffixes (e.g., `feature-PRD.md` vs `feature-PRD-v2.md`) — identify which is current
- Duplicate docs covering the same topic in different directories
- Docs whose content has been absorbed into a larger canonical doc (e.g., a standalone setup guide whose content now lives in the README)

**Note on README snapshots:** Timestamped README copies (e.g., `README-20260122.md`) serve as a historical record of how the project evolved. Do NOT recommend deleting or gitignoring these. They may be candidates for moving into an archive directory, but only if they're cluttering the working directory — their content has historical value.

#### 2.3 — Completion Check
For PRDs, task docs, and feature specs:
- Look for implementation status indicators in the repo (status tables, TODO comments, completed feature flags, merged PRs referenced in the doc)
- If the feature described is fully implemented and shipped, mark the PRD as `historical`
- If the feature is partially implemented or not started, mark as `active`
- If the feature was abandoned or the approach was scrapped, mark as `abandoned`

#### 2.4 — Orphan Check
Identify docs that reference things that no longer exist:
- References to deleted repositories, removed packages, or deprecated services
- Docs about tools, scripts, or workflows that have been removed from the codebase
- Docs describing architecture patterns the project no longer uses (e.g., Express docs in a Next.js project, REST docs when the project moved to GraphQL)

#### 2.5 — AI Artifact Triage
For AI-related files (excluding session log directories, which are out of scope):
- **AI context files** (CLAUDE.md, .cursorrules, etc.): Flag for review but never recommend archiving — these are actively used by tools.
- **AI prompts** (.mdc files, prompt templates): Check if they reference current code patterns. Stale prompts that reference old architecture are actively harmful.

---

### Phase 3 — Produce the Cleanup Plan

Output a single Markdown file called `DOCS-CLEANUP-PLAN.md` with these sections:

#### 3.1 — Archive (move to `docs/_archive/`)
Files that are outdated, superseded, or historical but might have reference value. For each:
- **Path**
- **Reason** (one-liner: e.g., "Superseded by v2", "Feature shipped — PRD is historical", "References deleted codebase")

Group these by sub-reason (superseded, historical PRDs, orphaned, etc.) for easier review.

#### 3.2 — Delete Candidates (safe to remove entirely)
Files with zero ongoing value. For each:
- **Path**
- **Why it's safe** (e.g., "Exact duplicate of X", "Auto-generated and reproducible", "Empty file")

Be conservative. If there's any doubt, put it in Archive instead. **Never recommend deleting README snapshots** — they have historical value even if superseded.

#### 3.3 — Needs Update (valuable but stale)
Files worth keeping but with outdated content. For each:
- **Path**
- **What's stale** — list the specific broken references, wrong patterns, or outdated information
- **Suggested fix** — brief description of what needs to change

#### 3.4 — Restructure Proposals
Suggest a cleaner directory layout if the current structure is disorganized. Common patterns to look for:
- Docs scattered across root, `docs/`, `tasks/`, `tools/`, and various subdirectories that should be consolidated
- Completed PRDs mixed with active ones (suggest `docs/_archive/` or `docs/historical/`)
- AI prompts scattered in multiple locations (suggest a single `prompts/` or `docs/prompts/` directory)
- Topic-related docs split across multiple directories that should be grouped (e.g., all theme docs in `docs/themes/`, all API docs in `docs/api/`)
- README snapshots cluttering a working directory (suggest `docs/readme-history/` or similar — move, don't delete)
- Missing index/overview docs that would help navigate large doc directories

For each proposal, explain the current state, proposed change, and rationale.

#### 3.5 — Keep As-Is
Files that are current, well-placed, and actively useful. List them so the scope of "done" is clear and the reviewer knows what's NOT changing.

#### 3.6 — Summary Statistics
- Total .md/.mdx files found (excluding session log directories)
- Breakdown by category (table)
- Breakdown by recommended action: archive / delete / update / restructure / keep (table)
- Top 3 highest-impact actions (what will make the biggest difference in clarity)

---

### Rules

1. **Read-only.** Never delete, move, or modify files. Only produce the plan document.
2. **Verify against code, don't guess.** If a doc references `src/utils/auth.ts`, grep for that file before deciding if the reference is current. Don't assume based on the doc's age alone.
3. **Be conservative with "delete."** Default to "archive" when uncertain. The only things that should be in the delete bucket are true duplicates, empty files, and reproducible generated artifacts.
4. **Respect AI config files.** Files like `.claude/CLAUDE.md`, `.cursorrules`, `AGENTS.md`, and `.claude/context/*` are tool configuration, not documentation. Flag for review but never recommend archiving or deleting.
5. **Leave session log directories alone.** Do not inventory, reorganize, or recommend changes for `.specstory/`, `.cursorstory/`, `.continue/`, or similar AI conversation history directories. These are managed by their respective tools.
6. **Preserve README history.** Timestamped README snapshots (e.g., `README-20260122.md`) document how the project evolved. Never recommend deleting or gitignoring them. If they clutter a directory, suggest relocating them — not removing them.
7. **Identify the canonical docs.** Every repo has a small set of "source of truth" documents (usually the root README, a main architecture doc, and/or an implementation plan). Identify these early and evaluate all other docs relative to them.
8. **Flag actively harmful docs.** A stale how-to guide or AI prompt that teaches wrong patterns is worse than no doc at all. Call these out explicitly in section 3.3 with a `⚠️ HIGH PRIORITY` tag.
9. **Note what's missing.** If you notice important topics that have NO documentation (e.g., no deployment guide, no contribution guide, no API reference), add a brief "Documentation Gaps" subsection at the end of 3.4.
