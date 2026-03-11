"use client";

import { Panel } from "@/components/Panel";
import { aestheticsFeed } from "@/data/aesthetics";
import { useStyleStore } from "@/store/styleStore";

export default function MoodboardPage() {
  const saved = useStyleStore((state) => state.moodboardSaves);
  const toggle = useStyleStore((state) => state.toggleMoodboardSave);

  return (
    <main className="space-y-4 pb-10">
      <Panel>
        <p className="oracle-eyebrow">Style Inspiration</p>
        <h1 className="oracle-heading mt-2 text-4xl md:text-5xl">Visual Moodboard Atlas</h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Curate aesthetics and references that align with your evolving style identity.
        </p>
      </Panel>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {aestheticsFeed.map((card) => {
          const isSaved = saved.includes(card.id);
          return (
            <article key={card.id} className="oracle-panel group transition hover:-translate-y-1">
              <div className="mb-3 aspect-[4/3] rounded-2xl border border-white/15 bg-card-gradient" />
              <h3 className="oracle-heading text-2xl">{card.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{card.description}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.12em] text-zinc-400">
                {card.keywords.join(" • ")}
              </p>
              <button
                type="button"
                onClick={() => toggle(card.id)}
                className={`mt-4 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] transition ${
                  isSaved
                    ? "border-zinc-100 bg-white text-black"
                    : "border-zinc-500 text-zinc-200 hover:border-zinc-300"
                }`}
              >
                {isSaved ? "Saved" : "Save Inspiration"}
              </button>
            </article>
          );
        })}
      </section>
    </main>
  );
}
