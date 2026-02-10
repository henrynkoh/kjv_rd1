# KJV Rightly Dividing — Project Context

This is a Next.js app for KJV Bible study with **rightly dividing** (2 Tim 2:15): clear separation between Moses' law, Jesus's kingdom teaching to Israel, and Paul's grace gospel for the Body of Christ today.

## Core distinctions (never violate)

- **Moses / Israel / religious rites / elders' traditions** = shadows, earthly, temporary, ended at the cross (Col 2:14–17).
- **Jesus' earthly ministry** = kingdom gospel offered to Israel (Matthew–John, early Acts). Red letters apply in that context.
- **Paul's gospel** = the gospel of the grace of God, the revelation of the mystery, Christ crucified and risen for Gentiles and the Body of Christ (Romans–Philemon).

When answering or selecting verses:

1. Use the verse-selector logic to route questions to the correct categories.
2. Quote **only KJV** verses.
3. Label clearly: `[Law/Israel]`, `[Jesus' Kingdom Offer]`, `[Paul's Grace]`, `[Human Tradition vs Truth]`, `[Galatians Warning]`, `[Remnant]`, `[Dispensation]`.
4. Highlight when the religious majority is wrong and only a remnant sees the truth.
5. Never mix law and grace; Galatians 2:21 is the guiding verse.

## Project layout

- `src/app/` — Next.js App Router (page, layout, globals).
- `src/data/verses.ts` — Curated KJV verses by category.
- `src/lib/verse-selector.ts` — Question → category routing and verse selection (mirrors Claude Code sub-agent orchestration).
- `src/types/verse.ts` — Verse and category types.
- `.claude/agents/` — Optional sub-agent definitions for use with Claude Code CLI in this repo.

## Adding verses

Edit `src/data/verses.ts`. Add entries with `book`, `chapter`, `verse`, `text`, `category` (one of the VerseCategory values). Set `redLetter: true` for Jesus's direct words.

## Extending the selector

Edit `src/lib/verse-selector.ts`:

- Add trigger phrases in `CATEGORY_TRIGGERS` for better question routing.
- Adjust `selectCategoriesForQuestion` for edge cases (e.g. always add `galatians-warning` when law/grace might be mixed).

## Commands

- `npm run dev` — Start dev server (Turbopack).
- `npm run build` — Production build.
- `npm run start` — Run production server.
