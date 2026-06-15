# SDS 2.0 — Roadmap & Issues Summary

## Overview

**SDS 2.0** transforms Spoko Design System from a component library limited to Vue/Astro into a **framework-agnostic design system** usable in any HTML context: Vue 3, Astro, React, Python web apps (Django/FastAPI/Flask), email templates, plain HTML, and more.

### Core Strategy: CSS-First with Thin Wrappers

```
UnoCSS Shortcuts (HTML class recipes)
    ↓
HTML markup documented + copy-pasteable
    ↓ consumed by:
├─ Vue 3 components (thin convenience wrappers)
├─ Astro components (SSR-ready wrappers)
├─ Plain HTML (Python, emails, websites)
└─ Any framework (Bootstrap, raw CSS)
```

Each shortcut (`btn-primary`, `input-standard`, `card`, etc.) is a **documented, reusable HTML pattern** that works everywhere.

---

## 📋 4 Milestones, 16 Issues

### Milestone 1: Foundation (Issues #440-443)
*Dynamic palette generator + CSS token export*

| Issue | Title | Status |
|-------|-------|--------|
| #440 | `feat(theme): dynamic palette generator function` | 🔵 Open |
| #441 | `feat(theme): CSS custom properties export for tokens` | 🔵 Open |
| #442 | `feat(uno-config): branded createSdsConfig()` | 🔵 Open |
| #443 | `feat(docs): palette configurator UI` | 🔵 Open |

**Goal:** User provides 2-3 input colors (primary `#2563eb`, secondary `#ec4899`, accent `#f59e0b`) → system auto-generates full palette → live preview → export config.

**Key Feature:** Algorithmic palette generation using OKLCH color space:
- Fix Hue from user input
- Scale Lightness 10%-95% for shade variants
- Reduce Chroma for neutral/disabled states
- No pre-defined palettes — purely derived

**Output:**
- `styles/tokens.css` — CSS variables usable in Python/HTML
- `createSdsConfig({ primary: '#2563eb', ... })` — config for consumers

---

### Milestone 2: Navigation & Layout (Issues #444-446)
*Drawer menu + mobile-first layout*

| Issue | Title | Status |
|-------|-------|--------|
| #444 | `feat(components): Drawer primitive component` | 🔵 Open |
| #445 | `feat(layout): mobile-first MainLayout overhaul` | 🔵 Open |
| #446 | `feat(components): Header improvements` | 🔵 Open |

**Goal:** Replace broken absolute-positioned sidebar with proper Drawer on mobile, visible sidebar on desktop.

**Key Features:**
- Drawer.vue + DrawerOverlay + DrawerTrigger components
- Escape closes, overlay click closes, focus trap
- Hamburger icon in header (mobile only)
- Responsive layout: <lg drawer, lg+ sidebar
- Smooth animations

---

### Milestone 3: CSS-First Component Layer (Issues #447-450)
*UnoCSS shortcuts = primary public API (Flowbite/FlyonUI-style)*

| Issue | Title | Status |
|-------|-------|--------|
| #447 | `feat(shortcuts): complete component shortcut coverage` | 🔵 Open |
| #448 | `feat(styles): pre-built CSS stylesheet export` | 🔵 Open |
| #449 | `feat(shortcuts): dark mode variants` | 🔵 Open |
| #450 | `docs(components): HTML recipe snippets` | 🔵 Open |

**Goal:** Every component has a documented HTML class recipe that works in **any environment**.

**Key Feature — `pnpm build:css`:**
```bash
# Generates dist/sds.css (all shortcuts + tokens compiled)
pnpm build:css

# Shipped in npm as:
# spoko-design-system/styles/sds.css
```

**Usage in Python (Flask/Django template):**
```html
<link rel="stylesheet" href="/static/sds.css">
<button class="btn-primary btn-normal">Click me</button>
```

No JavaScript required. Pure CSS + HTML.

---

### Milestone 4: Documentation Quality (Issues #451-455)
*Starlight-inspired improvements (within Astro)*

| Issue | Title | Status |
|-------|-------|--------|
| #451 | `feat(docs): ComponentPreview wrapper` | 🔵 Open |
| #452 | `feat(docs): PropsTable component` | 🔵 Open |
| #453 | `docs(components): standardize all component pages` | 🔵 Open |
| #454 | `feat(docs): dark mode toggle` | 🔵 Open |
| #455 | `chore(infra): audit & clean up exports` | 🔵 Open |

**Goal:** Every component page follows the same structure with live demos, prop tables, HTML recipes, and accessibility notes.

**Standard Page Structure:**
1. Introduction
2. Live Demo (ComponentPreview with tabs: Preview/HTML/Vue/React)
3. Props Table (auto-generated from TS interface)
4. HTML Recipe (copy-paste snippet, no JS required)
5. CSS Classes Section (link to shortcuts)
6. Accessibility Notes
7. Related Components

---

## 🎯 Key Decisions

### ✅ Why CSS-First (not Web Components)?
- **Web Components + Shadow DOM + UnoCSS = incompatible** (styles don't reach shadow tree)
- **CSS-only approach = universal** (works in Python, emails, plain HTML)
- **Vue/Astro wrappers are optional convenience**, not required

### ✅ Why Dynamic Palette (not pre-defined)?
- **Algorithmic OKLCH-based generation** = infinite palette options
- User picks 2-3 colors → rest auto-generated (consistent, predictable)
- Live configurator on docs site = no npm install needed to preview

### ✅ Why Pre-Built CSS Export?
- **`dist/sds.css`** is the bridge to non-JavaScript environments
- Python web apps can use: `<link rel="stylesheet" href="...sds.css">`
- All UnoCSS shortcuts pre-compiled, zero runtime overhead

---

## 📊 Effort & Timeline

| Milestone | Issues | Estimated Effort | Timeline |
|-----------|--------|------------------|----------|
| **M1: Foundation** | #440-443 | 8-10 hours | Week 1-2 |
| **M2: Navigation** | #444-446 | 6-8 hours | Week 2-3 |
| **M3: CSS-First** | #447-450 | 12-15 hours | Week 3-5 |
| **M4: Docs** | #451-455 | 10-12 hours | Week 5-7 |
| **Total** | 16 issues | **36-45 hours** | **7 weeks** |

*Assumes: 5-6 hours dev work per week, with buffer for reviews/testing.*

---

## 🚀 Concrete Use Cases After SDS 2.0

### Use Case 1: Python Flask App (Your Target)
```html
<!-- templates/base.html -->
<link rel="stylesheet" href="{{ url_for('static', filename='sds.css') }}">

<!-- templates/button.html -->
<button class="btn-primary btn-normal">Submit</button>
<div class="card card-body">
  <h3 class="text-lg font-semibold">Title</h3>
  <p class="text-neutral-dark">Content</p>
</div>
```

### Use Case 2: Vue 3 App (Existing)
```vue
<template>
  <Button primary>Click me</Button>
  <Input label="Email" />
  <Card>...</Card>
</template>

<script setup>
import { Button, Input, Card } from 'spoko-design-system'
</script>
```

### Use Case 3: React App (New)
```jsx
// Via CSS only (no React wrapper)
export const Button = ({ children, primary }) => (
  <button className={primary ? 'btn-primary' : 'btn-secondary'}>
    {children}
  </button>
)
```

### Use Case 4: Plain HTML Email
```html
<style>
  @import url('https://cdn.example.com/sds.css');
</style>

<body>
  <button class="btn-primary btn-normal">Read More</button>
  <div class="card">...</div>
</body>
```

---

## 🔗 GitHub Issues

**View all issues:** https://github.com/polo-blue/sds/issues?q=label%3Amilestone%2FM1+label%3Amilestone%2FM2+label%3Amilestone%2FM3+label%3Amilestone%2FM4

**Filter by milestone:**
- M1: https://github.com/polo-blue/sds/issues?q=label%3Amilestone%2FM1
- M2: https://github.com/polo-blue/sds/issues?q=label%3Amilestone%2FM2
- M3: https://github.com/polo-blue/sds/issues?q=label%3Amilestone%2FM3
- M4: https://github.com/polo-blue/sds/issues?q=label%3Amilestone%2FM4

---

## ✅ Verification Checklist per Milestone

### M1 Complete ✓
- [ ] `pnpm dev` → `/core/palette-configurator` page loads
- [ ] Color picker works, palette updates live
- [ ] "Export config" button copies ready `createSdsConfig({ primary: '#2563eb', ... })`
- [ ] `createSdsConfig({ primary: '#2563eb' })` actually generates purple palette
- [ ] `dist/tokens.css` generated with CSS variables
- [ ] Plain HTML file can load tokens.css and use CSS variables

### M2 Complete ✓
- [ ] Drawer opens/closes with animation
- [ ] Escape key closes drawer
- [ ] Focus trap works (Tab doesn't leave drawer)
- [ ] Mobile: hamburger icon in header, drawer visible
- [ ] Desktop (lg+): hamburger hidden, sidebar visible
- [ ] No layout shift between breakpoints

### M3 Complete ✓
- [ ] `pnpm build:css` produces `dist/sds.css` without errors
- [ ] File contains all shortcuts: `.btn-primary { ... }`, `.card { ... }`, etc.
- [ ] Plain HTML file: `<link href="sds.css">` + `<button class="btn-primary">` renders correctly
- [ ] All shortcuts have `dark:` variants
- [ ] Every component page has HTML recipe tab (copy-paste works)

### M4 Complete ✓
- [ ] Every component page follows standard structure
- [ ] ComponentPreview tab switching works
- [ ] PropsTable auto-renders from TS interfaces
- [ ] Dark mode toggle works, persists to localStorage
- [ ] All components readable in dark mode

---

## 🎓 For Contributors

Start with **Milestone 1** (Foundation). Each milestone is independent but builds on previous:
- **M1** enables everything else (palette system)
- **M2** is UI polish (navigation)
- **M3** is the big feature (CSS-first, cross-framework)
- **M4** is documentation polish (nice-to-have but important for adoption)

**Pick an issue, read the description, and start coding.** Each issue has acceptance criteria and links to related context.

---

## 📚 Related Documentation

- **Plan file:** `C:\Users\spoko\.claude\plans\zesty-strolling-axolotl.md`
- **CLAUDE.md (project rules):** `C:\Users\spoko\www\sds\CLAUDE.md`
- **Package.json:** `C:\Users\spoko\www\sds\package.json`
- **Current palette:** `C:\Users\spoko\www\sds\uno-config\theme\colors.ts`

---

*Last updated: 2026-06-07*
*Created by Claude Code during SDS 2.0 planning session*
