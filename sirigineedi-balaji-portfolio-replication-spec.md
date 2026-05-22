# Sirigineedi Balaji Portfolio Replication Spec

Source audited: https://sirigineedibalaji.vercel.app/

Purpose: use this document as a build brief for recreating the portfolio's visual system, page structure, interactions, CSS styling, scroll animation behavior, hover states, and responsive feel.

## 1. Overall Identity

The site is a premium editorial engineering portfolio. It combines:

- Large uppercase typography.
- Warm paper-like light mode.
- Deep near-black dark mode.
- Burnt orange and deep green accents.
- Thin grid backgrounds.
- Soft glass panels.
- Framer Motion style scroll reveals.
- Floating AI chat and theme controls.

The feel should be polished, technical, high-trust, and slightly cinematic without becoming flashy.

## 2. Recommended Stack

Use:

- Next.js or React.
- Tailwind CSS.
- Framer Motion for page/section/card animations.
- Lucide React icons.
- Next Image or optimized image components.
- Optional: Lenis or native smooth scrolling.

The original appears to be a Next.js app with Tailwind utility styling and motion-driven components.

## 3. Design Tokens

### Colors

```css
:root {
  --bg-light: #f5f1e8;
  --bg-light-soft: #eae6dc;
  --bg-dark: #0c0c0c;
  --text-dark: #18181b;
  --text-light: #f5f1e8;
  --muted-light: #71717b;
  --muted-dark: #a1a1aa;
  --orange: #c2410c;
  --orange-bright: #ea580c;
  --green: #1f3a2e;
  --green-soft: #3a9476;
  --emerald: #00bb7f;
}
```

### Typography

Use DM Sans or a close geometric sans for main text.

Use Geist Mono or similar mono for labels, metadata, counters, and tiny uppercase UI.

Core typography patterns:

```css
.eyebrow {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.hero-title {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 0.88;
  font-size: clamp(2.8rem, 11vw, 7rem);
}

.page-title {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 0.9;
  font-size: clamp(3.5rem, 15vw, 8.5rem);
}

.section-title {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.04em;
  line-height: 0.95;
  font-size: clamp(3rem, 8vw, 6rem);
}
```

## 4. Global Layout

### Body

```css
body {
  background: var(--bg-light);
  color: var(--text-dark);
  overflow-x: clip;
  font-family: var(--font-sans);
}

html.dark body {
  background: var(--bg-dark);
  color: var(--text-light);
}

html {
  scroll-behavior: smooth;
}
```

### Theme Transition

All major containers should transition smoothly on theme change:

```css
.theme-transition {
  transition:
    background-color 500ms cubic-bezier(.4, 0, .2, 1),
    color 500ms cubic-bezier(.4, 0, .2, 1),
    border-color 500ms cubic-bezier(.4, 0, .2, 1),
    fill 500ms cubic-bezier(.4, 0, .2, 1),
    stroke 500ms cubic-bezier(.4, 0, .2, 1);
}
```

## 5. Navigation

Fixed nav at top.

Observed dimensions:

- Height: about 80px.
- Width: 100%.
- Position: fixed top 0.
- z-index: about 60.
- Background: cream or black at 80% opacity.
- Backdrop blur: about 12px.
- Bottom border transparent/light in light mode, subtle zinc border in dark mode.

Structure:

- Left logo: `BALAJI.`
- Center nav links: ABOUT, JOURNEY, SKILLS, PROJECTS, BLOGS, CONTACT.
- Right label: `LIGHT` or `DARK`.
- Theme toggle pill.
- Mobile: hidden desktop nav, hamburger circular button.

CSS behavior:

```css
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 60;
  background: rgb(245 241 232 / 0.8);
  backdrop-filter: blur(12px);
  transition: background-color 500ms, border-color 500ms, color 500ms;
}

.dark .nav {
  background: rgb(12 12 12 / 0.8);
  border-bottom: 1px solid rgb(39 39 42 / 0.5);
}

.nav-link {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgb(82 82 91);
  transition: color 150ms cubic-bezier(.4, 0, .2, 1);
}

.nav-link:hover {
  color: #18181b;
}

.dark .nav-link:hover {
  color: #f5f1e8;
}

.nav-link.active {
  color: #c2410c;
}
```

## 6. Floating Controls

### Left Theme Button

Small fixed circular button near bottom-left.

- Size: about 44px.
- Position: bottom-left.
- White/cream surface in light mode.
- Dark surface in dark mode.
- Transition: background, color, transform, shadow.
- Active click scale: about 0.95.

### AI Chat Button

Fixed bottom-right.

- Size: 56px.
- Rounded-full.
- Light mode: black background, white icon/text.
- Dark mode: off-white background, black icon/text.
- Box shadow: soft large shadow.
- Border: subtle.
- Notification dot: orange at top-right.
- Accessible label: `Ask Balaji's AI! ✨`.

```css
.chat-button {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  background: #18181b;
  color: white;
  box-shadow: 0 8px 30px rgb(0 0 0 / 0.12);
  transition: transform 200ms, box-shadow 300ms, background 300ms;
  z-index: 100;
}

.chat-button:hover {
  transform: translateY(-2px) scale(1.04);
}

.chat-button::after {
  content: "";
  position: absolute;
  top: 4px;
  right: 4px;
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background: #ea580c;
}
```

## 7. Background System

Use subtle layered backgrounds:

1. Cream/dark base.
2. Thin square grid.
3. Optional very low opacity radial dots/noise.
4. Soft ambient glows at low opacity.

```css
.paper-grid {
  background-image:
    linear-gradient(to right, #80808008 1px, transparent 1px),
    linear-gradient(to bottom, #80808008 1px, transparent 1px);
  background-size: 88px 88px;
}

.dot-grid {
  background-image: radial-gradient(#000 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.03;
}

.dark .dot-grid {
  opacity: 0.035;
}
```

## 8. Core Motion System

Use Framer Motion variants.

### Section Reveal

```js
export const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
```

### Card Reveal

```js
export const cardReveal = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: i => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};
```

### Timeline Reveal

```js
export const timelineReveal = side => ({
  hidden: {
    opacity: 0,
    x: side === "left" ? -50 : 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});
```

### Viewport Config

```jsx
viewport={{ once: true, amount: 0.2 }}
```

Use this for most sections and cards.

## 9. CSS Keyframes

```css
@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
```

Utility classes:

```css
.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, .2, 1) infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out both;
}

.animate-spin-slow {
  animation: spin 10s linear infinite;
}
```

## 10. Home Page

Approximate route: `/`

Total page height observed: about 17,086px.

### Hero Section

Section id: `about`

Approximate height: 1117px.

Layout:

- Full viewport minimum height.
- Fixed nav over top.
- Left column content.
- Right column portrait card.
- Bottom marquee strip.
- Background grid and subtle texture layers.

Hero content:

- Top meta line: `FULL-STACK ENGINEER & AI SYSTEMS ARCHITECT`.
- Huge H1:
  - `SIRIGINEEDI`
  - `BALAJI.`
- `SIRIGINEEDI`: black uppercase sans.
- `BALAJI`: italic serif-like deep green.
- Dot after name: burnt orange.
- Pills:
  - `FULL STACK`
  - `AI SYSTEMS`
  - `BACKEND ARCHITECTURE`
- Paragraph:
  - `Building high-performance systems and AI products — engineered with precision, designed for scale, shipped with care.`
- Status line:
  - green live dot
  - `NOW / SHIPPING PRODUCTION AT SCALE`
- Stats:
  - `6+ Projects Delivered`
  - `3+ Years Experience`
  - `100% Client Satisfaction`
- CTAs:
  - Primary: `LET'S WORK TOGETHER` / `START A PROJECT`
  - Secondary: `VIEW SELECTED WORK`

Hero title styling:

```css
.home-hero-title {
  font-size: clamp(2.8rem, 11vw, 7rem);
  line-height: 0.88;
  letter-spacing: -0.03em;
  font-weight: 900;
  text-transform: uppercase;
}

.hero-first-name {
  color: #18181b;
}

.hero-last-name {
  color: #1f3a2e;
  font-style: italic;
  font-family: Georgia, "Times New Roman", serif;
}

.hero-dot {
  display: inline-block;
  width: 0.28em;
  height: 0.28em;
  border-radius: 9999px;
  background: #c2410c;
}
```

### Hero CTA Hover

Primary CTA has text-swap and shimmer.

Implementation idea:

```jsx
<a className="group relative overflow-hidden rounded-full primary-cta">
  <span className="relative z-10 block overflow-hidden h-[1.2em]">
    <span className="block transition-transform duration-300 group-hover:-translate-y-full">
      LET'S WORK TOGETHER
    </span>
    <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
      START A PROJECT
    </span>
  </span>
  <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
</a>
```

### Portrait Card

Observed image:

- `/profile (1).png`
- Rendered through Next Image.
- Natural size: about 460x600.
- Alt: `Portrait of Sirigineedi Balaji — Full-Stack Engineer`.

Card:

- Width about 419px.
- Height about 504px.
- Rounded `clamp(24px, 3vw, 40px)`.
- White translucent vertical gradient.
- Border: white/black subtle.
- Bottom status bar:
  - `S. BALAJI`
  - `FULL-STACK ENGINEER`
  - `IN · LIVE`
  - backdrop blur 24px.

### Marquee

Text sequence:

`DESIGN / DEVELOP / DISCOVER / DEPLOY / SHIP`

Repeat enough times to fill a very wide row.

Use horizontal transform animation or Framer Motion `useScroll` mapping.

```css
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

Use large uppercase text, mono or bold sans, very low opacity in background.

## 11. Home About Section

Section id: `about-home`

Approximate height: 3031px.

Content:

- Eyebrow: `MY NARRATIVE`
- Title: `ABOUT ME.`
- Paragraphs about full-stack developer, mechanical engineering, Brihaspathi Technologies, AI-integrated apps.
- Button: `LEARN THE FULL STORY`.
- Feature cards:
  - `AI INTEGRATION`
  - `SCALABLE ARCHITECTURE`
  - `AWARDED IMPACT`

Cards:

```css
.feature-card {
  padding: 2rem;
  border-radius: 1.5rem;
  border: 1px solid rgb(0 0 0 / 0.05);
  background: rgb(31 58 46 / 0.05);
  display: flex;
  gap: 1.5rem;
  transition: transform 150ms cubic-bezier(.4, 0, .2, 1);
}

.feature-card:hover {
  transform: translateY(-4px);
}
```

Feature cards reveal from right:

```js
initial={{ opacity: 0, x: 20 }}
whileInView={{ opacity: 1, x: 0 }}
```

## 12. Timeline Section

Home includes timeline under heading:

`MY EDUCATION AND WORK EXPERIENCE`

Timeline items:

1. `DEC 2023 – PRESENT` / `Full Stack Developer` / `BRIHASPATHI TECHNOLOGIES`
2. `ELECTION PERIOD` / `Head District Coordinator` / `AP MLC ELECTIONS · VISAKHAPATNAM`
3. `ELECTION PERIOD` / `District Coordinator` / `AP STATE ELECTIONS · WEST GODAVARI`
4. `2023 – 2024` / `Junior Software Developer` / `BRIHASPATHI TECHNOLOGIES`
5. `CLASS OF 2023` / `B.Tech – Mechanical Engineering`
6. `CLASS OF 2019` / `Diploma – Mechanical Engineering`

Visual behavior:

- Alternating left/right flex rows.
- Center vertical timeline line.
- Circular icon nodes about 56px.
- Nodes have shadow, colored orange or zinc.
- Node hover: scale 1.1 over 300ms.
- Items reveal from left or right with opacity 0, x +/-50, scale 0.9.

## 13. Skills Page

Route: `/skills`

Observed height: about 3661px.

Hero:

- H1: `MY SKILLS.`
- Paragraph: `A carefully curated stack refined through 2.5+ years...`
- Huge uppercase text, line-height 0.82.

### Horizontal Panels

Six panels:

1. `LANGUAGES`
2. `BACKEND & APIS`
3. `FRONTEND & UI`
4. `AI / AUTOMATION`
5. `DATABASES`
6. `CLOUD & DEVOPS`

Panel dimensions:

- Desktop width: 360-400px.
- Height: 480px.
- Rounded: `3rem`.
- Padding: 40px.
- Flex column, justify-between.

```css
.skill-panel {
  flex-shrink: 0;
  width: 400px;
  height: 480px;
  border-radius: 3rem;
  padding: 2.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

Use horizontal scroll or scroll-driven x transform.

### Tabs

Tabs:

- `SKILLS`
- `PROJECTS`
- `ACHIEVEMENTS`

Active:

- Dark filled in light mode.
- Cream filled in dark mode.
- Text inverted.

Inactive:

- White/dark translucent.
- Border.
- Hover slightly brighter.

Transition duration: about 400ms.

### Category Pills

Categories:

- Languages, 3 skills.
- Backend & APIs, 5 skills.
- Frontend & UI, 5 skills.
- AI / Automation, 5 skills.
- Databases, 3 skills.
- Cloud & DevOps, 5 skills.

Active:

- Scale 1.02.
- White/dark background.
- Strong shadow.
- Left border accent.

Inactive:

- Opacity 0.4.
- Hover opacity 1.
- Hover border visible.

```css
.category-pill {
  width: 100%;
  padding: 1.25rem;
  border-radius: 1rem;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 400ms cubic-bezier(.4, 0, .2, 1);
}

.category-pill.active {
  transform: scale(1.02);
  border-left: 4px solid #ea580c;
  box-shadow: 0 20px 40px rgb(0 0 0 / 0.08);
}

.category-pill:not(.active) {
  opacity: 0.4;
}

.category-pill:not(.active):hover {
  opacity: 1;
}
```

### Skill Cards

Each card:

- Rounded `2xl`.
- White/dark panel.
- Border zinc.
- Hover border orange.
- Hover lift.
- Displays mastery percent, skill name, tags.

```css
.skill-card {
  position: relative;
  padding: 1.5rem;
  border-radius: 1rem;
  background: white;
  border: 1px solid #f4f4f5;
  transition: all 300ms cubic-bezier(.4, 0, .2, 1);
}

.skill-card:hover {
  transform: translateY(-4px);
  border-color: rgb(234 88 12 / 0.4);
  box-shadow: 0 18px 50px rgb(0 0 0 / 0.08);
}
```

## 14. Projects Page

Route: `/projects`

Observed height: about 5607px.

Hero title:

`ALL PROJECTS & DEPLOYMENTS`

Description:

`A comprehensive catalogue of 16 engineered systems spanning AI/ML platforms, government surveillance infrastructure, SaaS APIs, and full-stack web ecosystems — built and deployed at Brihaspathi Technologies.`

Stats:

- `16` total projects.
- `12` in production.
- `4` AI-powered.
- `4` GovTech.

Controls:

- Search input placeholder: `Search projects or tech...`
- Filter pills:
  - `ALL`
  - `AI & ML`
  - `GOVTECH`
  - `SAAS & APIS`
  - `WEB PLATFORMS`
  - `COMPUTER VISION`

### Project Card

Desktop layout: 3-column grid.

Card contents:

- Status pill: `Production`, `Deployed`, or `Live`.
- Year: `2024`, `2023`, etc.
- Title.
- Subtitle/domain.
- Description.
- Metrics.
- Tech stack chips.
- CTA: `EXAMINE ARCHITECTURE`.

Card style:

```css
.project-card {
  position: relative;
  border-radius: 2rem;
  background: rgb(255 255 255 / 0.75);
  border: 1px solid rgb(24 24 27 / 0.08);
  padding: 1.5rem;
  overflow: hidden;
  transition: transform 300ms, border-color 300ms, box-shadow 300ms;
}

.dark .project-card {
  background: rgb(24 24 27 / 0.55);
  border-color: rgb(255 255 255 / 0.08);
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: rgb(234 88 12 / 0.4);
  box-shadow: 0 24px 60px rgb(0 0 0 / 0.1);
}

.project-card h3 {
  transition: color 300ms;
}

.project-card:hover h3 {
  color: #52525b;
}
```

Project titles to include:

1. AI Secure File Management
2. Cognitive Visitor Management
3. GovTech Surveillance Network
4. GenAI Conversational Platform
5. SheetPilot SaaS Platform
6. Omega AI Task Platform
7. Trinai.ai Platform
8. Akshara Degree College Portal
9. Brihaspathi Query Bot
10. Multi-Brand Web Ecosystem
11. NEET Exam Surveillance
12. AP MLC Elections Command Hub
13. PWD Maharashtra Monitoring Portal
14. Brihaspathi Technologies Brand Portal
15. SkyVolts Solar Platform
16. AP Solar Onboarding Portal

## 15. About Route

Route: `/about`

Observed height: about 3862px.

Sections:

- Hero: `ABOUT BALAJI.`
- `THE VISION.`
- `PRESENCE & IMPACT.`
- `TRAJECTORY.`
- `THE DOSSIER.`

Hero paragraph:

`I translate complex mechanical principles into efficient, high-performance digital solutions.`

CTA:

`GET IN TOUCH`

CTA style:

- Padding: `px-10 py-5`.
- Rounded: `2xl`.
- Black background in light mode.
- Orange in dark mode.
- Hover scale: 1.05.
- Large shadow.

### Presence Cards

Three vertical image cards:

- `PROFESSIONAL WORKSPACE`
- `SYSTEM RESEARCH`
- `ENGINEERING MILESTONE`

Use group hover:

- Image/card shadow increases.
- Overlay or label becomes more prominent.
- Slight image scale possible: 1.04.

### Trajectory Cards

Each card:

- Rounded `2rem`.
- Border.
- Padding: 40px.
- Flex row on desktop.
- Hover: background becomes white/dark subtle.

Items:

- `2023 - PRESENT` / `JR. SOFTWARE DEVELOPER` / `Brihaspathi Technologies`
- `2023 - 2024` / `DISTRICT COORDINATOR` / `AP State Elections`
- `2023` / `B.TECH GRADUATION` / `Swarnandhra College`

### Dossier Cards

Document cards:

- `GENERAL RESUME`
- `WIPRO SPECIAL RESUME`
- `NEXT CHAPTER`

Hover behavior:

```css
.doc-overlay {
  position: absolute;
  inset: 0;
  background: rgb(24 24 27 / 0.9);
  opacity: 0;
  backdrop-filter: blur(4px);
  transition: opacity 300ms ease;
}

.group:hover .doc-overlay {
  opacity: 1;
}

.doc-open {
  background: white;
  color: #18181b;
  transition: background-color 200ms, color 200ms;
}

.doc-open:hover {
  background: #ea580c;
  color: white;
}
```

Resume links observed:

- `/Balaji_S_resume_may2025%20(2).pdf`
- `/Balaji_Wipro_Final.docx`

## 16. Journey Route

Route: `/journey`

Observed height: about 4908px.

Hero:

`A PATH OF CONTINUOUS EVOLUTION`

Description:

`A high-precision visual timeline tracing the transition from Mechanical Engineering to building large-scale GovTech surveillance, advanced enterprise systems, and next-gen AI applications.`

Stats cards:

- Years experience.
- Projects shipped.
- Tech stacks.
- Domains mastered.

Cards:

- Rounded `2xl`.
- White/dark translucent background.
- Border.
- Backdrop blur.
- Hover should lift and sharpen border.

Timeline:

- Large vertical story.
- Items spaced generously.
- Animated counters may start at 0 and count up on view.
- Use scroll reveals and/or scroll progress line.

Bottom CTA:

`LET'S BUILD THE NEXT TECHNICAL MILESTONE`

Buttons:

- `START A PROJECT`
- `VIEW WORK`

## 17. Blog Route

Route: `/blog`

Observed height: about 2882px.

Hero:

`MY BLOGS`

Controls:

- Category/filter button: `ALL INSIGHTS(0)`.
- Sort control: `Newest First`, `Oldest First`.
- Search input: `Search articles...`.

Empty state:

- `NO INSIGHTS FOUND`
- Message explaining no articles match.
- Button: `CLEAR FILTERS`

Newsletter:

- Title: `STAY AHEAD OF THE CURVE`
- Paragraph about premium executive briefs, system design architectures, engineering articles.
- Email input.
- Button: `SUBSCRIBE`.
- Fine print: `NO SPAM. UNSUBSCRIBE ANYTIME.`

Keep the empty state premium: centered, rounded panel, subtle border, strong uppercase title.

## 18. Contact Route

Route: `/contact`

Observed height: about 2511px.

Hero:

`LET'S BUILD SOMETHING GREAT.`

Contact cards:

1. `EMAIL ME`
   - `sirigineedibalaji4@gmail.com`
   - Link: `mailto:sirigineedibalaji4@gmail.com`
2. `CALL OR WHATSAPP`
   - `+91 95533 39219`
   - Link: `tel:+919553339219`
3. `LOCATION`
   - `Hyderabad, Telangana, India`
   - Link to Google Maps.
4. `FOLLOW & MESSAGE`
   - LinkedIn.
   - GitHub.

Form:

- Title: `Send a Message`
- Name placeholder: `John Doe`
- Email placeholder: `john@example.com`
- Mobile placeholder: `+91 98765 43210`
- Message placeholder: `Tell me about your project, idea, or role opportunity...`
- Submit: `SUBMIT MESSAGE`

Input styling:

```css
.field {
  width: 100%;
  border-radius: 1rem;
  border: 1px solid rgb(24 24 27 / 0.1);
  background: rgb(255 255 255 / 0.65);
  padding: 1rem 1.25rem;
  transition: border-color 200ms, box-shadow 200ms, background-color 200ms;
}

.field:focus {
  outline: none;
  border-color: rgb(234 88 12 / 0.55);
  box-shadow: 0 0 0 4px rgb(234 88 12 / 0.10);
}
```

## 19. Footer

Footer appears on all routes.

Content:

- Short description:
  - `Full-Stack Engineer & AI Systems Architect building high-performance web applications and enterprise automation solutions.`
- Social buttons:
  - GitHub Profile
  - LinkedIn Profile
  - Send Email
- Navigation:
  - About
  - Skills
  - Projects
  - Blog
- Contact:
  - email
  - phone

Social button hover:

```css
.social-button {
  padding: 0.75rem;
  border-radius: 1rem;
  background: rgb(24 24 27 / 0.05);
  border: 1px solid rgb(24 24 27 / 0.1);
  transition: all 300ms cubic-bezier(.4, 0, .2, 1);
}

.social-button:hover {
  transform: translateY(-4px);
  color: #ea580c;
  border-color: rgb(234 88 12 / 0.4);
}
```

## 20. Hover State Checklist

Implement these hover behaviors:

- Nav links: color transition.
- Blog nav link: orange active, hover opacity 0.8.
- Primary CTA: text slides vertically, arrow moves up-right, shimmer sweep.
- Secondary CTA: arrow moves right/up and opacity increases.
- Feature cards: lift `-4px`.
- Timeline nodes: scale `1.1`.
- Skill category pills: opacity 0.4 to 1, active scale 1.02.
- Skill cards: lift, orange border, stronger shadow.
- Project cards: lift, border orange, title color softens, shadow increases.
- Dossier cards: dark overlay fades in, open button changes orange.
- Contact cards: lift and border accent.
- Social buttons: lift and color accent.
- Floating chat: small lift/scale.

## 21. Responsive Rules

Desktop:

- Max content width: around 1280px.
- Hero: two-column layout.
- Project cards: 3 columns.
- Footer: 3-4 columns.

Tablet:

- Hero can remain two-column but image shrinks.
- Project cards: 2 columns.
- Timeline spacing reduced.

Mobile:

- Nav collapses into logo, theme button, menu button.
- Hero becomes single-column.
- H1 remains huge but uses clamp.
- CTAs stack full width.
- Project cards: 1 column.
- Skills horizontal panels should be horizontally scrollable.
- Footer stacks.

Use:

```css
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-button {
    display: flex;
  }

  .hero-layout {
    grid-template-columns: 1fr;
  }
}
```

## 22. Assets

Observed image assets:

- `/profile (1).png`
- Award/presence images:
  - `/WhatsApp Image 2026-05-18 at 10.09.18 PM.jpeg`
  - `/WhatsApp Image 2026-05-18 at 10.12.38 PM.jpeg`
  - `/WhatsApp Image 2026-05-18 at 10.15.33 PM.jpeg`
- Resume files:
  - `/Balaji_S_resume_may2025 (2).pdf`
  - `/Balaji_Wipro_Final.docx`

Tech icons come from Devicon, vectorlogo.zone, and some inline base64 icons.

Common icons:

- React
- Node.js
- Python
- MongoDB
- Next.js
- Django
- PostgreSQL
- Tailwind CSS
- JavaScript
- TypeScript
- Express.js
- Keycloak
- Payload
- Supabase
- Pinecone
- OpenAI
- Git
- Linux
- GCP
- Postman

## 23. Implementation Priorities

To recreate the portfolio convincingly, prioritize in this order:

1. Global theme, nav, footer, floating buttons.
2. Home hero with exact editorial typography and portrait card.
3. Scroll reveal system.
4. CTA hover text-swap and shimmer.
5. Skills horizontal panels and tab/category interactions.
6. Project search/filter UI and card grid.
7. About dossier hover overlays.
8. Journey timeline and counters.
9. Blog empty state/newsletter.
10. Contact cards and form polish.

## 24. Minimal Component Map

Create these components:

- `Navbar`
- `ThemeToggle`
- `FloatingThemeButton`
- `ChatButton`
- `Footer`
- `SectionEyebrow`
- `HeroTitle`
- `PrimaryCTA`
- `SecondaryCTA`
- `GlassPill`
- `PortraitCard`
- `MarqueeStrip`
- `Reveal`
- `FeatureCard`
- `Timeline`
- `TimelineItem`
- `SkillPanel`
- `SkillTabs`
- `CategoryPill`
- `SkillCard`
- `ProjectFilters`
- `ProjectCard`
- `DossierCard`
- `ContactCard`
- `ContactForm`
- `NewsletterPanel`

## 25. Framer Motion Example Wrapper

```jsx
import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
```

## 26. Final Quality Bar

The recreation should feel correct when:

- The first viewport immediately shows a premium cream editorial hero.
- The nav feels fixed, light, blurred, and precise.
- The hero typography dominates the page.
- Scrolling reveals content smoothly without abrupt jumps.
- Hovering almost anything produces a subtle response.
- Dark mode feels equally designed, not inverted as an afterthought.
- Project/skill cards feel production-grade and interactive.
- The portfolio feels like an engineered product, not a static resume.

