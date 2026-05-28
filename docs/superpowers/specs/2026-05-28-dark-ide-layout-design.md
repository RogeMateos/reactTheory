# Design Spec: Dark IDE Layout Redesign

**Date:** 2026-05-28  
**Project:** react-theory  
**Aesthetic Direction:** Dark IDE / Developer Cave

---

## Goal

Redesign the visual layout of the react-theory educational site from a generic light-theme blog aesthetic to a distinctive dark IDE-inspired interface that feels native to the developer audience.

---

## Problem Statement

The current CSS has two issues:
1. **Structural bug:** `.container` has no `display: grid` or `display: flex`, so the sidebar and content are stacked vertically (block layout) instead of side-by-side at desktop widths.
2. **Visual quality:** System fonts (Segoe UI, Roboto, Arial), Bootstrap blue (#007bff), and a flat gray background (#f9f9f9) produce a generic, unmemorable aesthetic.

---

## Layout Structure

```
┌─────────────────────────────────────────────┐
│  HEADER  (full width, sticky, 60px)          │
├──────────────┬──────────────────────────────┤
│              │                              │
│  SIDEBAR     │  CONTENT AREA               │
│  280px fixed │  1fr, max-width 860px        │
│  own scroll  │  padding: 2rem 3rem          │
│              │                              │
└──────────────┴──────────────────────────────┘
```

- **Desktop (≥768px):** CSS Grid `280px 1fr`, header sticky top
- **Mobile (<768px):** Sidebar hidden, toggled as overlay drawer via existing `#menuToggle` + `.navbar.active` logic — no JS changes required
- Content area has `max-width: 860px` for optimal reading line length

---

## Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#0d1117` | Page background |
| `--bg-sidebar` | `#161b22` | Sidebar, cards (.box) |
| `--bg-hover` | `#21262d` | Hover backgrounds |
| `--accent` | `#61dafb` | React blue — links, active states, borders |
| `--accent-dim` | `rgba(97,218,251,0.12)` | Active tab background, subtle highlights |
| `--text-primary` | `#e6edf3` | Body text |
| `--text-muted` | `#8b949e` | Secondary text, nav links |
| `--text-heading` | `#ffffff` | Headings |
| `--border` | `#30363d` | Dividers, card borders |
| `--border-accent` | `#61dafb` | Active nav item left border |

---

## Typography

| Role | Font | Source |
|---|---|---|
| Headings / Title | `JetBrains Mono` | Google Fonts |
| Body / Nav | `Plus Jakarta Sans` | Google Fonts |
| Code blocks | Existing Prism Okaidia | CDN (unchanged) |

Font weights: 400 (body), 500 (nav links), 600 (section headers), 700 (headings).

---

## Component Specs

### Header
- Full width, sticky (`position: sticky; top: 0; z-index: 100`)
- Background `#161b22`, bottom border `1px solid #30363d`
- Title renders as `< React Theory />` in JetBrains Mono
- `#languageToggle` button: ghost style, border `#30363d`, hover border `#61dafb`

### Sidebar
- Background `#161b22`, right border `1px solid #30363d`
- `overflow-y: auto`, full viewport height minus header
- **Accordion headers:** `> FUNDAMENTOS` — monospace, uppercase, `#61dafb`, font-size 0.75rem, letter-spacing 0.1em
- **Nav links:** color `#8b949e`, hover → `color: #e6edf3` + background `#21262d` + `translateX(4px)`
- **Active link:** left border `2px solid #61dafb`, color `#61dafb`, background `rgba(97,218,251,0.08)`

### Content Area
- Background `#0d1117`
- `.box` → background `#161b22`, border `1px solid #30363d`, border-radius 8px
- Section `h1` in JetBrains Mono, color white

### Tabs
- Default: background `#21262d`, border `1px solid #30363d`, color `#8b949e`
- Active: background `rgba(97,218,251,0.12)`, border `1px solid #61dafb`, color `#61dafb`
- Hover: background `#30363d`, color `#e6edf3`

### Tables
- Header row: background `#21262d`, color `#61dafb`
- Even rows: background `rgba(255,255,255,0.02)`
- Border: `#30363d`

### Code Blocks (pre/code)
- Background `#0d1117` (matches page bg, Prism Okaidia handles the rest)
- Border `1px solid #30363d`

---

## Motion

| Element | Animation | Timing |
|---|---|---|
| Content load | `fadeIn` opacity 0→1 | 150ms ease |
| Tab switch | `fadeIn` on new content | 100ms ease |
| Nav link hover | `translateX(4px)` | 200ms ease |
| Accordion open | `max-height` transition | 300ms ease-out (existing) |

CSS `@keyframes fadeIn` added to styles.css. Applied via `.tab-content.active` and triggered by class toggle in existing `script.js` (no JS changes required for motion).

---

## Files to Modify

| File | Change |
|---|---|
| `index.html` | Add Google Fonts link tags; update title to `< React Theory />` |
| `styles.css` | Full redesign — colors, fonts, layout grid, all component styles |

No changes to `script.js` — all existing logic (accordion, tabs, language toggle, menu toggle) continues to work with the new CSS classes unchanged.

---

## Constraints

- Static HTML/CSS/JS — no build step, no framework
- Prism Okaidia theme stays on CDN (already dark, fits perfectly)
- All existing `data-section`, `data-tab`, `data-translate` attributes preserved
- Mobile hamburger menu behavior preserved via existing `.navbar.active` toggle
