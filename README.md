# KJV Rightly Dividing

A Next.js app for KJV Bible study that **rightly divides** (2 Tim 2:15) between:

- **Moses' law** / Israel's religious rites / elders' traditions  
- **Jesus's life-giving teaching** (kingdom offer to Israel)  
- **Paul's grace gospel** (post-cross, dispensation of grace for the Body of Christ)

Inspired by the agent-based workflow in [this video](https://youtu.be/GL3LXWBZfy0) (1-person “unicorn” dev with Claude Code sub-agents): the app implements a **verse-selector** that routes your question to the right categories and returns only KJV verses with clear labels.

## How it works

1. **Input mode** — You ask a question (e.g. “How are we saved today?”, “Should Christians tithe?”, “What did Jesus say about forgiveness?”).
2. **Verse selector** — The app routes the question to the appropriate categories using trigger phrases (like sub-agent descriptions): Paul’s grace, Jesus’ teachings, Moses’ law, human traditions, Galatians warning, remnant, dispensation.
3. **Results** — Verses are shown grouped by category, with labels: [Paul’s Grace], [Jesus’ Kingdom Offer], [Law/Israel], [Human Tradition vs Truth], [Galatians Warning], etc. All verses are KJV only.

## Docs

- **[Quick Start](docs/QUICKSTART.md)** — Get running in 5 minutes
- **[Tutorial](docs/TUTORIAL.md)** — Step-by-step usage and how to add verses
- **[Manual](docs/MANUAL.md)** — Full reference (features, file structure, deployment)
- **[Ads & copy](docs/ads/)** — Ready-to-use text for Facebook, Instagram, Threads, Blogger, Naver Blog, Tistory, WordPress, newsletter, and email

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), type a question, and click **Select verses**.

## Project structure

| Path | Purpose |
|------|--------|
| `src/app/page.tsx` | Question input + results UI |
| `src/lib/verse-selector.ts` | Question → categories → verses (orchestration) |
| `src/data/verses.ts` | Curated KJV verses by category |
| `src/types/verse.ts` | Verse and category types |
| `.claude/agents/*.md` | Sub-agent definitions for Claude Code CLI (optional) |
| `CLAUDE.md` | Project context and rules for AI / Claude Code |

## Guidelines (built into the app and CLAUDE.md)

- **KJV only** — All displayed verses are from the King James Version.
- **Law vs grace** — Moses’ law (including sabbath, tithing, circumcision, water baptism as command) is distinguished from Paul’s grace gospel; Gal 2:21 is the guiding verse.
- **Jesus vs Paul** — Jesus’ earthly ministry is to Israel under the law; for the church today, Paul is the apostle of the Gentiles (Rom 11:13, 1 Tim 2:7).
- **Traditions vs truth** — Human traditions and religious majority are contrasted with the truth (e.g. Mark 7:7–13, Col 2:8).
- **Remnant** — The app can surface verses about the few vs the many (e.g. Rom 11:5, Matt 7:14).

## Extending

- **Add verses** — Edit `src/data/verses.ts`; use existing categories and set `redLetter: true` for Jesus’ words where appropriate.
- **Improve routing** — Edit `CATEGORY_TRIGGERS` and `selectCategoriesForQuestion` in `src/lib/verse-selector.ts`.
- **Use with Claude Code** — Run `claude` in this repo; the `.claude/agents/` definitions mirror the app’s categories so you can study with the same distinctions in the CLI.

## Commands

- `npm run dev` — Dev server (Turbopack)
- `npm run build` — Production build
- `npm run start` — Production server
