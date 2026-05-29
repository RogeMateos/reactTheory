# Content Audit

Date: 2026-05-29

## Scope

This audit checks the relationship between the educational content files in `sections/**`, the sidebar navigation in `index.html`, and the routing arrays/translations in `script.js`.

No build was run.

## Summary

- Total HTML content files under `sections/**`: **92**
- Navigation entries using `data-section`: **46**
- Every navigation entry resolves to existing EN/ES content files.
- Every content topic is exposed in navigation.
- Exact translation keys exist for every current navigation `data-section`.
- No legacy HTML files remain in `sections/en` or `sections/es`.

## Routed Categories

| Category | EN files | ES files | Status |
| --- | ---: | ---: | --- |
| `fundamentals` | 28 | 28 | Complete |
| `hooks` | 11 | 11 | Complete |
| `global-state-router` | 4 | 4 | Complete |
| `interview` | 3 | 3 | Complete |
| `legacy` (`sections/en`, `sections/es`) | 0 | 0 | Removed/migrated |

## Fixed in this consistency pass

### `document-title`

Status: **fixed**

- Files already existed in both languages:
  - `sections/fundamentals/en/document-title.html`
  - `sections/fundamentals/es/document-title.html`
- Added to Fundamentals navigation in `index.html`.
- Added to the `fundamentals` routing array in `script.js`.
- Added exact `document-title` translation key.

### `routerBrowser`

Status: **fixed / migrated out of legacy**

- Moved from legacy folders:
  - `sections/en/routerBrowser.html`
  - `sections/es/routerBrowser.html`
- New category-based location:
  - `sections/global-state-router/en/routerBrowser.html`
  - `sections/global-state-router/es/routerBrowser.html`
- Added to the `globalStateAndRouter` routing array in `script.js`.
- Added `data-translate="routerBrowser"` in `index.html`.

### `link-hooks-router`

Status: **fixed / completed and exposed**

- Existing EN file:
  - `sections/global-state-router/en/link-hooks-router.html`
- Added ES file:
  - `sections/global-state-router/es/link-hooks-router.html`
- Added to Global State & React Router navigation in `index.html`.
- Added to the `globalStateAndRouter` routing array in `script.js`.
- Added exact `link-hooks-router` translation key.

### Missing navigation translation keys

Status: **fixed**

Added or aligned exact translation keys for:

- `lifeCicle`
- `useRef`
- `useReducer`
- `react-hooks-rules-and-order`
- `react-hooks-masterclass`
- `link-hooks-router`

Also added missing `data-translate` attributes to existing navigation links where appropriate.

## Current Validation Snapshot

```txt
nav_count 46
missing_fetch_targets []
content_not_in_nav []
nav_without_translation_key []
legacy_files []
```

## Recommended Next Step

Add a lightweight validation script to prevent regressions:

- nav entries pointing to missing EN/ES files
- content files not exposed in navigation
- missing exact translation keys
- incomplete bilingual pairs
- accidental reintroduction of legacy `sections/en` or `sections/es` HTML files

This should be a small repository script, not a build step.
