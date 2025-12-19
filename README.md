# DataSetIQ Google Sheets Add-on

**Professional Google Sheets add-on for economic and financial data from 15+ global sources.**

## 📊 Features

### Custom Functions
- **`DSIQ(seriesId, [freq], [start])`** – Full time-series array with headers (newest-first)
- **`DSIQ_LATEST(seriesId)`** – Most recent value only
- **`DSIQ_VALUE(seriesId, date)`** – Value on or before specified date
- **`DSIQ_YOY(seriesId)`** – Year-over-year growth rate
- **`DSIQ_META(seriesId, field)`** – Metadata (title, units, frequency, etc.)

### Premium Features 🔓

**Formula Builder Wizard** (🔧 Builder tab)
- Step-by-step formula creation with guided inputs
- Supports all DSIQ function types
- Preview before inserting into cells

**Templates System** (📁 Templates tab)
- Scan current sheet for DSIQ formulas
- Save formula collections as reusable templates
- Load templates into new sheets instantly
- Manage saved templates (view, load, delete)

**Multi-Series Insert** (Search tab)
- Select multiple series with checkboxes
- Bulk insert with single click
- Saves time on repetitive data pulls

**Enhanced Sidebar UI** (🔍 Search tab)
- Search across 15 data providers
- Browse by source (FRED, BLS, IMF, OECD, etc.)
- Favorites and Recent tracking
- Live data preview with metadata
- On-demand ingestion for metadata-only datasets

### Data Sources (15 Providers)
- **FRED** – Federal Reserve Economic Data
- **BLS** – Bureau of Labor Statistics
- **BEA** – Bureau of Economic Analysis
- **Census** – US Census Bureau
- **EIA** – Energy Information Administration
- **IMF** – International Monetary Fund
- **OECD** – Organisation for Economic Co-operation
- **World Bank** – Global development data
- **ECB** – European Central Bank
- **Eurostat** – European statistics
- **BOE** – Bank of England
- **ONS** – UK Office for National Statistics
- **StatCan** – Statistics Canada
- **RBA** – Reserve Bank of Australia
- **BOJ** – Bank of Japan

## 🆓 Free vs 💎 Paid Plans

| Feature | Free (No API Key) | Paid (Valid API Key) |
|---------|------------------|----------------------|
| **Custom Functions** | ✅ All functions | ✅ All functions |
| **Observation Limit** | 100 most recent | 1,000 most recent |
| **Search & Insert** | ✅ Basic search | ✅ Enhanced search |
| **Data Preview** | ✅ Available | ✅ Available |
| **Formula Builder** | ❌ Locked | ✅ Unlocked |
| **Templates** | ❌ Locked | ✅ Unlocked |
| **Multi-Insert** | ❌ Not available | ✅ Checkboxes visible |
| **Favorites/Recent** | ✅ Available | ✅ Available |
| **Browse by Source** | ✅ Available | ✅ Available |

**Upgrade Message**: When data is truncated at 100 observations, users see:
> ⚠️ Data limited to 100 most recent observations. Upgrade to a paid plan at datasetiq.com/pricing for up to 1,000 observations per series.

## 🚀 Getting Started

### Installation
1. Install from Google Workspace Marketplace
2. Open Google Sheets → Extensions → DataSetIQ → Open Sidebar
3. First-time: Extensions → DataSetIQ → Authorize (grants network permissions)

### Connecting Your Account
1. Visit [datasetiq.com/dashboard/api-keys](https://datasetiq.com/dashboard/api-keys)
2. Create an API key (free or paid plan)
3. In sidebar, enter your API key and click "Connect Account"
4. Status shows: ✅ Connected - Premium features unlocked

### Using Custom Functions

**Basic Usage:**
```javascript
=DSIQ("FRED-GDP")
// Returns full GDP time-series with Date/Value headers

=DSIQ_LATEST("BLS-CPI")
// Returns latest CPI value

=DSIQ_VALUE("IMF-NGDP", "2023-12-31")
// Returns GDP value on or before Dec 31, 2023

=DSIQ_YOY("FRED-UNRATE")
// Returns year-over-year change in unemployment rate
```

**Advanced Options:**
```javascript
=DSIQ("FRED-GDP", "quarterly", "2020-01-01")
// GDP data, quarterly frequency, from 2020 onwards

=DSIQ_META("FRED-GDP", "title")
// Returns metadata field (title, units, frequency, updated, source)
```

## 📖 User Guides

### Formula Builder Wizard

**Step 1: Choose Function**
- Select from DSIQ, DSIQ_LATEST, DSIQ_VALUE, or DSIQ_YOY
- Each function has different parameters

**Step 2: Enter Series ID**
- Enter the series identifier (e.g., "FRED-GDP")
- Use Search tab to find series IDs

**Step 3: Configure Options** (DSIQ and DSIQ_VALUE only)
- **Frequency**: Optional (e.g., "quarterly", "monthly")
- **Start Date**: Optional (e.g., "2020-01-01")

**Step 4: Insert**
- Click "Insert Formula" to place in active cell
- Formula appears in cell and updates automatically

### Templates Guide

**Creating a Template:**
1. Build your sheet with DSIQ formulas
2. Click **🔧 Builder** tab → Navigate to Templates section
3. Click "🔍 Scan Current Sheet"
4. Review found formulas (count shown)
5. Enter template name (e.g., "Q4 Report")
6. Click "💾 Save Template"

**Loading a Template:**
1. Open new sheet
2. Navigate to Templates tab
3. Find saved template in list
4. Click "📥 Load" button
5. All formulas inserted at original cell positions

**Managing Templates:**
- **View**: See all saved templates with formula count
- **Load**: Insert template into active sheet
- **Delete**: Remove template (🗑️ button)

### Multi-Series Insert

**Selecting Series:**
1. Search for series in Search tab
2. Check boxes appear next to results (paid users only)
3. Select multiple series by clicking checkboxes
4. Counter updates: "Insert X Series" button appears

**Bulk Insert:**
1. Select active cell where you want first series
2. Click "Insert X Series" button
3. Series inserted vertically (one per row)
4. Uses DSIQ_LATEST function by default

## 🛠 Technical Details

### Architecture
- User API key stored in `PropertiesService` (user-scoped, never shared)
- Sidebar UI communicates with `Code.gs` backend via `google.script.run`
- Single retry with exponential backoff for 429/5xx errors
- Respects `Retry-After` headers from API
- Date normalization to UTC `YYYY-MM-DD` format

### Privacy & Security
- **No Key Leakage**: API keys stored per-user, never in spreadsheet
- **Shared Files**: Each user must connect their own account
- **Scopes**: Only requests necessary permissions (UrlFetchApp, Properties, Active Sheet)

### Error Handling
- **No API Key**: Sidebar shows "Connect your account" prompt
- **Invalid Key**: "Invalid API Key. Please reconnect."
- **Rate Limited**: "Rate limited. Please retry shortly."
- **Free Limit**: "Free plan limit reached. Upgrade at datasetiq.com/pricing"
- **Server Error**: "Server unavailable. Please retry."

### Date Normalization
- All dates normalized to UTC `YYYY-MM-DD` format
- Handles MM/DD/YYYY, DD/MM/YYYY, ISO 8601, timestamps
- Frequency and start date parameters also normalized

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
