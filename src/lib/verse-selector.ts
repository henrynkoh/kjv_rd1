import type { VerseCategory, Verse, VerseResult } from "@/types/verse";
import { VERSES } from "@/data/verses";

/** Trigger phrases per category (like sub-agent descriptions). Enables auto-routing. */
const CATEGORY_TRIGGERS: Record<VerseCategory, string[]> = {
  "paul-grace": [
    "saved",
    "salvation",
    "justified",
    "grace",
    "faith alone",
    "gospel",
    "church",
    "body of christ",
    "gentiles",
    "righteousness",
    "forgiven",
    "redemption",
    "cross",
    "today",
    "christian",
  ],
  "jesus-teachings": [
    "jesus said",
    "jesus teach",
    "red letter",
    "sermon on the mount",
    "kingdom",
    "forgiveness",
    "love your enemy",
    "matthew",
    "mark",
    "luke",
    "john",
    "earthly ministry",
  ],
  "moses-law": [
    "law",
    "sabbath",
    "tithe",
    "tithing",
    "circumcision",
    "dietary",
    "feast",
    "old testament",
    "moses",
    "commandment",
    "water baptism",
    "baptism",
  ],
  "human-traditions": [
    "tradition",
    "elders",
    "church tradition",
    "religious",
    "ritual",
    "majority",
    "men's rules",
    "pharisee",
    "scribes",
  ],
  remnant: [
    "remnant",
    "few",
    "narrow",
    "many vs few",
    "elect",
    "election",
  ],
  "galatians-warning": [
    "works",
    "law and grace",
    "mix",
    "add to faith",
    "required",
    "must do",
    "obey to be saved",
  ],
  dispensation: [
    "dispensation",
    "age",
    "today vs israel",
    "paul our apostle",
    "stewardship",
  ],
};

/**
 * Route a user question to the correct categories (like verse-selector sub-agent).
 * Returns which categories are relevant so we can show the right verses.
 */
export function selectCategoriesForQuestion(question: string): VerseCategory[] {
  const q = question.toLowerCase().trim();
  const matched = new Set<VerseCategory>();

  for (const [category, triggers] of Object.entries(CATEGORY_TRIGGERS)) {
    const hit = triggers.some((t) => q.includes(t));
    if (hit) matched.add(category as VerseCategory);
  }

  // If question risks mixing law and grace, always include galatians-warning
  const lawGraceWords = ["saved", "justified", "tithe", "sabbath", "baptism", "works", "obey"];
  if (lawGraceWords.some((w) => q.includes(w))) {
    matched.add("galatians-warning");
  }

  // Default: show Paul's grace + Jesus + law/traditions for general questions
  if (matched.size === 0) {
    return ["paul-grace", "jesus-teachings", "human-traditions"];
  }

  return Array.from(matched);
}

/**
 * Get verses for the given categories, optionally limited and sorted by relevance.
 */
export function getVersesForCategories(
  categories: VerseCategory[],
  limitPerCategory = 8
): VerseResult[] {
  const set = new Set(categories);
  const byCategory: Verse[] = [];

  for (const v of VERSES) {
    if (set.has(v.category)) byCategory.push(v);
  }

  // Group by category, take up to limitPerCategory each
  const byCat = new Map<VerseCategory, Verse[]>();
  for (const v of byCategory) {
    const list = byCat.get(v.category) ?? [];
    if (list.length < limitPerCategory) list.push(v);
    byCat.set(v.category, list);
  }

  const result: VerseResult[] = [];
  for (const [, list] of byCat) {
    for (const verse of list) {
      result.push({ verse, relevance: 1 });
    }
  }
  return result;
}

/**
 * Full pipeline: question → categories → verses (mirrors sub-agent orchestration).
 */
export function selectVersesForQuestion(question: string): VerseResult[] {
  const categories = selectCategoriesForQuestion(question);
  return getVersesForCategories(categories);
}
