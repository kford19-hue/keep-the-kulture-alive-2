"use client";

import Link from "next/link";
import { OutfitCard } from "@/components/OutfitCard";
import { Panel } from "@/components/Panel";
import { useStyleStore } from "@/store/styleStore";

export default function SavedLooksPage() {
  const savedLooks = useStyleStore((state) => state.savedLooks);
  const removeLook = useStyleStore((state) => state.removeLook);

  return (
    <main className="space-y-4 pb-10">
      <Panel>
        <p className="oracle-eyebrow">Digital Closet</p>
        <h1 className="oracle-heading mt-2 text-4xl md:text-5xl">Saved Oracle Looks</h1>
        <p className="mt-3 text-zinc-300">
          Keep your strongest recommendations in one place so you can remix and shop with focus.
        </p>
      </Panel>

      {savedLooks.length === 0 ? (
        <Panel>
          <p className="text-zinc-300">Your closet is empty. Generate a look and save it here.</p>
          <Link href="/oracle" className="chrome-button mt-5 inline-flex items-center">
            Generate a Look
          </Link>
        </Panel>
      ) : (
        savedLooks.map((look) => (
          <OutfitCard
            key={look.id}
            look={look}
            action={
              <button
                type="button"
                onClick={() => removeLook(look.id)}
                className="rounded-full border border-zinc-500 px-4 py-2 text-xs uppercase tracking-[0.12em] text-zinc-200 hover:border-zinc-300"
              >
                Remove
              </button>
            }
          />
        ))
      )}
    </main>
  );
}
