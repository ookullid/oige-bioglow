# KITA 2.0 – separate Cloudflare Pages test site

Use a **new Pages project**. Do not edit the existing production project, merge PR #5, or change its production branch.

Cloudflare Dashboard → Workers & Pages → Create application → Pages → Connect to Git. Select `ookullid/oige-bioglow`.

| Setting | Value |
|---|---|
| Project name | kita-test (if available) |
| Production branch of this NEW TEST PROJECT ONLY | kita-ui-refresh |
| Framework preset | None |
| Build command | node scripts/build-preview.cjs |
| Build output directory | kita-preview-dist |
| Root directory | repository root (leave blank) |

No new environment variables are needed for the static front end. The build copies only browser assets referenced in index.html, PWA assets and two test-site crawling headers/files. It does not publish docs, tests, SQL migrations or Wrangler configuration. The noindex header is not access control; use Cloudflare Access if restricting the preview to the team.

The assigned Pages hostname is confirmed by the dashboard only after a successful deployment. This test frontend uses the same Supabase project and external APIs as the current application, not an isolated database. Use test gardens and avoid sensitive coordinates/photos. If login confirmation links redirect to the old site, configure the additional exact test URL in Supabase Auth URL Configuration without replacing the production Site URL; do not broaden the allowlist unnecessarily.

Existing GitHub PR #5 Cloudflare messages refer to Workers Builds and report previous build failures. Their logs require Cloudflare access; they are not confirmation of a Pages deployment. No production config is changed by this preparation.
