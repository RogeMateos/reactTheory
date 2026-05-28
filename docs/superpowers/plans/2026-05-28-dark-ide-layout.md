# Dark IDE Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign react-theory's layout to a distinctive dark IDE aesthetic — fixing the missing CSS grid bug and replacing the generic light-theme styles with a React blue / GitHub dark visual language.

**Architecture:** All changes are isolated to `styles.css` (visual redesign + layout grid fix) and `index.html` (Google Fonts link tags + title text update). No JavaScript changes. The existing class names, data attributes, and DOM structure are preserved so script.js continues working without modification.

**Tech Stack:** Vanilla HTML/CSS, Google Fonts (JetBrains Mono + Plus Jakarta Sans), Prism Okaidia (unchanged, CDN)

**Spec:** `docs/superpowers/specs/2026-05-28-dark-ide-layout-design.md`

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Modify | `index.html` | Add Google Fonts `<link>` tags; update `<h1>` title text |
| Replace | `styles.css` | Full redesign: tokens, layout grid, all component styles |

---

### Task 1: Add Google Fonts and update title in index.html

**Files:**
- Modify: `index.html` (lines 7–8, line 18)

- [ ] **Step 1: Add Google Fonts preconnect and stylesheet links**

In `index.html`, after `<link rel="stylesheet" href="styles.css" />` (line 7), insert:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Update the h1 title**

Change line 18 from:
```html
<h1 id="title">React Theory</h1>
```
To:
```html
<h1 id="title">&lt; React Theory /&gt;</h1>
```

- [ ] **Step 3: Verify fonts load**

Start the dev server (`npm start`) and open the browser. Open DevTools → Network → filter by "fonts.gstatic". You should see two font requests (JetBrains Mono, Plus Jakarta Sans) returning 200.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add Google Fonts and update header title"
```

---

### Task 2: Replace CSS design tokens and base styles

**Files:**
- Modify: `styles.css` (`:root` block, body, html rules)

- [ ] **Step 1: Replace the entire `:root` block and base styles**

Replace from the top of `styles.css` through the end of the `/* RESET & BASE STYLES */` section with:

```css
/* ==========================================
   VARIABLES & DESIGN TOKENS
   ========================================== */

:root {
  /* Dark IDE palette */
  --bg-primary: #0d1117;
  --bg-sidebar: #161b22;
  --bg-hover: #21262d;
  --accent: #61dafb;
  --accent-dim: rgba(97, 218, 251, 0.12);
  --text-primary: #e6edf3;
  --text-muted: #8b949e;
  --text-heading: #ffffff;
  --border: #30363d;
  --border-accent: #61dafb;

  /* Legacy aliases kept for content files that reference these */
  --primary-color: #61dafb;
  --primary-hover: #a8e6f8;
  --text-color: #e6edf3;
  --background-color: #0d1117;
  --border-color: #30363d;
  --heading-color: #ffffff;
  --shadow-color: rgba(0, 0, 0, 0.4);

  /* Typography scale */
  --fs-body: 1rem;
  --fs-sm: 0.875rem;
  --fs-h3: 1.125rem;
  --fs-h2: 1.5rem;
  --fs-h1: 2rem;

  /* Line Heights */
  --lh-tight: 1.2;
  --lh-normal: 1.6;
  --lh-relaxed: 1.75;
}

/* ==========================================
   RESET & BASE STYLES
   ========================================== */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  line-height: var(--lh-normal);
  font-size: var(--fs-body);
  overflow-x: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
```

- [ ] **Step 2: Verify in browser**

The page should now have a dark background (`#0d1117`) and light text (`#e6edf3`). If the body text turns dark-on-dark, check that the legacy alias `--text-color` is present in `:root`.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: replace CSS tokens with dark IDE palette"
```

---

### Task 3: Fix layout grid and header

**Files:**
- Modify: `styles.css` (header block, `.container` block)

- [ ] **Step 1: Replace the header styles**

Find and replace the `header` block:

```css
/* ==========================================
   HEADER
   ========================================== */

header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  height: 60px;
  background-color: var(--bg-sidebar);
  border-bottom: 1px solid var(--border);
}

header h1 {
  margin: 0;
  font-family: "JetBrains Mono", monospace;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-heading);
  letter-spacing: -0.01em;
}

.header-controls {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

#languageToggle {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.375rem 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: var(--fs-sm);
  font-weight: 500;
  transition: border-color 0.2s ease, color 0.2s ease;
}

#languageToggle:hover {
  border-color: var(--accent);
  color: var(--accent);
}
```

- [ ] **Step 2: Replace the layout/container block**

Find and replace the `/* LAYOUT */` section:

```css
/* ==========================================
   LAYOUT
   ========================================== */

.container {
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: calc(100vh - 60px);
  max-width: 1400px;
  margin: 0 auto;
}

.box {
  background-color: var(--bg-sidebar);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.5rem 2rem;
  margin: 1.5rem 0;
}
```

- [ ] **Step 3: Verify in browser**

At desktop width (≥768px) the nav should now appear on the LEFT and the content on the RIGHT as two columns. The header should stick to the top as you scroll.

- [ ] **Step 4: Commit**

```bash
git add styles.css
git commit -m "fix: add CSS grid layout to container, sticky header"
```

---

### Task 4: Sidebar and accordion styles

**Files:**
- Modify: `styles.css` (`nav`, `.navbar`, `.accordion-*`, `nav a`)

- [ ] **Step 1: Replace the navigation styles**

Find and replace the `/* NAVIGATION & MENU TOGGLE */` and `/* ACCORDION */` sections with:

```css
/* ==========================================
   NAVIGATION & MENU TOGGLE
   ========================================== */

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.menu-toggle span {
  width: 22px;
  height: 2px;
  background-color: var(--text-muted);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 7px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -7px);
}

nav,
.navbar {
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  padding: 1.25rem 0;
  overflow-y: auto;
  height: calc(100vh - 60px);
  position: sticky;
  top: 60px;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  margin: 0;
}

nav a {
  display: block;
  padding: 0.375rem 1.25rem;
  color: var(--text-muted);
  font-size: var(--fs-sm);
  font-weight: 500;
  text-decoration: none;
  border-left: 2px solid transparent;
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}

nav a:hover {
  color: var(--text-primary);
  background-color: var(--bg-hover);
  transform: translateX(4px);
  text-decoration: none;
}

nav a.active {
  color: var(--accent);
  border-left-color: var(--border-accent);
  background-color: var(--accent-dim);
  font-weight: 600;
}

/* ==========================================
   ACCORDION
   ========================================== */

.accordion {
  list-style: none;
  padding: 0;
  margin: 0;
}

.accordion > li {
  margin-bottom: 0.25rem;
}

.accordion-header {
  display: block;
  padding: 0.625rem 1.25rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  cursor: pointer;
  margin: 0;
  transition: color 0.2s ease;
}

.accordion-header::before {
  content: "> ";
  opacity: 0.7;
}

.accordion-header:hover {
  color: var(--text-heading);
}

.accordion-content {
  padding: 0;
  background-color: transparent;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.accordion-header.active + .accordion-content {
  max-height: 1200px;
}

.accordion-content a {
  color: var(--text-muted);
}

.accordion-content a:hover {
  color: var(--text-primary);
}
```

- [ ] **Step 2: Verify in browser**

The sidebar should show category labels like `> FUNDAMENTOS` in React blue monospace. Hovering nav links should shift them 4px right with a lighter background. The active link should have a left cyan border.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: dark IDE sidebar and accordion styles"
```

---

### Task 5: Content area, typography, and links

**Files:**
- Modify: `styles.css` (`#content`, `h1/h2/h3`, `p`, `a`, `ul/ol`)

- [ ] **Step 1: Replace typography and content area styles**

Find and replace the `/* TYPOGRAPHY */`, `/* LINKS */`, and `/* LISTS */` sections with:

```css
/* ==========================================
   TYPOGRAPHY
   ========================================== */

h1,
h2,
h3 {
  font-family: "JetBrains Mono", monospace;
  color: var(--text-heading);
  line-height: var(--lh-tight);
  font-weight: 700;
  margin: 1.5rem 0 0.75rem;
}

h1 {
  font-size: var(--fs-h1);
  margin-top: 0;
}

h2 {
  font-size: var(--fs-h2);
}

h3 {
  font-size: var(--fs-h3);
  font-weight: 600;
}

p {
  margin: 0 0 1rem;
  color: var(--text-primary);
}

/* ==========================================
   CONTENT AREA
   ========================================== */

#content {
  min-height: 300px;
  padding: 2rem 3rem;
  max-width: 860px;
}

/* ==========================================
   LINKS
   ========================================== */

a {
  color: var(--accent);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

.box a {
  display: block;
  margin-top: 0.75rem;
  font-size: var(--fs-sm);
}

/* ==========================================
   LISTS
   ========================================== */

ul,
ol {
  list-style: none;
  padding-left: 0;
  margin-bottom: 1.25rem;
  line-height: var(--lh-relaxed);
  word-wrap: break-word;
  overflow-wrap: break-word;
}

li {
  margin-bottom: 0.5rem;
}

li ul,
li ol {
  margin: 0.5rem 0;
}
```

- [ ] **Step 2: Verify in browser**

Load any section (e.g. "Componentes"). The `<h1>` should appear in JetBrains Mono white. Body text should be `#e6edf3`. Links should be React blue.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: dark typography, content area padding, link colors"
```

---

### Task 6: Tab button styles

**Files:**
- Modify: `styles.css` (`/* TABS */` section)

- [ ] **Step 1: Replace the tabs section**

```css
/* ==========================================
   TABS
   ========================================== */

.tab-buttons {
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tab-button {
  padding: 0.5rem 1rem;
  background-color: var(--bg-hover);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: var(--fs-sm);
  font-weight: 500;
  color: var(--text-muted);
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  white-space: nowrap;
}

.tab-button:hover {
  background-color: var(--border);
  color: var(--text-primary);
}

.tab-button.active {
  background-color: var(--accent-dim);
  border-color: var(--accent);
  color: var(--accent);
  font-weight: 600;
}

.tab-button.active:hover {
  background-color: rgba(97, 218, 251, 0.2);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
  animation: fadeIn 150ms ease;
}
```

- [ ] **Step 2: Verify in browser**

Tab buttons should be dark pills. The active tab should have a cyan border and background. Switching tabs should show the fade-in animation.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: dark tab button styles with fadeIn animation"
```

---

### Task 7: Tables and code blocks

**Files:**
- Modify: `styles.css` (`/* CODE BLOCKS */` and `/* TABLES */` sections)

- [ ] **Step 1: Replace code blocks and tables sections**

```css
/* ==========================================
   CODE BLOCKS
   ========================================== */

pre {
  background-color: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  margin: 1rem 0;
}

code {
  font-family: "JetBrains Mono", "Courier New", monospace;
  font-size: 0.875em;
}

pre code {
  display: block;
  color: var(--text-primary);
}

/* ==========================================
   TABLES
   ========================================== */

.state-table,
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  border: 1px solid var(--border);
  font-size: var(--fs-sm);
  overflow-x: auto;
}

.state-table th,
table th {
  padding: 0.625rem 1rem;
  text-align: left;
  background-color: var(--bg-hover);
  color: var(--accent);
  font-weight: 700;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--border);
}

.state-table td,
table td {
  padding: 0.625rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
  line-height: var(--lh-normal);
}

.state-table tr:nth-child(even),
table tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.02);
}

.state-table tr:hover,
table tr:hover {
  background-color: var(--bg-hover);
}
```

- [ ] **Step 2: Verify in browser**

Navigate to a section with a table (e.g. "Arreglando la Paginación"). Table headers should be dark with React blue monospace text. Code blocks should be `#0d1117` with a subtle border.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: dark table and code block styles"
```

---

### Task 8: Animations

**Files:**
- Modify: `styles.css` (add `@keyframes` block)

- [ ] **Step 1: Add the fadeIn keyframe**

Add this block at the end of `styles.css`, before the responsive section:

```css
/* ==========================================
   ANIMATIONS
   ========================================== */

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.box {
  animation: fadeIn 150ms ease;
}
```

Note: `.tab-content.active` already references `fadeIn` from Task 6. This task adds the `@keyframes` definition and applies the same animation to `.box` for section loads.

- [ ] **Step 2: Verify in browser**

Click a navigation link. The content `.box` should fade in subtly from slightly below. Click a tab — the tab content should fade in.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: add fadeIn animation for content and tab transitions"
```

---

### Task 9: Mobile responsive styles

**Files:**
- Modify: `styles.css` (all `@media` blocks)

- [ ] **Step 1: Replace all responsive media query blocks**

Find and replace everything from `/* RESPONSIVE DESIGN */` to the end of the file:

```css
/* ==========================================
   RESPONSIVE DESIGN - MOBILE FIRST
   ========================================== */

@media (max-width: 767px) {
  body {
    padding: 0;
  }

  .container {
    display: block;
  }

  header {
    padding: 0 1rem;
  }

  #content {
    padding: 1.25rem 1rem;
    max-width: 100%;
  }

  .menu-toggle {
    display: flex;
  }

  nav,
  .navbar {
    display: none;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    height: calc(100vh - 60px);
    border-right: none;
    border-bottom: 1px solid var(--border);
    z-index: 100;
    overflow-y: auto;
  }

  nav.active,
  .navbar.active {
    display: block;
  }

  .box {
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }

  .tab-buttons {
    gap: 0.25rem;
  }

  .tab-button {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
  }
}

@media (min-width: 768px) {
  :root {
    --fs-body: 1rem;
    --fs-sm: 0.875rem;
    --fs-h3: 1.25rem;
    --fs-h2: 1.625rem;
    --fs-h1: 2.125rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --fs-body: 1.0625rem;
    --fs-sm: 0.9375rem;
    --fs-h3: 1.3125rem;
    --fs-h2: 1.75rem;
    --fs-h1: 2.25rem;
  }

  #content {
    padding: 2.5rem 3.5rem;
  }
}
```

- [ ] **Step 2: Test mobile behavior**

In DevTools, toggle device toolbar (Cmd+Shift+M). At 375px width:
- Sidebar should be hidden
- Hamburger icon should appear in header
- Clicking hamburger should show sidebar as full-screen overlay
- Content should span full width with 1rem padding

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: mobile responsive styles for dark IDE layout"
```

---

## Self-Review

**Spec coverage check:**
- ✅ CSS Grid layout (`280px 1fr`) — Task 3
- ✅ Sticky header — Task 3
- ✅ `< React Theory />` title — Task 1
- ✅ Dark color tokens (all 10) — Task 2
- ✅ JetBrains Mono + Plus Jakarta Sans — Tasks 1, 2, 5
- ✅ Sidebar with own scroll, sticky top 60px — Task 4
- ✅ `> FUNDAMENTOS` accordion headers — Task 4
- ✅ Nav link hover: translateX(4px) + bg — Task 4
- ✅ Active link: left border `#61dafb` — Task 4
- ✅ `.box` card: `#161b22` bg + border — Task 3
- ✅ Tab redesign (dark pills, cyan active) — Task 6
- ✅ Tables dark treatment — Task 7
- ✅ Code blocks dark bg + border — Task 7
- ✅ fadeIn motion — Task 6, 8
- ✅ Mobile drawer preserved — Task 9
- ✅ Prism Okaidia untouched — no task (CDN, no change needed)
- ✅ Legacy CSS variable aliases — Task 2 (prevents content files from breaking)

**Placeholder scan:** None found.

**Type consistency:** CSS variable names are consistent across all tasks. `--accent-dim` introduced in Task 2 and used in Tasks 4 and 6. `.box` animation added in Task 8 without duplicate definition.
