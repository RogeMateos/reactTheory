# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**React Theory** is a bilingual (English/Spanish) educational web application that teaches React concepts through interactive content with code examples and explanations. It's a static HTML/CSS/JavaScript site with dynamic content loading via JavaScript.

## Architecture & Structure

### Content Organization

The site uses a dynamic content loading system with sections organized by topic and language:

```
sections/
├── fundamentals/
│   ├── en/ → Basic React concepts (Components, Events, LifeCycle, etc.)
│   └── es/ → Same topics in Spanish
├── hooks/
│   ├── en/ → React Hooks (useState, useEffect, useContext, useRef, useReducer)
│   └── es/ → Same hooks in Spanish
├── interview/
│   ├── en/ → Interview prep questions
│   └── es/ → Same in Spanish
└── (legacy: /en, /es folders with old naming conventions)
```

### Core System

**index.html**: Single-page application with:
- Accordion navigation menu with collapsible sections (Fundamentals, Hooks, Routing, Interview Questions)
- Main content area where dynamically loaded HTML is inserted
- Language toggle button
- Menu toggle for mobile

**script.js**: Controls the entire application:
- `loadContent(section)`: Fetches HTML files based on section name and language. Routes sections to correct folder:
  - `hooks` array: Routes to `sections/hooks/{lang}/`
  - `fundamentals` array: Routes to `sections/fundamentals/{lang}/`
  - `interview` array: Routes to `sections/interview/{lang}/`
- `updateLanguage()`: Changes UI text and reloads current content in selected language
- `setupTabs()`: Handles tab navigation within content (concepts, code examples, exercises)
- `setupCodeExecution()`: Runs JavaScript code from textareas (for interactive examples)
- `getTranslation()`: Maps section names to display text in EN/ES

**styles.css**: Responsive grid layout with breakpoints:
- Mobile-first design (0-480px: 1 column)
- Tablet+ (768px+): 2 columns (250px nav + 1fr content)
- Max-width: 1400px

### Navigation Model

The `data-section` attribute in HTML links drives the routing:
```html
<a href="#" data-section="useState">useState</a>
```

The script looks up which array contains "useState" to determine the folder:
- If in `hooks` array → loads from `sections/hooks/en/useState.html`
- If in `fundamentals` array → loads from `sections/fundamentals/en/useState.html`

**Important**: Each section name must appear in only ONE array in script.js line 57-59 to avoid routing conflicts.

## Recent Changes & State

### useState Topic (Latest)
- **Moved from Fundamentals to Hooks** (correct location, since it's a Hook)
- Hooks version has enhanced content with analogies:
  - 🚦 Traffic Light analogy (for understanding state)
  - 🌡️ Thermometer analogy (for numeric state)
  - 📝 Form analogy (for user input)
  - Fundamental equation: UI = f(state)
- Removed from Fundamentals navigation (`index.html` line 39 removed)
- Removed from fundamentals array in `script.js` line 58

### Related Files Modified
- Hooks: `sections/hooks/en/useState.html` and `sections/hooks/es/useState.html` - Complete overhaul with new analogies
- Navigation: `index.html` - Removed useState from Fundamentals section
- Routing: `script.js` - Removed "useState" from fundamentals array

## Content File Format

Content sections use HTML with:
- Accordion-style tabs for navigation: `<div class="tab-buttons">` + `<article id="concepts" class="tab-content active">`
- Code syntax highlighting with `<pre><code class="language-jsx">` (Prism.js handles highlighting)
- Bilingual text (both EN and ES versions have identical structure, different content)
- ChatGPT resource links at bottom (`https://chatgpt.com/g/g-p-696fbea2755481919c8258fb23e8f822-react/...`)

Example structure:
```html
<section class="box">
  <h1>Topic Title</h1>
  <div class="tab-buttons">
    <button class="tab-button active" data-tab="concepts">Concepts</button>
    <button class="tab-button" data-tab="code-examples">Code Examples</button>
  </div>
  <article id="concepts" class="tab-content active">
    <!-- Content here -->
  </article>
  <article id="code-examples" class="tab-content">
    <!-- Code examples here -->
  </article>
</section>
```

**Key Rules**:
- Only ONE `<article>` should have `class="tab-content active"` initially
- Tab buttons use `data-tab` attribute matching article `id`
- Code blocks use `class="language-jsx"` for syntax highlighting
- Spanish translations: Use appropriate characters (á, é, í, ó, ú, ñ)

## Workflow for Common Tasks

### Adding New Content

1. Create new HTML file: `sections/{category}/{lang}/{topicName}.html`
2. Add navigation entry in `index.html` with unique `data-section` attribute
3. Add section name to appropriate array in `script.js` (hooks, fundamentals, or interview)
4. Add translation entry in `getTranslation()` function in `script.js`
5. Create Spanish version with identical structure, translated content

### Updating Analogies or Explanations

- Analogies are organized thematically in content sections
- Use emoji markers (🚦, 🌡️, 📝, etc.) for visual distinction
- Keep analogies consistent across EN/ES versions
- Update both language versions together

### Handling Language Toggle Issues

- User's language preference is stored in `currentLanguage` variable
- Language toggle calls `updateLanguage()` → refetches content in new language
- If language switch doesn't work: Check that both `en` and `es` versions of HTML file exist

### Fixing Routing Conflicts

If a section name appears in multiple arrays in script.js:
- The first match wins (hooks array checked first at line 62)
- This caused useState to load from hooks instead of fundamentals
- Solution: Keep section names unique across arrays, or use different data-section names

## Dependencies

- **Node.js**: For development server (package.json has `serve` as dev dependency)
- **serve**: Lightweight HTTP server (`npm start` runs this)
- **Prism.js**: Included via CDN for syntax highlighting
- No build step required (static HTML/CSS/JS)

## Running & Testing

```bash
# Install dependencies
npm install

# Start development server
npm start
# Opens local server (typically http://localhost:3000)

# Manual testing
- Toggle language button to test bilingual support
- Click navigation items to test content loading
- Test tabs within content sections
- Inspect browser console for any JavaScript errors
```

## File Locations to Know

| File | Purpose |
|------|---------|
| `index.html` | Main page structure + navigation + language toggle |
| `script.js` | All JavaScript logic (content loading, language switching, tabs) |
| `styles.css` | Responsive grid, typography, accordion styles |
| `sections/fundamentals/{en,es}/*.html` | Basic React concepts content |
| `sections/hooks/{en,es}/*.html` | React Hooks tutorials with analogies |
| `sections/interview/{en,es}/*.html` | Interview prep questions |
| `.codesandbox/` | CodeSandbox configuration for online editing |

## Common Pitfalls to Avoid

1. **Tab Navigation Failures**: Ensure only ONE article has `active` class initially, and `data-tab` matches article `id`
2. **Duplicate Section Names**: Keep section names unique across hooks/fundamentals/interview arrays in script.js
3. **Missing Translations**: When adding new content, create both EN and ES versions
4. **Cache Issues**: Users seeing old content? Advise hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows/Linux)
5. **Syntax Highlighting**: Use `class="language-jsx"` for React code, `class="language-javascript"` for JS
6. **Spanish Characters**: Use proper unicode (ñ, á, etc.) not HTML entities, unless in code examples

## Recent Session Notes

- Reorganized useState topic routing to place it correctly in Hooks section
- Added comprehensive analogies to Hooks version of useState
- Fixed navigation conflicts by removing duplicate section references
- All analogies (traffic light, thermometer, form) now in single location with proper tab structure
