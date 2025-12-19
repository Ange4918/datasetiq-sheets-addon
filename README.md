# DataSetIQ Sheets Add-on (`datasetiq-sheets-addon`)

Google Sheets add-on that exposes DataSetIQ data through custom functions and a sidebar UI.

## Features
- Custom functions: `DSIQ` (spill array with headers, newest-first), `DSIQ_LATEST`, `DSIQ_VALUE` (on-or-before), `DSIQ_YOY`, `DSIQ_META`.
- User key stored in `PropertiesService` (user-scoped). Shared files never leak keys.
- Sidebar states for connect/disconnect, profile/quota display, and search via `/api/public/search`.
- First-run authorize menu (`Extensions > DataSetIQ > Authorize`) to enable `UrlFetchApp`.
- Single retry with exponential backoff for 429/5xx, respects `Retry-After` when provided.
- Date normalization to UTC `YYYY-MM-DD` for cache/API parity.

## Scripts
- `npm run build` – bundle `src/Code.ts` to `Code.js` for `clasp push`.
- `npm run lint` – eslint over TS sources/tests.
- `npm run typecheck` – TS no-emit check.
- `npm run test` – vitest unit tests for helper functions.
- `npm run format` – prettier check.

## Structure
- `appsscript.json` – manifest + scopes.
- `src/Code.ts` – add-on logic (functions, sidebar handlers, storage).
- `sidebar.html` – UI for connect/search.
- `assets/` – place store icons/screenshots.

## CI (suggested)
- Add a GitHub Actions workflow to run `lint`, `typecheck`, `test`, and `build` on push/pull_request.

## Deployment
1. Install deps: `npm install`.
2. Build: `npm run build` (outputs `Code.js`).
3. Deploy with `clasp push` (and `clasp deployments` for prod channels).
4. Validate scopes/permissions in Apps Script dashboard before submission.

## Entitlement QA checklist
- Anonymous: 24-row cap, sidebar shows connect prompt.
- Invalid key: cells surface “Invalid API Key. Please reconnect.”
- Free limit: caps history to 5 years (server-enforced).
- Quota exceeded: cells show “Daily Quota Exceeded.”; sidebar prompts upgrade.
- Shared file: user B must connect; no key leaks.
