# Ponditi Client UI — Design System Analysis

> Landing page is the visual source of truth. This document captures its actual design language so other pages can be restyled to match it without inventing a new system. All claims verified against `client/` (Sept 2026 tree).

## 1. Landing page implementation

- **Route:** `client/src/app/page.tsx` (the app root). There is **no `app/home/`** — the landing page *is* `page.tsx`.
- Async **Server Component** with ISR: fetches `/api/classtype/all`, `/api/subject/all`, `/api/tuitionm/all` in parallel via `@/utils/fetcher` + `React.cache`, `revalidate: 3600`, graceful empty-data fallback.
- **All landing styles live in one CSS module:** `src/styles/HomePage.module.scss` (1,439 lines): hero, image showcase, hero content + filter bar, float cards, stats banner, categories, courses, features, instructors, testimonials, CTA, responsive overrides.

## 2. Components used by the landing page

All in `src/components/home/` (12 files), consistent prop-passing convention:

| Component | Role |
|---|---|
| `HeroDecorations` | ~20 floating SVG shapes positioned over the hero |
| `ImageShowcase` | right-half image, gradient overlay, scan line, stat pills, gold "12+ years" badge |
| `HeroContent` (`'use client'`) | headline, CTA, filter bar (LocationAutocomplete + FilterSelect + Search) |
| `FloatCards` | floating stat cards (learners, students w/ avatars, certified) |
| `StatsBanner` / `StatItem` | purple gradient strip, Playfair stat numbers |
| `CategoryCard`, `CourseCard`, `InstructorCard`, `TestimonialCard` | white cards, memoized |
| `CoursesSection` (`'use client'`) | tabbed course grid (Popular/New/Top) |
| `FilterSelect` (`'use client'`) | custom dropdown used for search filters |

Shared pieces: `src/components/svg/` (17 geometric shapes), `src/components/icons/` (18 hand-rolled stroke SVG icons), `src/components/ui/LocationAutocomplete.tsx` (Geoapify, restyled to match `filterBtn`).

**Convention:** home components do **not** import the stylesheet — they receive it as a prop: `({ s }: { s: Record<string, string> })` and use `className={s.heroContent}`. New page components mirroring the home should follow this.

## 3. Styling systems

- **Not Tailwind.** Stack: **Bootstrap 5** (grid + utilities, imported globally in `layout.tsx`) + **Sass CSS Modules** (Next.js built-in).
- `layout.tsx`: `bootstrap.min.css` → `@/styles/globals.scss` → `Navbar` → `children` → `Footer`, wrapped in Redux + Theme providers. `globals.scss` only defines `.pageRoot` (Cabinet Grotesk, `$light` bg, `min-height: 100vh`, `overflow-x: hidden`).
- **Abstracts:**
  - `_variables.scss` — palette + several broken/junk tokens (see Gotchas).
  - `_keyframes.scss` — **the new/landing animation library** (`fadeUp`, `fadeIn`, `floatBob`, `floatBobAlt`, `spinSlow`, `spinSlowReverse`, `pulse`, `shimmerText`, `orbFloat`, `orbFloat2`, `popIn`, `borderGlow`, `scanLine`, `ringExpand`, `triFloat`, `triFloat2`, `glow`, `typewriter`).
  - `_mixins.scss` — **obsolete second design system** (navy gradient / red accent / dark glassmorphism / white-on-dark) — used only by old pages.
  - `_helpers.scss` — empty.
- `src/styles/components/_filter.scss` — shared filter-bar styles, `@use`d only by `TeacherSearch.module.scss`. **Near-exact duplicate of the filter styles inside `HomePage.module.scss` (lines 432–579).**

## 4. The landing page design language (source of truth)

### Colors
| Token | Value | Use |
|---|---|---|
| `$purple` | `#4A3D8F` | primary brand |
| `$purple-light` | `#6355B5` | gradient partner |
| `$purple-pale` | `#EEE9FF` | icon-tile/active-tint bg |
| `$purple-deep` | `#2D2460` | little used |
| `$green` | `#3EC878` | accent / success / hover borders |
| `$green-dark` | `#25A85A` | green gradient partner |
| `$green-pale` | `#E6FAF0` | badge bg, icon-tile variants |
| `$gold` | `#F5C842` | stars, experience badge |
| `$dark` | `#120F2E` | headings / text |
| `$mid` | `#7B72AA` | secondary text |
| `$light` | `#F7F5FF` | page background |

**Gradients (recurring recipes):**
- purple→purple-light: CTA buttons, stats banner, active tab
- green-dark→green: Search button
- **text accent:** purple→green `background-clip: text` ("gradient word" in section titles; hero variant animated `shimmerText`)
- CTA banner: purple→green
- page/hero backgrounds: `linear-gradient(145deg, #F0ECFF 0%, #F7F5FF 40%, #EAF9F1 100%)`
- gold gradient: circular "experience" badge

### Typography
- **Headings:** *Playfair Display* serif, 700/900, tight line-height (1.05–1.2), negative letter-spacing. Hero `clamp(2.4rem, 4.8vw, 4rem)`; section titles `2.5rem` (→2rem @992px, 1.8rem @768px); card titles 1.1–1.3rem; stat numbers `3rem` weight 900.
- **Body:** *Cabinet Grotesk* sans, 13–16px, 400–500; secondary text `$mid`, line-height 1.5–1.7.
- **Section eyebrow badge:** `0.8rem`, weight 800, `letter-spacing: 2px`, uppercase, green text on `$green-pale` pill (radius 30px) — e.g. "EXPLORE TOPICS", "WHY EDUCAMB".
- Fonts via Google-Fonts `@import` inside SCSS + Geist variables from `next/font` in layout (body actually uses Cabinet Grotesk).

### Spacing & layout
- Container: Bootstrap `container-xl px-4 px-lg-5`.
- Sections: 80–100px vertical padding, **alternating** white / `$light`(gradient) backgrounds.
- Section header rhythm: centered `mb-5` block = badge + title (one gradient word) + optional subtitle (1.1rem, `$mid`, max-width 600px).
- Grids: Bootstrap `row g-4` (24px gutters). Cards 20–30px padding; filter bar 22/26px; cover height 200px.

### Border radius
Rounded-but-chunky: 12px (buttons/inputs/tabs), 14px (dropdowns), 16px (hero CTA, outline button), **20px** (feature/category/float cards), **24px** (filter bar, course/instructor/testimonial cards), 30px (section images), 40px (large CTA banner), `999px` (badges, tags), `50%` (avatars, circular elements).

### Shadows (all tinted with the purple hue)
- rest: `0 10px 30px rgba(74,61,143,0.06)`
- hover: `0 20px 40px rgba(74,61,143,0.12)`
- elevated: `0 20px 70px rgba(74,61,143,0.14)` (filter bar), `0 30px 60px rgba(74,61,143,0.15)` (feature image)
- buttons: `0 10px 32px rgba(74,61,143,0.35)` (purple CTA), `0 6px 20px rgba(37,168,90,0.35)` (green search), `0 10px 36px rgba(245,200,66,0.45)` (gold badge)

### Buttons (4 recipes)
1. **Purple gradient CTA** (hero): radius 16, weight 800, white arrow-in-circle; hover `translateY(-3px)` + deeper shadow + green gradient sweep via `::before`.
2. **Green gradient** (`searchBtn`): radius 12, weight 800, green shadow; hover lift.
3. **Outline** (`viewAllBtn`, `tabButton`): 2px purple border, purple text; hover fills purple (tab active = purple gradient + shadow).
4. **White-on-gradient** (`ctaButton`): white bg, purple text, radius 20, weight 800; hover lifts, arrow gap widens.

### Cards (the core pattern)
White bg + `1.5px solid rgba(74,61,143,0.06)` border + purple-tinted shadow, radius 20–24. **Hover = lift `translateY(-8/-10px)` + border turns green + shadow deepens + inner media zooms 1.05.** Icon tiles = tinted rounded squares (`$purple-pale`/`$green-pale`/gold tint) that flood green on hover. Avatars = circles with 2–4px green border. Playfair numerals for stats/price in tinted pills. Instructor cards reveal social buttons on hover.

### Forms / inputs
Filter bar = white 24px card, uppercase micro-label preceded by a small green→purple gradient bar; custom `FilterSelect` dropdowns (button + popover; **active = purple border + `0 0 0 3px $purple-pale` ring**); Geoapify location input restyled to match (`filterBtn` + injected `<style>`). Dark variant in footer (newsletter: white-alpha input, green focus border).

### Navigation & footer (already shared, new design)
- Navbar: fixed, transparent over hero; scrolled → white `blur(20px) saturate(180%)` + purple-tinted shadow + compact padding. Playfair brand; 14px `$mid` links, purple-pale pill hover/active; 40px green-ringed avatar; "Student Registration" white pill → purple fill on hover.
- Footer: `$dark` bg + purple→green top hairline; link hover→green with indent; green newsletter button; social circles fill green on hover.

### Motion
`fadeUp` reveals with stagger (`.fadeUp` + `.d1–.d5` delays, `cubic-bezier(0.22,1,0.36,1)`), floating ambient orbs, slow-spinning rings, bob/float on stat pills and badges, `popIn` entrances, scan line on hero image. Keyframes live in `_keyframes.scss` — reuse the partial, don't redefine.

### Responsive
- Hero image hidden ≤992px; content stacks.
- Section padding 60px ≤768px; section titles scale 2.5 → 2 → 1.8rem.
- Filter row stacks ≤768px; search/CTA buttons full width.
- Nav links desktop-only (`d-none d-lg-flex`); burger icon present but static.

## 5. Reusable components/styles other pages should adopt

**Reusable as-is:**
- `FilterSelect` + filter recipe (`_filter.scss` partial) for any search/tutor page. **Best move: promote filter styles out of `HomePage.module.scss` into `_filter.scss` to kill the duplication.**
- `LocationAutocomplete` (Geoapify, styled to match filter dropdowns).
- All 17 `svg/` decoration shapes and `HeroDecorations` for hero/campaign sections.
- All 18 `icons/` stroke icons.
- Section header pattern (`sectionBadge` + `sectionTitle` + optional `sectionSubtitle`) — candidates for a shared `SectionHeader` component on the same `s` prop pattern.
- Card recipes: Category / Course / Instructor / Testimonial (note CourseCard shows `$` pricing — adapt copy for a tuition app).
- Button recipes: gradient CTA / green search / outline / white-on-gradient.
- `_keyframes.scss` animations + `.fadeUp`/`.d1–d5` stagger helpers.
- Hero backdrop formula (ambient orbs + giant background word + 145° lavender/green gradient) — `TeacherSearch.module.scss` already copies it ("matching home page" comments); extract a shared partial to avoid a third copy.
- Navbar + Footer + globals are already global — keep.

**Stale/old system — do NOT reuse, candidates for rework toward the landing look:**
- `_mixins.scss` (navy/glass/white-on-dark) and the pages using it: `Login`, `Register`, `Faq`, `Contact`, `AdminLogin` + `components/elements/*`.
- `utils.module.scss` (legacy blog-era utilities, used only by the dead `components/layout.tsx`).

## 6. Gotchas before any redesign

1. **`text-gradient` likely isn't rendering.** Defined *nested* inside `.sectionTitle` in `HomePage.module.scss` but used as a bare string class in `page.tsx`/`CoursesSection.tsx`. CSS-module hashing means the gradient probably doesn't apply — gradient-word spans likely render plain. Verify before treating it as reference.
2. **Filter styles are duplicated** across `HomePage.module.scss` (~148 lines) and `_filter.scss` — restyling requires touching both unless extracted.
3. **`_variables.scss` contains broken leftovers:** `$shadow-md/hover/lg: 1 1 $white`, `$font-xs: 0.8 rem` (space), `$font-base: 0.6rem`, confusing aliases `$red: $green`, `$red-dark: $green-dark`, `$light: #F7F5FF`. Prefer named tokens for anything new.
4. **Two brand names in copy:** landing page says "Hello! I'm Master" and "WHY EDUCAMB"; app name is Ponditi. Copy is not final.
5. **Home components use the `s` prop convention** (`{s}: {s: Record<string, string>}`) instead of importing the module.
6. `page.module.css`, `components/layout.tsx`, `layout.module.scss` are starter/legacy leftovers, not part of the current design.
7. Images in `utils/staticData.ts` are hardcoded `unsplash`/`randomuser.me` demo URLs — demo data only (courses/categories/testimonials/instructors).

## 7. Recommended first implementation steps

1. Extract shared primitives: filter styles (single source → `_filter.scss`), `SectionHeader` component, card/button recipes, hero-backdrop partial.
2. Fix `text-gradient` (or deliberately scope it) so section-title accents render the gradient.
3. Restyle one old page (e.g. Login or Faq) to the landing design as a template before rolling out the rest.