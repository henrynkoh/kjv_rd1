/** Categories for rightly dividing KJV (law vs grace, Jesus vs Paul, traditions vs truth). */
export type VerseCategory =
  | "paul-grace"
  | "jesus-teachings"
  | "moses-law"
  | "human-traditions"
  | "remnant"
  | "galatians-warning"
  | "dispensation";

export const CATEGORY_LABELS: Record<VerseCategory, string> = {
  "paul-grace": "Paul's Grace",
  "jesus-teachings": "Jesus' Kingdom Offer",
  "moses-law": "Law / Israel",
  "human-traditions": "Human Tradition vs Truth",
  remnant: "Remnant",
  "galatians-warning": "Galatians Warning (Law + Grace)",
  dispensation: "Dispensation",
};

export interface Verse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  category: VerseCategory;
  /** Optional: red letter / spoken by Jesus */
  redLetter?: boolean;
}

export interface VerseResult {
  verse: Verse;
  relevance: number;
  snippet?: string;
}
