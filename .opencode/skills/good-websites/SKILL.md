---
name: good-websites
description: A 7-level progressive framework for guiding AI to create high-quality, non-generic front-end designs using Claude Code. Moves from vague prompts through reference gathering, code deconstruction, custom assets, visual iteration, to polished production sites.
origin: custom
---

# Good Websites — 7-Level Front-End Design Framework

AI-generated front-end design fails not because AI lacks taste, but because the human cannot articulate what "good" looks like. This framework provides a progressive path from generic output to crafted, distinctive designs.

## Core Principle

> AI is a skilled pair of hands with no opinion. You are the creative director. The more you can see, deconstruct, and articulate, the better the output.

## When to Activate

- Building a landing page, dashboard, or any front-end from scratch
- Claude Code output looks generic, template-like, or "AI slop"
- You want a distinctive design rather than another SaaS template
- Iterating on an existing site to give it character and polish

---

## The 7 Levels

### Level 1: The Prompt (Where Everyone Starts)

**What happens:** You type a vague prompt like "create a landing page for my app" and get generic output.

**Why it fails:** No design direction, no visual vocabulary, no constraints. AI fills the gaps with its most common patterns — purple gradients, centered hero, three feature cards, footer.

**What to do:**
- Be specific about purpose, audience, and desired outcome
- Answer every question Claude Code's plan mode asks (framework, sections, style)
- Begin building a design vocabulary by asking what frameworks and styles mean
- Accept that Level 1 output will be bad — that's the baseline

**Trap:** Staying here forever. Generic output is the default.

---

### Level 2: Skills (Design Education)

**What happens:** You load specialized prompt skills (like `uiux-pro-max` or `frontend-design`) that inject design checklists and anti-patterns into Claude Code's context.

**Why it works:** Skills teach Claude Code things you might not know how to articulate — color theory, typography rules, spacing principles, and common "AI slop" patterns to avoid.

**What to do:**
- Load a UI/UX skill before starting design work
- Let the skill guide Claude Code through design decisions
- Use skills as a learning tool — read what they say to build your own taste
- Specify concrete choices (e.g., "use orange as the CTA color, not purple")

**Trap:** Still looks AI-generated. Skills add polish but not distinctiveness. You're designing an AI template instead of your own thing.

---

### Level 3: Visual Director (Show, Don't Tell)

**What happens:** You find websites you like, take screenshots, and show them to Claude Code as visual references.

**Why it works:** Images bypass the translation loss of describing visuals in text. Claude Code can mimic patterns it sees much better than patterns you describe.

**Where to find references:**
- **Awwwards** (awwwards.com) — curated, award-level front-end work
- **Godly Website** (godly.website) — infinite scroll of high-quality designs
- **Pinterest** — great for SAS landing pages and mood boards
- **Dribbble** (dribbble.com) — designer community, great for patterns and micro-interactions

**What to do:**
- Collect 3-5 screenshots of sites you admire (not just one)
- Combine elements from different sites (e.g., the hero from one, the card layout from another)
- Tell Claude Code: "I want the visual style to move toward these references"
- Drop screenshots directly into the chat along with your prompt

**Trap:** The "vibe gap." Claude Code gets ~50% there. Screenshot-to-code translation has limits. You'll end up in an endless loop of "screenshot → prompt → not quite right → another screenshot."

---

### Level 4: The Cloner (Learn by Deconstructing)

**What happens:** Instead of showing screenshots, you give Claude Code the actual HTML, CSS, and JavaScript of a reference site and ask it to clone it.

**Why it works:** You're no longer relying on visual approximation. You're feeding Claude Code the exact code that produces the effect you want. You also learn the vocabulary and techniques behind professional designs.

**How to deconstruct a site:**
1. Open the reference site in your browser
2. Press `Ctrl+U` to view the source HTML
3. Copy the entire HTML
4. Find the `<link>` and `<script>` tags at the bottom for CSS/JS URLs
5. Give Claude Code: the HTML + the CSS/JS URLs + instruction to study them
6. Use a site-deconstruction skill to ensure Claude Code reads the full CSS/JS (web fetch alone often summarizes and loses detail)

**What to do:**
- Ask Claude Code questions as it analyzes the code: "How did they do this background?" "What is a GPU transform?" "How does this scroll animation work?"
- Use the cloned code as a foundation, then adapt it to your project
- Clone multiple sites to build a mental library of techniques
- Put your own spin on everything — you're learning, not plagiarizing

**Trap:** The "clone ceiling." You can copy but not create. You need to understand the *why* behind techniques, not just replicate them.

---

### Level 5: Original Creator (Add Your Identity)

**What happens:** You stop copying and start creating. You integrate custom components, AI-generated art, video backgrounds, and other original elements.

**Component sources:**
- **shadcn.dev** — high-quality React component prompts you can copy and paste
- **CodePen** — creative, experimental components
- **Motion.primevue.org** — animation patterns
- **Monaco** — UI component inspiration

**Custom asset creation:**
- Use MidJourney, DALL-E, or similar to generate hero images and artwork
- Use Kling 3.0 or Veo 3.1 to animate still images into subtle looping videos
- Generate images that tell a story about your product (not random stock photos)

**What to do:**
- Create a tagline and visual concept that ties to your product's identity
- Generate a custom hero image and use it as the background
- Replace generic component libraries with ones you've customized or sourced from shadcn.dev
- Add subtle motion — a slowly moving background, a parallax effect, a counter animation
- Approach every section (not just the hero) with the same creative intent

**Trap:** Going too far with motion or effects. Subtlety is key. The best animations are noticed subconsciously, not loudly.

---

### Level 6: Visual Tinkerer (Craft the Details)

**What happens:** You use external visual design tools to ideate and refine, then bring those designs back to Claude Code for implementation.

**Visual tools:**
- **Stitch** (stitch.google.com) — Google's AI-powered visual canvas, free, great for redesigns
- **Pencil.dev** — real-time visual editing, integrates with VS Code/Cursor
- **Figma** — industry-standard for detailed design work
- **Paper.design** — design-first web prototyping

**What to do:**
- Take screenshots of your current site and feed them to Stitch with a redesign prompt
- Iterate on the visual output — request variants, change layouts, adjust colors
- Copy the refined design and bring it back to Claude Code with: "What do you think of this glassmorphism effect? Let's implement it."
- Add premium micro-details: custom loading states, scroll-triggered animations, ticker bars, custom scrollbars, lighting effects on hover, glassmorphism cards with depth
- Use Google Fonts to find distinctive typography
- Run web searches for best practices on specific effects you want
- Iterate, iterate, iterate — this is a craft, not a one-shot prompt

**Trap:** Over-relying on tools without developing your own eye. The tools accelerate iteration, but *you* must decide what's good.

---

### Level 7: The Architect (3D & Immersive Experiences)

**What happens:** Custom WebGL, shaders, Three.js, game-like 3D websites. The frontier of front-end design.

**Reality check:** This is currently beyond what most people (including AI) can reliably produce. It requires specialized skills, often a team of designers and developers.

**Why it's included:** To show what's possible. Sites like igloo.so demonstrate the ceiling of what front-end design can be.

**What to do:**
- Explore Awwwards "Site of the Day" and "Site of the Month" for inspiration
- Study what's possible even if you can't replicate it yet
- This level may become accessible via AI in future years

---

## The Progression Path

```
Level 1 → Level 2 → Level 3 → Level 4 → Level 5 → Level 6 → Level 7
  ↓          ↓          ↓          ↓          ↓          ↓          ↓
 Prompt   Skills    Screenshots    Code     Original   Polish     3D/Immersive
 generic  template  vibe-gap     deconstruct custom    details    frontier
          AI look   solved       learn     identity
```

## How to Use This Skill

When asked to design a front-end, follow this workflow:

1. **Diagnose the current level** — What has the user already tried? What does the output look like?
2. **Recommend the next level** — Don't skip ahead. Each level builds on the previous one.
3. **Guide the user through the transition** — Explain *why* the next level is needed and *how* to do it.
4. **Build taste progressively** — The goal isn't a single perfect prompt. It's helping the user develop the ability to recognize and articulate good design.

### Conversation Prompts by Level

**Level 1 → 2:** "The output looks generic because we haven't given Claude Code a design framework. Let me load a UI/UX skill that will teach it about color theory, typography, and common AI design anti-patterns."

**Level 2 → 3:** "This looks better but still feels like an AI template. The next step is to show Claude Code what we actually want. Let's find reference websites and show it screenshots."

**Level 3 → 4:** "Claude Code gets close but not exact. The problem is translating images to code has a limit. Let's go deeper — I'll give it the actual HTML and CSS of the reference site so it can see exactly how the effect is built."

**Level 4 → 5:** "Now we can clone professional designs accurately. But we don't want to be clones. Let's add original elements — custom imagery, unique components, and visual storytelling that reflects your product's identity."

**Level 5 → 6:** "The site has character now, but the details need polish. Let's use a visual design tool to refine the layout and add premium micro-interactions — loading states, hover effects, custom typography, glassmorphism."

**Level 6 → 7:** "The site is polished and distinctive. If you want to push into 3D and immersive experiences, that's a whole new domain. I can show you examples of what's possible at that level."

## Common Anti-Patterns to Avoid

- **Purple gradient everything** — AI's default aesthetic. Actively choose different color palettes.
- **Centered hero with three feature cards** — The universal SaaS template. Break this pattern.
- **Endless screenshot iteration** — If screenshots aren't working, try deconstructing the actual code.
- **Blindly accepting all Claude Code output** — You are the creative director. Review every change.
- **Skipping levels** — Each level builds vocabulary and skills. Skipping means staying stuck.
- **No visual identity** — Every site should tell a story about the product through its design choices.

## Key Design Vocabulary to Build

Help the user learn these terms over time:

- **Typography** — Font choices, hierarchy, pairing serif with sans-serif
- **Whitespace / Negative space** — Breathing room between elements
- **Glassmorphism** — Frosted glass effect with backdrop-filter
- **Micro-interactions** — Small animations on hover, scroll, or load
- **Visual hierarchy** — Guiding the eye through size, color, and spacing
- **Color theory** — Complementary colors, contrast, mood through palette
- **Parallax** — Layers moving at different speeds on scroll
- **GPU transforms** — Hardware-accelerated animations (translate, scale, rotate)
- **Scroll-triggered animations** — Elements that animate when they enter the viewport
- **Loading states** — Skeleton screens, staggered animations, hesitation effects
