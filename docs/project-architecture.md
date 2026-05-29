# React Theory Project Architecture

## Overview

React Theory is a bilingual educational web application for learning React concepts through structured lessons, code examples, and explanations. It is implemented as a static HTML/CSS/JavaScript site with dynamic lesson loading.

## Architecture

- `index.html` defines the shell: header, language toggle, sidebar navigation, and main lesson container.
- `script.js` handles content loading, language switching, accordion navigation, tab behavior, code execution helpers, breadcrumbs, lesson metadata, and table-of-contents generation.
- `styles.css` owns layout, typography, responsive behavior, dark mode, sidebar, lesson content, tabs, code blocks, and navigation polish.
- `sections/**` contains lesson HTML fragments grouped by topic category and language.

There is no framework build step. The app runs as static files served by a lightweight development server.

## Content Organization

Lessons are grouped by category and language:

```txt
sections/
├── fundamentals/
│   ├── en/
│   └── es/
├── hooks/
│   ├── en/
│   └── es/
└── interview/
    ├── en/
    └── es/
```

Each English lesson should have a matching Spanish version with the same structure and equivalent content.

## Routing and Navigation Model

Navigation links use `data-section` values in `index.html`.

```html
<a href="#" data-section="useState">useState</a>
```

`script.js` maps each section name to a category array, then fetches the corresponding lesson file from:

```txt
sections/{category}/{language}/{section}.html
```

Section names must be unique across routing arrays. If a section appears in more than one category, routing becomes ambiguous and the first matching category wins.

## Common Workflow for Adding Content

1. Create the English lesson file in `sections/{category}/en/{section}.html`.
2. Create the Spanish lesson file in `sections/{category}/es/{section}.html`.
3. Add a sidebar link in `index.html` with the correct `data-section`.
4. Add the section name to the correct routing array in `script.js`.
5. Add or update the display translation in `script.js` if needed.
6. Verify language switching, lesson loading, tabs, and generated table of contents manually.

## Common Pitfalls

- Keep each `data-section` value in only one routing category.
- Create both `en` and `es` lesson files together to avoid language-toggle failures.
- Ensure tab buttons use `data-tab` values that match their target article `id`.
- Only one tab content article should start with the `active` class.
- Use `language-jsx` for React examples and `language-javascript` for plain JavaScript examples.
- Preserve proper Spanish characters directly, such as `á`, `é`, `í`, `ó`, `ú`, and `ñ`.
- Do not introduce a build step unless the project architecture is intentionally changed.
