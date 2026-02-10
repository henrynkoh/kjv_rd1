# KJV Rightly Dividing — Tutorial

Step-by-step tutorial: what the app does, how to use it, and how to extend it.

---

## Part 1: What “rightly dividing” means

**2 Timothy 2:15 (KJV):** *“Study to shew thyself approved unto God … rightly dividing the word of truth.”*

The app helps you divide Scripture by:

| Category | What it is | Example topics |
|----------|------------|----------------|
| **Law / Israel** | Moses’ law, OT commands, Israel’s rites | Sabbath, tithing, circumcision, feasts |
| **Jesus’ Kingdom Offer** | Jesus’ words to Israel (red letters) | Forgiveness, kingdom, Sermon on the Mount |
| **Paul’s Grace** | Gospel for the Body of Christ today | Salvation by faith, grace, church doctrine |
| **Human Tradition vs Truth** | Traditions of men vs Scripture | Elders’ rules, religious majority |
| **Galatians Warning** | Don’t mix law with grace | Works + faith, “must do” to be saved |
| **Remnant** | Few vs many | Election, narrow way |
| **Dispensation** | Stewardship of the mystery | Paul as apostle to the Gentiles |

---

## Part 2: Using the app (input mode)

### Step 1 — Open the app

Run `npm run dev` and open **http://localhost:3000**.

### Step 2 — Ask a question

Use the big text box. Examples:

- **“How are we saved today?”** → Paul’s grace + Galatians warning
- **“What did Jesus say about forgiveness?”** → Jesus’ teachings (red letters)
- **“Should Christians tithe?”** → Law + human traditions + Paul’s grace
- **“What about water baptism?”** → Law + Paul’s grace (one baptism, 1 Cor 12:13)
- **“Who is our apostle today?”** → Paul’s grace + dispensation

### Step 3 — Click “Select verses”

The app picks categories from your question (using trigger words) and shows only KJV verses for those categories.

### Step 4 — Read by category

Results are grouped with labels like **[Paul’s Grace]** and **[Jesus’ Kingdom Offer]**. Red-letter verses are marked as Jesus’ words.

---

## Part 3: Understanding the results

- **Green / emerald** = Paul’s Grace (for today)
- **Teal** = Jesus’ Kingdom Offer (to Israel)
- **Amber** = Law / Israel (shadow; we’re not under law)
- **Gray** = Human Tradition vs Truth
- **Red** = Galatians Warning (don’t add works to grace)
- **Rose** = Remnant
- **Indigo** = Dispensation

Use the labels to see *who* each verse is for and *when* it applies.

---

## Part 4: Adding your own verses

1. Open **`src/data/verses.ts`**
2. Add an object like:

```ts
{
  book: "Romans",
  chapter: 8,
  verse: 1,
  text: "There is therefore now no condemnation to them which are in Christ Jesus...",
  category: "paul-grace",
}
```

3. Save; the app will include it in results for questions that hit **paul-grace**.

Categories: `paul-grace` | `jesus-teachings` | `moses-law` | `human-traditions` | `remnant` | `galatians-warning` | `dispensation`.  
Set `redLetter: true` for Jesus’ direct words.

---

## Part 5: Improving question routing

If a question doesn’t show the category you want, add trigger words:

1. Open **`src/lib/verse-selector.ts`**
2. Find **`CATEGORY_TRIGGERS`**
3. Add phrases to the right category, e.g. `"baptism"` under `paul-grace` or `moses-law`

Restart or refresh; ask the question again.

---

## Next steps

- **Manual** — [MANUAL.md](MANUAL.md): full feature list, file layout, deployment
- **README** — [../README.md](../README.md): overview and commands
