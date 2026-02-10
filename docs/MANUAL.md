# KJV Rightly Dividing — User & Developer Manual

Complete reference for using and maintaining the app.

---

## 1. Overview

**KJV Rightly Dividing** is a Next.js web app that:

- Accepts a **question** (input mode)
- **Routes** the question to one or more categories (Paul’s grace, Jesus’ teachings, Law/Israel, human traditions, Galatians warning, remnant, dispensation)
- **Returns** only KJV verses for those categories, with clear labels

All logic is client-side after load; no backend or API key is required for basic use.

---

## 2. Features

| Feature | Description |
|--------|-------------|
| Question input | Single textarea; submit with “Select verses” |
| Category routing | Trigger phrases in `verse-selector.ts` map questions to categories |
| Verse database | Curated KJV verses in `src/data/verses.ts` |
| Category labels | [Paul’s Grace], [Jesus’ Kingdom Offer], [Law/Israel], [Human Tradition vs Truth], [Galatians Warning], [Remnant], [Dispensation] |
| Red-letter tagging | Jesus’ words marked in data and UI |
| Responsive UI | Readable on desktop and mobile |

---

## 3. File structure

```
kjv_rd/
├── README.md              # Project overview, run instructions
├── CLAUDE.md              # AI/Claude context and rules
├── docs/
│   ├── QUICKSTART.md      # 5-minute setup
│   ├── TUTORIAL.md        # Step-by-step usage and extension
│   └── MANUAL.md          # This file
├── src/
│   ├── app/
│   │   ├── layout.tsx     # Root layout, metadata
│   │   ├── page.tsx       # Home: input + results
│   │   └── globals.css    # Tailwind, theme
│   ├── data/
│   │   └── verses.ts      # KJV verses by category
│   ├── lib/
│   │   └── verse-selector.ts  # Routing + verse selection
│   └── types/
│       └── verse.ts      # Verse, VerseCategory, CATEGORY_LABELS
├── .claude/
│   └── agents/           # Optional Claude Code sub-agents
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 4. Categories and theology

- **Paul’s Grace** — Romans–Philemon; salvation by grace through faith; no works for justification (Eph 2:8–9, Gal 2:16, 2:21).
- **Jesus’ Teachings** — Matthew–John (and early Acts); kingdom offer to Israel; red letters. For church today, Paul is our apostle (Rom 11:13, 1 Tim 2:7).
- **Moses’ Law** — OT law, sabbath, tithing, circumcision, etc. Shadow; we are not under law (Rom 6:14, Col 2:14–17).
- **Human Traditions** — Traditions of men vs Scripture (Mark 7:7–13, Col 2:8).
- **Galatians Warning** — Adding works to faith frustrates grace (Gal 1:6–9, 2:21, 5:1–4).
- **Remnant** — Few vs many (Rom 11:5, Matt 7:14).
- **Dispensation** — Paul’s stewardship of the mystery (1 Cor 3:10).

---

## 5. Commands

| Command | Purpose |
|--------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (Turbopack) at http://localhost:3000 |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

---

## 6. Customization

### Adding verses

Edit `src/data/verses.ts`. Each entry: `book`, `chapter`, `verse`, `text`, `category`. Optional: `redLetter: true`.

### Changing routing

Edit `src/lib/verse-selector.ts`:

- **CATEGORY_TRIGGERS** — Add/remove phrases per category.
- **selectCategoriesForQuestion()** — Add rules (e.g. always include `galatians-warning` for certain keywords).
- **getVersesForCategories()** — Change `limitPerCategory` (default 8).

### Styling

- **Colors** — `CATEGORY_STYLES` in `src/app/page.tsx` (Tailwind classes).
- **Global** — `src/app/globals.css` and `tailwind.config.ts`.

---

## 7. Deployment

- **Vercel:** Connect repo, build command `npm run build`, output Next.js.
- **Netlify:** Same; publish directory `.next` or use Next runtime.
- **Static export:** Not used by default (app uses client-side interactivity). For static, you’d need to adjust any server-only usage.

---

## 8. Claude Code (optional)

With [Claude Code](https://code.claude.com/docs) installed:

- Run `claude` in this repo. `CLAUDE.md` and `.claude/agents/*.md` give Claude the same categories and rules.
- Use for study or for generating more verses/categories; the app and CLI stay aligned.

---

## 9. License and attribution

- App code: per your repo license.
- KJV text: public domain. This app uses short quotations for study; add your own attribution if you distribute.

For quick setup see [QUICKSTART.md](QUICKSTART.md); for guided usage see [TUTORIAL.md](TUTORIAL.md).
