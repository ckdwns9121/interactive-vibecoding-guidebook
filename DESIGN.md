# Design

## Source of truth

- Status: Active
- Last refreshed: 2026-09-28
- Primary product surfaces: `/docs`, 29 component examples, `/docs/getting-started`, `/docs/favorites`.
- Evidence reviewed: README, catalogue, all existing pages and components; React Bits live Preview/Code/mobile screens and public UI source.
- User direction: full refactor following React Bits documentation structure; latest revision uses a charcoal background and yellow/amber accents (latest user preference).
- Reference: https://reactbits.dev/text-animations/split-text ; captures and structured comparisons at `.omx/artifacts/visual-ralph/react-bits/`.

## Brand

- Personality: practical interaction guidebook with Korean explanations and familiar technical labels.
- Trust signals: working previews, exact source-backed APIs, copyable source dependencies, verified interactions.
- Avoid: inert buttons, unsupported language options, fabricated CLI installation commands.
- Identity: Interaction Guide. Keep project content; do not reuse React Bits brand assets or commercial promotions.

## Product goals

- Goals: discover an effect, configure it, inspect its API, bring code or an AI prompt into a project.
- Non-goals: React Bits Pro/ads/services, external AI integrations, component registry publishing, nonexistent JS/CSS variants.
- Success signals: all 29 routes use a common template; current demo values appear in Usage; complete local source closure is copyable; browser checks pass.

## Personas and jobs

- Primary personas: React developers and people learning to build interfaces with AI.
- User jobs: find the right effect; understand its props; adapt the example to a screen.
- Key contexts of use: desktop experimentation and mobile browsing.

## Information architecture

- Primary navigation: desktop category sidebar, full search (`⌘K`/`Ctrl+K`), catalogue and favorites.
- Core routes/screens: all component URLs preserved; `/` and `/playground` redirect to their corresponding docs surfaces.
- Content hierarchy: category, name, Korean description, Preview/Code controls.
- Preview: animation → Customize → Props → Dependencies → application guide.
- Code: Install → configured Usage → source file picker → complete source.
- Right rail: local usage guidance and related examples, replacing commercial reference content.

## Design principles

- The interaction is the focal point. Keep its controls next to the experience.
- The implementation is the API documentation source of truth; build fails on missing catalogue metadata.
- Copy actions must copy the labelled content, preserving full source files and live example values.
- Tradeoffs: retain natural document scroll for sticky/scroll effects; do not force window-based effects into broken nested scrollers.

## Visual language

- Color: charcoal and warm yellow accents. `--docs-bg: #15140e`, panel `#201e17`, control `#2c2920`, border `#39342b`, muted `#b2aea5`, accent `#f0cd68`.
- Typography: existing Pretendard/system stack, English component names, Korean explanations. Main description 14px, compact metadata/code 10–12px, Props body 13px.
- Spacing/layout rhythm: 4px base; 24–32px sections; 60px header; 244px sidebar and 280px right rail at desktop.
- Shape/radius/elevation: 14px panel token, 7–10px controls; shadows reserved for menus and emphasized guide CTA.
- Motion: restrained shell transitions; examples own their animations. MorphingText respects reduced motion.
- Imagery/iconography: native text symbols and independent CSS guide artwork; existing component sample assets retained.

## Components

- Existing components to reuse: real animation implementations and docs-controls.
- New/changed components: ComponentDocPage, ComponentTabs, CodeBlock, PropsTable, Installation, CopyAction, DocsSidebar, DocsSearch, DocsRail, ComponentCatalog, DocsPreferences, DemoReset.
- Variants and states: preview/code, active category, saved/unsaved, selected source file, collapsed/expanded code, reset, copy success/error.
- Token/component ownership: docs.css owns the documentation surface; demo styles remain local. `src/lib/docs` owns catalogue access and explicit live TSX serialization.

## Accessibility

- Target standard: WCAG 2.2 AA for changed documentation interactions.
- Keyboard/focus behavior: skip link, visible focus, arrow/Home/End tab controls; native modal focus containment; Escape closes search/mobile nav.
- Contrast/readability: readable muted text on dark panels; small technical metadata distinguished from Korean explanations.
- Screen-reader semantics: labelled navigation/controls, tab roles, table headings, required prop indicator, live copy status.
- Reduced motion and sensory considerations: shell transitions respect preference; not all legacy effect implementations are motion-reduced. Demo replay/reset and tab unmounting let users stop/restart previews.

## Responsive behavior

- Supported breakpoints/devices: 390px verified mobile through 1440px desktop; layout rules down to 375px.
- Layout adaptations: modal nav below 768px; right rail hidden below 1280px; stacked Props cards and compact actions disclosure on mobile.
- Touch/hover differences: actions visible without hover; desktop cursor examples retain their inherently pointer-based behavior.

## Interaction states

- Loading: dynamically loaded syntax highlighting shows a readable loading message.
- Empty: search/favorites explain absence and permit filter reset.
- Error: clipboard rejection announced inline; metadata mismatch fails generation/checks.
- Success: copied confirmation and favorite state are immediately visible.
- Disabled: unsupported technology variants are omitted.
- Offline/slow network: no new backend service. Storage failure keeps in-session favorites usable; storage persistence cannot be guaranteed in blocked/private environments.

## Content voice

- Tone: concise Korean guidance; familiar React labels Preview, Code, Customize, Props, Dependencies.
- Terminology: 재생 restarts demo only; 초기화 remounts the route to reset controls.
- Microcopy rules: name actual unsupported prop behavior, required files and image/import adaptation requirements.

## Implementation constraints

- Framework/styling system: Next.js 15, React 19, Tailwind 4, existing Framer Motion/GSAP components.
- Design-token constraints: scope shell CSS to documentation; avoid changing animation colors globally.
- Performance constraints: catalogue does not mount every animation; code highlighting loads only on Code tab.
- Compatibility constraints: preserve routes and public component APIs; generate sources instead of custom webpack raw import interception.
- Test/screenshot expectations: lint, Jest, compiler-backed metadata checks, production build, Playwright route/behavior/mobile/scroll tests; capture desktop, Code and mobile screenshots.

## Open questions

- None blocking this scope. CLI distribution and additional framework/language variants require separate implementation before appearing in the UI.
