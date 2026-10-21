# Repository rulesets

`protect-main.json` is the ruleset for the default branch. GitHub does not apply files from this
directory automatically — import it once:

**Settings → Rules → Rulesets → New ruleset → Import a ruleset** → choose `protect-main.json`.

What it enforces on `main`:

- changes land only through pull requests (no direct pushes);
- the PR must pass `Lint and Format Check` and `Build (Node 22.18 / 24 / 26)` before it can merge —
  this is what stops a red Renovate PR (like #492) from being merged;
- no force-push, no branch deletion.

No bypass actors: the release workflow does not push to `main` (semantic-release publishes to npm and
creates the git tag and GitHub Release only), so nothing needs to skip these rules — not even admins.

Keep the check names in sync with the job names in `.github/workflows/code-quality.yml`.
