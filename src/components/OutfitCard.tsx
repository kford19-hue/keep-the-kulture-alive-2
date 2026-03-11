import { OutfitRecommendation } from "@/types/style";
import { ReactNode } from "react";

interface OutfitCardProps {
  look: OutfitRecommendation;
  action?: ReactNode;
}

export function OutfitCard({ look, action }: OutfitCardProps) {
  return (
    <article className="oracle-panel">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="oracle-eyebrow">Oracle Look</p>
          <h3 className="oracle-heading text-2xl md:text-3xl">{look.title}</h3>
          <p className="mt-1 text-zinc-300">{look.vibe}</p>
        </div>
        {action}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/15 bg-black/25 p-4">
          <h4 className="mb-2 font-semibold text-zinc-100">Look Formula</h4>
          <ul className="space-y-1 text-sm text-zinc-300">
            {look.pieces.map((piece) => (
              <li key={piece}>• {piece}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-white/15 bg-black/25 p-4">
          <h4 className="mb-2 font-semibold text-zinc-100">Accessories + Shoes</h4>
          <ul className="space-y-1 text-sm text-zinc-300">
            {look.accessories.map((item) => (
              <li key={item}>• {item}</li>
            ))}
            {look.shoes.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="mb-1 text-xs uppercase tracking-[0.12em] text-zinc-400">Styling Notes</p>
          <p>{look.stylingNotes}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="mb-1 text-xs uppercase tracking-[0.12em] text-zinc-400">Why It Works</p>
          <p>{look.whyItWorks}</p>
        </div>
      </div>
    </article>
  );
}
