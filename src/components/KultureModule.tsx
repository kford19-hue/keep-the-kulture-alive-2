import { Panel } from "@/components/Panel";

export function KultureModule() {
  return (
    <Panel>
      <p className="oracle-eyebrow">Keep the Kulture Alive</p>
      <h3 className="oracle-heading mt-2 text-2xl">Trend Origins + Cultural Notes</h3>
      <p className="mt-3 max-w-3xl text-zinc-300">
        This module anchors recommendations in cultural context. It highlights Black creativity,
        especially Black women as core trendsetters, and will expand into origin spotlights,
        influence timelines, and style storytelling cards.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
          <p className="mb-1 text-xs uppercase tracking-[0.12em] text-zinc-400">Origin Spotlight</p>
          Streetwear silhouettes and styling language rooted in Black urban culture.
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
          <p className="mb-1 text-xs uppercase tracking-[0.12em] text-zinc-400">Influence Ledger</p>
          Track who innovated the look before brands and trend cycles mainstreamed it.
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
          <p className="mb-1 text-xs uppercase tracking-[0.12em] text-zinc-400">Storytelling Card</p>
          Style recommendations pair with context so fashion remains memory, not erasure.
        </div>
      </div>
    </Panel>
  );
}
