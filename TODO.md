# TODO

- [x] Disable backend scripts (temporary) so Email can redirect to Success.
- [x] Fix Email → Success navigation by redirecting only after backend success.
- [x] Restore backend scripts so Node/Express + MySQL can receive/save credentials again.
- [x] Update Email submit to POST to backend and redirect to success.html ONLY on success.
  - [x] `public/js/email.js` now POSTs to `http://127.0.0.1:3000/api/submit` and redirects to `success.html` only on HTTP 201.

- [x] Start backend and ensure end-to-end navigation works from XAMPP (requires MySQL env + server running):

  - `index.html` → `credit.html` → `email.html` → `success.html`
  - Verify the API response is 201.
  
- [x] Created `test-flow.js` — automated test script that verifies the entire flow
  - Tests API reachability, full payload submission (201), missing fields rejection (400), method validation (404)
  - All 6 tests PASSED ✅

## Deployment Changes ✅

- [x] Fixed `package.json` — changed `main` from `index.js` to `server/app.js` (fixes Render's `Cannot find module index.js`)
- [x] Fixed `server/app.js` — corrected `express.static` path from `'public'` to `'..', 'public'` (was pointing to wrong directory)
- [x] Updated `server/app.js` CORS — added production domains (Render + Vercel)
- [x] Updated `public/js/email.js` — made API URL dynamic (local vs production)
- [x] Updated `server/config/db.js` — added SSL support for cloud MySQL providers (PlanetScale, Aiven)
- [x] Updated `server/README.env.md` — corrected docs from MongoDB to MySQL env vars with local + cloud examples
- [x] Created `.gitignore` — excludes `node_modules/`, `.env`, logs
- [x] Created `DEPLOYMENT.md` — step-by-step guide for GitHub + Render + Vercel deployment

