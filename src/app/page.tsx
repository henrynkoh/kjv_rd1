"use client";

import { useState, useEffect } from "react";
import { selectVersesForQuestion } from "@/lib/verse-selector";
import { CATEGORY_LABELS, type VerseCategory } from "@/types/verse";
import type { VerseResult } from "@/types/verse";

const GITHUB_URL =
  typeof process.env.NEXT_PUBLIC_GITHUB_URL === "string" &&
  process.env.NEXT_PUBLIC_GITHUB_URL
    ? process.env.NEXT_PUBLIC_GITHUB_URL
    : "https://github.com";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "features", label: "Features" },
  { id: "how-it-works", label: "How It Works" },
  { id: "try-it", label: "Try It" },
  { id: "categories", label: "Categories" },
  { id: "docs", label: "Docs & Links" },
] as const;

const CATEGORY_STYLES: Record<VerseCategory, string> = {
  "paul-grace": "border-l-4 border-emerald-700 bg-emerald-50/80 text-emerald-900",
  "jesus-teachings": "border-l-4 border-teal-700 bg-teal-50/80 text-teal-900",
  "moses-law": "border-l-4 border-amber-800 bg-amber-50/80 text-amber-900",
  "human-traditions": "border-l-4 border-stone-600 bg-stone-100 text-stone-800",
  remnant: "border-l-4 border-rose-800 bg-rose-50/80 text-rose-900",
  "galatians-warning": "border-l-4 border-red-800 bg-red-50/80 text-red-900",
  dispensation: "border-l-4 border-indigo-700 bg-indigo-50/80 text-indigo-900",
};

function VerseBlock({ result }: { result: VerseResult }) {
  const { verse } = result;
  const style = CATEGORY_STYLES[verse.category];
  const label = CATEGORY_LABELS[verse.category];
  const ref = `${verse.book} ${verse.chapter}:${verse.verse}`;
  return (
    <blockquote
      className={`rounded-r px-4 py-3 my-2 text-sm ${style}`}
      cite={`${verse.book} ${verse.chapter}:${verse.verse}`}
    >
      <span className="font-semibold text-xs uppercase tracking-wide opacity-90">
        {label}
      </span>
      <p className="mt-1 font-serif italic">&ldquo;{verse.text}&rdquo;</p>
      <footer className="mt-1 text-xs opacity-80">
        — {ref} (KJV)
        {verse.redLetter && (
          <span className="ml-2 text-xs">(Jesus&apos;s words)</span>
        )}
      </footer>
    </blockquote>
  );
}

function Results({ results }: { results: VerseResult[] }) {
  if (results.length === 0) {
    return (
      <p className="text-stone-600 mt-6">
        No verses matched. Try: &ldquo;How are we saved today?&rdquo; or
        &ldquo;What did Jesus say about forgiveness?&rdquo; or &ldquo;Should
        Christians tithe?&rdquo;
      </p>
    );
  }
  const byCategory = new Map<VerseCategory, VerseResult[]>();
  for (const r of results) {
    const list = byCategory.get(r.verse.category) ?? [];
    list.push(r);
    byCategory.set(r.verse.category, list);
  }
  const order: VerseCategory[] = [
    "galatians-warning",
    "paul-grace",
    "jesus-teachings",
    "moses-law",
    "human-traditions",
    "remnant",
    "dispensation",
  ];
  return (
    <div className="mt-6 space-y-6">
      <h3 className="text-lg font-semibold text-stone-800">
        Selected verses (rightly divided)
      </h3>
      {order.map((cat) => {
        const list = byCategory.get(cat);
        if (!list?.length) return null;
        return (
          <section key={cat}>
            <h4 className="text-sm font-semibold text-stone-600 mb-2">
              {CATEGORY_LABELS[cat]}
            </h4>
            {list.map((r, i) => (
              <VerseBlock
                key={`${r.verse.book}-${r.verse.chapter}-${r.verse.verse}-${i}`}
                result={r}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [results, setResults] = useState<VerseResult[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    const verses = selectVersesForQuestion(question.trim());
    setResults(verses);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/30">
      {/* Left sidebar - scrollable nav */}
      <aside
        className="fixed left-0 top-0 bottom-0 w-56 lg:w-64 flex flex-col border-r border-stone-200/80 bg-white/80 backdrop-blur-sm z-40"
        aria-label="Page navigation"
      >
        <div className="p-4 border-b border-stone-200/80 shrink-0">
          <a
            href="#hero"
            className="text-lg font-bold text-stone-900 hover:text-emerald-700 transition-colors"
          >
            KJV Rightly Dividing
          </a>
        </div>
        <nav
          className="sidebar-nav flex-1 overflow-y-auto py-4 px-3"
          aria-label="Sections"
        >
          <ul className="space-y-0.5">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === id
                      ? "bg-emerald-100 text-emerald-800"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 pl-56 lg:pl-64 pr-4 pb-24 max-w-4xl mx-auto">
        {/* Hero */}
        <section
          id="hero"
          className="min-h-[70vh] flex flex-col justify-center py-16"
        >
          <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-2">
            2 Timothy 2:15
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 font-serif leading-tight">
            Rightly divide the word of truth
          </h1>
          <p className="mt-4 text-xl text-stone-600 max-w-xl">
            KJV-only study with clear separation: Moses&apos; law, Jesus&apos;s
            teaching to Israel, and Paul&apos;s grace gospel for the Body of
            Christ today.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#try-it"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
            >
              Try it now
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border-2 border-stone-300 px-6 py-3 text-stone-700 font-semibold hover:border-stone-400 hover:bg-stone-50 transition"
            >
              How it works
            </a>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="py-16 border-t border-stone-200/80"
        >
          <h2 className="text-2xl font-bold text-stone-900 mb-4">About</h2>
          <p className="text-stone-600 leading-relaxed max-w-2xl">
            This tool helps you study the King James Version without mixing law
            and grace. You ask a question—e.g. &ldquo;How are we saved
            today?&rdquo; or &ldquo;Should Christians tithe?&rdquo;—and get
            only KJV verses grouped by category: Paul&apos;s grace, Jesus&apos;s
            kingdom offer to Israel, Law/Israel, human traditions vs truth, and
            a Galatians-style warning when the question touches both law and
            grace.
          </p>
        </section>

        {/* Features */}
        <section
          id="features"
          className="py-16 border-t border-stone-200/80"
        >
          <h2 className="text-2xl font-bold text-stone-900 mb-8">Features</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-6 shadow-sm">
              <h3 className="font-semibold text-stone-900 mb-2">Question-driven</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Type any Bible question; the app routes it to the right categories and returns only relevant KJV verses.
              </p>
            </div>
            <div className="rounded-2xl border border-teal-200/80 bg-teal-50/50 p-6 shadow-sm">
              <h3 className="font-semibold text-stone-900 mb-2">Category labels</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Every verse is labeled: Paul&apos;s Grace, Jesus&apos; Kingdom Offer, Law/Israel, Human Tradition vs Truth, Galatians Warning, Remnant, Dispensation.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-6 shadow-sm">
              <h3 className="font-semibold text-stone-900 mb-2">KJV only</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                All verses are from the King James Version. No other translations.
              </p>
            </div>
            <div className="rounded-2xl border border-indigo-200/80 bg-indigo-50/50 p-6 shadow-sm">
              <h3 className="font-semibold text-stone-900 mb-2">No sign-up</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Open the app, ask a question, get verses. No account or install required.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="py-16 border-t border-stone-200/80"
        >
          <h2 className="text-2xl font-bold text-stone-900 mb-8">How It Works</h2>
          <ol className="space-y-6 max-w-2xl">
            {[
              { step: 1, title: "Ask a question", text: "Type something like “How are we saved today?” or “Should Christians tithe?” in the input box." },
              { step: 2, title: "Automatic routing", text: "The app matches your question to categories (Paul’s grace, Jesus’ teaching, Law/Israel, traditions, etc.) using keyword triggers." },
              { step: 3, title: "Get verses", text: "You see only KJV verses for those categories, with clear labels so you know who each verse is for and when it applies." },
            ].map(({ step, title, text }) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
                  {step}
                </span>
                <div>
                  <h3 className="font-semibold text-stone-900">{title}</h3>
                  <p className="text-stone-600 text-sm mt-1">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Try it */}
        <section
          id="try-it"
          className="py-16 border-t border-stone-200/80"
        >
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Try It</h2>
          <p className="text-stone-600 mb-6 max-w-xl">
            Ask any question below. You&apos;ll get KJV verses grouped by category.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3 max-w-2xl">
            <label htmlFor="question" className="block text-sm font-medium text-stone-700">
              Your question
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. How are we saved today? What did Jesus say about forgiveness? Should Christians tithe?"
              rows={3}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 font-serif text-stone-800 placeholder:text-stone-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition"
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
            >
              Select verses
            </button>
          </form>
          {submitted && (
            <div className="mt-8 max-w-2xl">
              <Results results={results} />
            </div>
          )}
        </section>

        {/* Categories */}
        <section
          id="categories"
          className="py-16 border-t border-stone-200/80"
        >
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Categories</h2>
          <p className="text-stone-600 mb-8 max-w-xl">
            Verses are tagged so you can see at a glance whether they apply to law, Jesus&apos;s offer to Israel, or Paul&apos;s grace for the church today.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(
              [
                { id: "paul-grace", label: "Paul's Grace", hint: "Romans–Philemon; salvation by grace through faith" },
                { id: "jesus-teachings", label: "Jesus' Kingdom Offer", hint: "Red letters; kingdom offer to Israel" },
                { id: "moses-law", label: "Law / Israel", hint: "Moses' law, sabbath, tithing, shadows" },
                { id: "human-traditions", label: "Human Tradition vs Truth", hint: "Traditions of men vs Scripture" },
                { id: "galatians-warning", label: "Galatians Warning", hint: "Don't mix law and grace" },
                { id: "remnant", label: "Remnant", hint: "Few vs many; election of grace" },
                { id: "dispensation", label: "Dispensation", hint: "Paul's stewardship of the mystery" },
              ] as const
            ).map(({ id, label, hint }) => (
              <div
                key={id}
                className={`rounded-xl px-4 py-3 ${CATEGORY_STYLES[id]} border-l-4`}
              >
                <span className="font-semibold text-sm">{label}</span>
                <p className="text-xs mt-1 opacity-90">{hint}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Docs */}
        <section
          id="docs"
          className="py-16 border-t border-stone-200/80"
        >
          <h2 className="text-2xl font-bold text-stone-900 mb-6">Docs & Links</h2>
          <p className="text-stone-600 mb-6 max-w-xl">
            Quick Start, Tutorial, and full Manual are in the repo. Use the GitHub link (bottom right) to open the project.
          </p>
          <ul className="space-y-2 text-stone-700">
            <li>
              <strong>Quick Start</strong> — Get running in 5 minutes
            </li>
            <li>
              <strong>Tutorial</strong> — Step-by-step usage and how to add verses
            </li>
            <li>
              <strong>Manual</strong> — Features, file structure, deployment
            </li>
            <li>
              <strong>Ads & copy</strong> — Ready-to-use text for social and blogs
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-stone-200/80 text-sm text-stone-500">
          <p>
            Verses from the KJV. Rightly divide the word (2 Tim 2:15). Law vs grace, Jesus vs Paul—study approved.
          </p>
        </footer>
      </main>

      {/* Bottom-right GitHub link */}
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-white text-sm font-medium shadow-lg hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition"
        aria-label="View on GitHub"
      >
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
        View on GitHub
      </a>
    </div>
  );
}
