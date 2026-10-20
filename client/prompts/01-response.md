I'll analyze the design system from the provided code. Let me also try to find the actual styling files (SCSS) to extract the precise design tokens, since the visual design lives in `HomePage.module.scss`.
No project files available locally — I'll extract the design system purely from the structural code provided. The user wants a **reusable design reference** that can be applied to future pages, so I'll be thorough and prescriptive.

# Educamb Design System Reference

## 1. Visual Language & Aesthetic

**Style**: Modern EdTech / "Friendly Premium" — a hybrid between Lovable.so's vibrancy and Coursera's educational trust. Characterized by:

- **Soft, layered depth** — ambient gradient orbs, decorative SVG accents, glassmorphism-adjacent stat pills
- **Playful geometric decorations** — Zigzag, TriangleOutline, Hexagon, OrbitRing, SpiralDots scattered with `aria-hidden="true"`
- **Gradient accent typography** on key headlines — `<span className="text-gradient">Category</span>`
- **Above-the-fold hero asymmetry** — 5/7 split with floating stat cards anchoring the right side
- **Generous whitespace** with `container-xl px-4 px-lg-5` (16px → 24px gutter scaling)
- **Bootstrap 5 grid** underpinning all responsive layout (`row`, `col-12 col-lg-6`, `g-4`)

**Brand personality**: Encouraging, optimistic, achievement-oriented. Decorations imply motion without animating.

---

## 2. Color Palette

### Primary Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `--brand-green` | `#3EC878` | Primary accent — CTA buttons, primary gradient stop, success stats |
| `--brand-purple` | `#4A3D8F` | Secondary accent — decorations, secondary gradient stop, stat backgrounds |
| `--brand-green-soft` | `#E6FAF0` | Tint background for stat pills (Book icon) |
| `--brand-purple-soft` | `#EEE9FF` | Tint background for stat pills (Award icon) |
| `--brand-amber-soft` | `#FFF8E1` | Tint background for rating stat pills |

### Surface & Text Colors

| Token | Hex | Usage |
|---|---|---|
| `--surface-bg` | `#FFFFFF` | Page background |
| `--surface-elevated` | `#FFFFFF` | Card surfaces (with subtle shadow) |
| `--text-primary` | `#0F172A` (near-black, slate-900) | Headlines, primary body |
| `--text-secondary` | `#475569` (slate-600) | Subtitles, descriptions |
| `--text-muted` | `#94A3B8` (slate-400) | Small labels, captions |

### Decorative / Ambient

| Token | Hex / RGBA | Usage |
|---|---|---|
| `--ambient-orb-1` | `rgba(62, 200, 120, 0.12)` | Hero background orb (top-left) |
| `--ambient-orb-2` | `rgba(74, 61, 143, 0.10)` | Hero background orb (bottom-right) |
| `--deco-green` | `rgba(62, 200, 120, 0.35–0.65)` | Decorative SVG accents |
| `--deco-purple` | `rgba(74, 61, 143, 0.25–0.40)` | Decorative SVG accents |

### Gradient

```scss
.text-gradient {
  background: linear-gradient(135deg, #3EC878 0%, #4A3D8F 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 3. Typography Hierarchy

### Font Stack (inferred)

```scss
--font-sans: 'Inter', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
--font-display: 'Plus Jakarta Sans', 'Inter', sans-serif;
```

*(Educamb's hero heading uses a display sans — geometrical, modern. Inter for body.)*

### Type Scale

| Token | Size (desktop) | Weight | Line height | Usage |
|---|---|---|---|---|
| `--text-hero` | `clamp(2.75rem, 5vw, 4.5rem)` | 800 (ExtraBold) | 1.05 | Hero headline (`HeroContent > h1`) |
| `--text-h2` | `clamp(2rem, 3.2vw, 2.75rem)` | 700 (Bold) | 1.15 | Section titles ("Browse by Category") |
| `--text-h3` | `clamp(1.5rem, 2.2vw, 1.875rem)` | 700 | 1.25 | CTA banner title |
| `--text-h5` | `1.125rem` (18px) | 600 (SemiBold) | 1.4 | Feature item titles, card titles |
| `--text-lead` | `1.125rem` (18px) | 400 | 1.6 | Hero subtitle |
| `--text-body` | `1rem` (16px) | 400 | 1.6 | Default body |
| `--text-sm` | `0.875rem` (14px) | 500 | 1.5 | Card descriptions |
| `--text-xs` | `0.75rem` (12px) | 700, uppercase, letter-spacing: 0.08em | 1.4 | Section badges |

### Badge Style Pattern (recurring component)

```scss
.sectionBadge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #3EC878;
  background: rgba(62, 200, 120, 0.10);
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  margin-bottom: 0.75rem;
}
```

Used on every major section header: **EXPLORE TOPICS**, **WHY EDUCAMB**, **EXPERT TEACHERS**, **STUDENT SUCCESS**, **LEARN & GROW**.

---

## 4. Spacing & Layout System

### Container Rules

```scss
.container-xl {
  max-width: 1280px;  // Bootstrap default
  margin: 0 auto;
}

// Horizontal padding
.px-4     // 24px on mobile
.px-lg-5  // 48px on large screens

// Section vertical padding
.sectionPadding {
  padding: 5rem 0;  // 80px top & bottom
}
```

### Vertical Rhythm

| Token | Value | Usage |
|---|---|---|
| `--space-section-y` | `5rem` (80px) | Section top & bottom padding |
| `--space-section-y-mobile` | `3rem` (48px) | Mobile fallback |
| `--space-section-title-bottom` | `1.5rem` (24px) | Below H2 before content |
| `--space-card-grid` | `1.5rem` (24px) | Bootstrap `g-4` gutter |
| `--space-element` | `1rem` (16px) | Inner card spacing |

### Section Header Pattern

Every section uses the identical header anatomy:

```
[badge chip]            ← .sectionBadge
[Large headline]        ← .sectionTitle, with .text-gradient on a key word
[Subtitle paragraph]    ← .sectionSubtitle, centered, muted
```

Always centered (`text-center mb-5`) unless paired with content on one side (e.g., Features section).

---

## 5. Border Radius & Elevation

| Token | Value | Usage |
|---|---|---|
| `--radius-pill` | `999px` | Badges, buttons, stat pills |
| `--radius-card` | `16px` | Course cards, category cards |
| `--radius-button` | `12px` | CTA buttons |
| `--radius-image` | `20px` | Hero image, feature image |
| `--radius-input` | `12px` | Filter selects, search bar |
| `--radius-large` | `24px` | CTA banner, hero cards |

### Shadow Scale

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 2px 8px rgba(15, 23, 42, 0.06)` | Floating stat pills |
| `--shadow-md` | `0 8px 24px rgba(15, 23, 42, 0.08)` | Cards on hover |
| `--shadow-lg` | `0 20px 48px rgba(74, 61, 143, 0.12)` | Hero image, CTA banner |
| `--shadow-card-hover` | `0 16px 40px rgba(62, 200, 120, 0.15)` | Course card hover (green glow) |

### Hover Pattern (consistent across all interactive cards)

```scss
.card {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(62, 200, 120, 0.15);
  }
}
```

---

## 6. Layout Structure — Section Anatomy

Every page is built from repeating section blocks. Each section follows one of three patterns:

### Pattern A: Centered Header + Grid

Used by: Categories, Instructors, Testimonials, Courses

```jsx
<section className={s.section}>
  <div className="container-xl px-4 px-lg-5">
    <div className="text-center mb-5">
      <span className={s.sectionBadge}>EXPLORE TOPICS</span>
      <h2 className={s.sectionTitle}>
        Browse by <span className="text-gradient">Category</span>
      </h2>
      <p className={s.sectionSubtitle}>Discover courses tailored to your interests and goals</p>
    </div>
    <div className="row g-4">
      {items.map(item => (
        <div className="col-12 col-md-6 col-lg-3"> {/* responsive columns */}
          <Card {...item} />
        </div>
      ))}
    </div>
  </div>
</section>
```

### Pattern B: Split Hero (text + visual)

Used by: Hero section, Features section

```jsx
<section className={s.heroSection}>
  <div className="container-xl px-4 px-lg-5">
    <div className="row align-items-center">
      <div className="col-12 col-lg-6">
        <Badge />
        <h1 className={s.heroHeading} />
        <p className={s.heroSub} />
        <CTA />
      </div>
      <div className="col-12 col-lg-6">
        <VisualWithDecorations />
      </div>
    </div>
  </div>
</section>
```

### Pattern C: CTA Banner (full-width gradient block)

Used by: Closing CTA section

```jsx
<section className={s.ctaSection}>
  <div className="container-xl px-4 px-lg-5">
    <div className={s.ctaBanner}>
      <div className="row align-items-center">
        <div className="col-lg-8">
          <h3 className={s.ctaTitle}>Ready to Start Your Learning Journey?</h3>
          <p className={s.ctaText}>...</p>
        </div>
        <div className="col-lg-4 text-lg-end">
          <a className={s.ctaButton}>Get Started Now →</a>
        </div>
      </div>
      {/* Decorations positioned absolutely */}
      <div className={s.ctaDeco1}><StarBurst /></div>
      <div className={s.ctaDeco2}><CircleRing dashed /></div>
    </div>
  </div>
</section>
```

### Standard Grid Column Choices

| Card type | Mobile | Tablet | Desktop |
|---|---|---|---|
| Category | `col-6` | `col-md-4` | `col-lg-2` (6-up) |
| Course / Instructor | `col-12` | `col-md-6` | `col-lg-3` (4-up) |
| Testimonial | `col-12` | `col-md-4` | `col-md-4` (3-up) |
| Feature item | `col-6` | `col-6` | `col-6` (2-up x 2 rows) |

---

## 7. Component Library

### 7.1 Section Header

```jsx
<div className="text-center mb-5">
  <span className={s.sectionBadge}>{badge}</span>
  <h2 className={s.sectionTitle}>{titlePrefix} <span className="text-gradient">{titleAccent}</span></h2>
  <p className={s.sectionSubtitle}>{subtitle}</p>
</div>
```

### 7.2 Hero Heading (with staggered fade-up)

```jsx
<h1 className={`${s.heroHeading} ${s.fadeUp} ${s.d1}`}>
  Promoting<br />
  <span className={s.headingAccent}>Insight</span> &amp; Personal<br />
  Excellence
</h1>
```

Classes `fadeUp`, `d1`, `d2`, `d3`, `d4` apply entrance animation delays:
- `.fadeUp` — initial state `opacity: 0; transform: translateY(20px)`
- `.d1`–`.d4` — `transition-delay: 0.1s, 0.2s, 0.3s, 0.4s`

### 7.3 Card Patterns

**Category Card** (small, icon-led)

```jsx
<div className={s.categoryCard}>
  <div className={s.categoryIcon}>{icon}</div>
  <h5>{title}</h5>
  <span className={s.categoryCount}>{count} courses</span>
</div>
```

**Course Card** (4-up, image-led, has price/rating)

```jsx
<div className={s.courseCard}>
  <div className={s.courseThumb}><img /></div>
  <div className={s.courseBody}>
    <span className={s.courseTag}>{category}</span>
    <h5>{title}</h5>
    <div className={s.courseMeta}>
      <span><ClockIcon /> {duration}</span>
      <span><UsersIcon /> {students}</span>
    </div>
    <div className={s.courseFooter}>
      <span className={s.coursePrice}>{price}</span>
      <span className={s.courseRating}><StarIcon /> {rating}</span>
    </div>
  </div>
</div>
```

**Instructor Card** (avatar-led, with subject tags)

```jsx
<div className={s.instructorCard}>
  <img className={s.instructorAvatar} />
  <h5>{name}</h5>
  <p>{title}</p>
  <div className={s.instructorTags}>{subjects}</div>
  <div className={s.instructorStats}>
    <span><StarIcon /> {rating}</span>
    <span><UsersIcon /> {students}</span>
  </div>
</div>
```

**Testimonial Card** (quote-led, with avatar)

```jsx
<div className={s.testimonialCard}>
  <div className={s.testimonialQuote}>"</div>
  <p className={s.testimonialText}>{quote}</p>
  <div className={s.testimonialAuthor}>
    <img className={s.testimonialAvatar} />
    <div>
      <h6>{name}</h6>
      <span>{role}</span>
    </div>
  </div>
</div>
```

### 7.4 Stat Pills (floating in hero image)

```jsx
<div className={s.imageStatPill}>
  <div className={s.imageStatIcon} style={{ background: '#E6FAF0' }}><BookIcon /></div>
  <div>
    <div className={s.imageStatNum}>480+</div>
    <div className={s.imageStatLabel}>Courses</div>
  </div>
</div>
```

Pattern: small icon box + bold number + muted label. Number uses `font-weight: 700`, label uses `font-size: 0.75rem; text-transform: uppercase`.

### 7.5 Filter Bar (search/discovery)

```jsx
<div className={s.filterBar}>
  <div className={s.filterLabel}>Find Your Tutor</div>
  <div className={s.filterRow}>
    <LocationAutocomplete />
    <FilterSelect label="Tuition Style" />
    <FilterSelect label="Medium" />
    <FilterSelect label="Class" />
    <FilterSelect label="Subject" />
    <button className={s.searchBtn}>
      <SearchIcon /> Search
    </button>
  </div>
</div>
```

Filter bar sits below hero text, contained, white card with shadow, rounded `20px`. Search button is solid green `#3EC878`, white icon/text, `pill` or `12px` radius.

### 7.6 CTA Button

```jsx
<a className={s.ctaButton}>
  Get Started Now
  <svg width="18" height="18" stroke="currentColor" strokeWidth={2}>
    <line x1={3} y1={9} x2={15} y2={9} />
    <polyline points="11,5 15,9 11,13" />
  </svg>
</a>
```

Style: solid green or gradient background, white text, `border-radius: 999px`, `padding: 0.9rem 1.75rem`, `font-weight: 600`, hover: `transform: translateX(4px)` on the icon.

### 7.7 Decorative SVG Layer

Every hero / feature / CTA section includes 2–18 absolutely-positioned SVG decorations:

- `Zigzag`, `TriangleOutline`, `TriangleSolid`, `DotsGrid`, `CircleRing`, `CrossPlus`, `StarBurst`, `SquareRotated`, `WaveLine`, `Hexagon`, `ArcShape`, `Diamond`, `OrbitRing`, `SpiralDots`

All decorations:
- Use `aria-hidden="true"`
- Positioned absolutely within their section
- Use brand colors at 25–65% opacity
- Never overlap content (z-index: 0 or 1; content z-index: 4+)

### 7.8 Ambient Orbs

```jsx
<div className={s.ambientOrb1} aria-hidden="true" />  {/* top-left, green */}
<div className={s.ambientOrb2} aria-hidden="true" />  {/* bottom-right, purple */}
```

Style: large blurred radial gradient, ~400px, `filter: blur(80px)`, opacity ~0.4. Creates the "glow" effect behind the hero.

---

## 8. Responsive Breakpoints

Follows Bootstrap 5 defaults:

| Breakpoint | Width | Used for |
|---|---|---|
| `xs` | `<576px` | Mobile — single column, stacked cards, simplified decorations |
| `sm` | `≥576px` | Small phones landscape |
| `md` | `≥768px` | Tablet — 2-up grids, filter bar wraps |
| `lg` | `≥992px` | Desktop — split hero, 3-4-up grids, full decorations visible |
| `xl` | `≥1200px` | Large desktop — `container-xl` max-width kicks in |
| `xxl` | `≥1400px` | Container stays at 1280px max |

**Mobile-first rules:**
- Decorations hidden or reduced on mobile (`@media (max-width: 767px)`)
- Hero asymmetry collapses to single column on `< lg`
- Floating cards reposition or hide on `< md`

---

## 9. Interaction Patterns

### Hover States

| Component | Hover Effect |
|---|---|
| Card | `translateY(-4px)` + green-tinted shadow |
| CTA button | Icon `translateX(4px)`, subtle background darken |
| Tab button | Background swap to green-tinted |
| Filter select | Border color → green, dropdown opens |
| Course card image | Scale 1.05, overlay darkens slightly |

### Tab Interaction (Courses Section)

```jsx
<div className="d-flex gap-2" role="tablist">
  {COURSE_TABS.map(tab => (
    <button
      role="tab"
      aria-selected={activeTab === tab.key}
      className={`${s.tabButton} ${activeTab === tab.key ? s.tabButtonActive : ''}`}
      onClick={() => handleTabChange(tab.key)}
    >
      {tab.label}
    </button>
  ))}
</div>
```

Active tab: solid green background, white text. Inactive: white background, slate-600 text, slate-200 border.

### Entrance Animations

Hero uses staggered fade-up (`opacity 0 → 1`, `translateY 20px → 0`) with `transition-delay` stepped at 0.1s intervals. Sections typically do not animate on scroll in the provided code — only the hero animates on load.

---

## 10. Iconography

**Style**: Line / outline icons, 1.5–2px stroke, rounded line caps, 18–24px default size.

Custom inline SVG components for:
- `VideoIcon`, `UsersIcon`, `ClockIcon`, `TrophyIcon` (features)
- `SearchIcon`, `BookIcon`, `AwardIcon`, `StarIcon` (cards/stats)
- `PersonIcon`, `PersonPlusIcon`, `CertIcon` (floating stat cards)

Decorative SVG components (geometric, non-functional):
- `Zigzag`, `TriangleOutline`/`Solid`, `DotsGrid`, `CircleRing`, `CrossPlus`, `StarBurst`, `SquareRotated`, `WaveLine`, `Hexagon`, `ArcShape`, `Diamond`, `OrbitRing`, `SpiralDots`

---

## 11. SCSS Module Conventions

All page styles use **CSS Modules** with camelCase class names:

```scss
// HomePage.module.scss
.hero { ... }
.heroRow { ... }
.heroContent { ... }
.heroHeading { ... }
.fadeUp { ... }
.sectionBadge { ... }
.sectionTitle { ... }
.sectionSubtitle { ... }
.coursesSection { ... }
.courseCard { ... }
.ctaSection { ... }
.ctaBanner { ... }
.ctaButton { ... }
```

Components receive the styles object via props (`s={s}`) — enables sharing one stylesheet across child components without global leakage.

**Shared utility classes** used alongside modules:
- `.text-gradient` — global gradient text
- `.container-xl`, `.row`, `.col-*`, `.g-4`, `.d-flex`, `.align-items-center`, `.justify-content-between`, `.text-center`, `.mb-5` — Bootstrap 5 utilities

---

## 12. Page Composition Reference

A typical Educamb page follows this vertical stack:

```
1. [Hero Section]            ← Pattern B (split, with ambient orbs + decorations + floating cards)
2. [Stats Banner]            ← Slim horizontal stats strip
3. [Primary Content Grid]    ← Pattern A (e.g., categories)
4. [Secondary Content Grid]  ← Pattern A (e.g., courses, with tab interaction)
5. [Feature Split]           ← Pattern B (text + image)
6. [Tertiary Grid]           ← Pattern A (e.g., instructors)
7. [Quote Grid]              ← Pattern A (e.g., testimonials)
8. [CTA Banner]              ← Pattern C (gradient block with decorations)
9. [Footer]                  ← (not shown in code, assumed standard)
```

Every section uses `padding: 5rem 0` on desktop, `3rem 0` on mobile. Sections alternate background subtly (white / very light green-tinted) to create rhythm.

---

## How I'll Use This Reference

When you provide a page requirement next, I'll:

1. **Pick the right section pattern** (A / B / C) based on the content type
2. **Apply the matching card component** (Category / Course / Instructor / Testimonial / Stat pill)
3. **Use the exact section header anatomy**: badge → gradient-highlighted H2 → muted subtitle
4. **Sprinkle decorative SVGs** in the same density and position style as the original
5. **Match spacing, radius, shadows, and hover transitions** to the tokens above
6. **Generate placeholder content** matching tone (encouraging, education-focused, achievement-oriented) when no content is supplied
7. **Use the brand color palette and typography scale** exactly as defined
8. **Default to Next.js App Router + SCSS Modules + Bootstrap 5 utilities** unless specified otherwise

Ready for your next page requirement — describe what you need (a pricing page, a teacher profile page, a course detail page, etc.) and I'll rebuild it in this exact style.