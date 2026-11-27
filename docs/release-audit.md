# KITA 2.0 release audit – 2026-11-26

Branch: kita-ui-refresh (PR #5). Audit of source and active Bioglow Supabase schema. Public frontend has not been merged or deployed.

## Changes
- Shared Supabase browser client; owner-checked legacy history/favorite reads; clear previous account's in-progress analysis, location and old UI panels on owner change.
- Optional explicit photo upload consent; 15 MB cap; reset consent per photo; explain third-party map/environment services and GPS limitations. Feedback and expert request inserts omit coordinates. Explicit confirmation before saving a location-based analysis; remove obsolete automatic browser analysis snapshot. Location rounding is only a display feature, not anonymity.
- Service worker caches versioned static assets only, no arbitrary non-navigation GETs; no-store respected.
- Prevent stale alternate image results after analysis changes; actual completion timestamp; III protection warning included; avoid 'ordinary species' claim.
- Disable project-wide stats in development UI pending real administrator access; do not expose it through new client.
- Freeze inventory and filter controls during cloud operation; maintain explicit save, revision conflict behaviour; do not lose typed entries on failed changes.
- Catalogue pagination (36 records per increment), keyboard dialog focus management, mobile controls and focus visibility. Pin exifr 7.1.3, Supabase JS 2.119.2, jsPDF 4.2.1 (security release). Browser verification of CDN loading and PDF output pending.

## Evidence and verification
- Source audit: all eight public database tables have RLS enabled. Owner predicates reviewed for garden, plan, saved analysis, feedback, favorite, expert request and findings; expert_reviews is intentionally public. Feedback and expert request coordinates are nullable. Existing garden/plan access rules were tested in the previous development step, not repeated in this audit.
- Data model recheck: 12 assertions passed using actual branch source (179 unique species, provenance, visitor and native evidence, empty/unknown handling, regional flowering, warning exclusion, 21 candidate records, optimiser 5 species/7 months, unique combinations, native filter).
- Final static source checks: 22 passed, 0 failed. No failures in this limited check.
- A larger regression run hit the connector tool-call limit. Existing regression tests are in tests/; run with Node.js before release. Static checks do not prove browser behaviour.

## Release blockers
- No real browser/end-to-end run: GitHub host DNS inaccessible from test container. Test on desktop and phone with actual branch preview, sign in/out, two users and two devices, local draft, create/open/save/delete, plan snapshot, conflict, plant search, location, consent off/on, external APIs, PDF, favorites/history, translation, keyboard, offline and CDN.
- Public stats RPC remains callable by anon/authenticated on production database. It is an aggregate SECURITY DEFINER function that includes auth.users count. Disable public execution after old frontend is retired, or explicitly approve a public aggregate design. Suggested review SQL (do not run blindly): REVOKE EXECUTE ON FUNCTION public.bioglow_public_stats() FROM PUBLIC, anon, authenticated; verify actual grants and intended admin flow first. Leaked password protection disabled; review Supabase Auth plan/settings. No live production permission changes made in this audit.
- Lab URL flag is not an administrator security boundary; real privileged features require server-side authorization. External Worker endpoints and retention/access configuration have not been independently audited. No full vulnerability or penetration test.
- Dataset is partial: 179 ecology records, 25 Tallinn flowering records, 52 visitor records, 5 separately verified native taxa. Full legal list, botanical names, source/licensing and expert validation remain necessary. No claim of measured biodiversity improvement.
- Publish only after preview checks and security/data review. Do not equate static assertions with release readiness.
