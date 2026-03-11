"use client";

import Link from "next/link";
import { Panel } from "@/components/Panel";
import { archetypeLibrary } from "@/data/archetypes";
import { useStyleStore } from "@/store/styleStore";
import { StyleProfileCard } from "@/components/oracle/StyleProfileCard";
import { SignalStat } from "@/components/oracle/SignalStat";

export default function DashboardPage() {
  const profile = useStyleStore((state) => state.profile);
  const latestLook = useStyleStore((state) => state.latestLook);
  const savedLooks = useStyleStore((state) => state.savedLooks);

  if (!profile) {
    return (
      <main className="pb-10">
        <Panel>
          <h1 className="oracle-heading text-3xl">No Style Profile Yet</h1>
          <p className="mt-3 text-zinc-300">
            Start onboarding to unlock your personalized fashion dashboard and AI recommendations.
          </p>
          <Link href="/quiz" className="chrome-button mt-5 inline-flex items-center">
            Start Onboarding
          </Link>
        </Panel>
      </main>
    );
  }

  const archetype = archetypeLibrary.find((item) => item.name === profile.styleArchetype);

  return (
    <main className="space-y-4 pb-10">
      <Panel>
        <p className="oracle-eyebrow">Style Command Center</p>
        <h1 className="oracle-heading mt-2 text-4xl md:text-5xl">Welcome Back, Oracle Muse</h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Your dashboard tracks style identity, recommendation momentum, and curated looks you can
          return to any time.
        </p>
      </Panel>

      <section className="grid gap-4 md:grid-cols-3">
        <SignalStat label="Aesthetic Matches" value={`${profile.aesthetics.length}`} />
        <SignalStat label="Saved Looks" value={`${savedLooks.length}`} />
        <SignalStat label="Primary Archetype" value={profile.styleArchetype} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <StyleProfileCard profile={profile} />
        <Panel>
          <p className="oracle-eyebrow">Archetype Guidance</p>
          <h2 className="oracle-heading mt-2 text-3xl">{profile.styleArchetype}</h2>
          <p className="mt-3 text-zinc-300">{archetype?.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {archetype?.signaturePieces.map((piece) => (
              <span key={piece} className="oracle-tag">
                {piece}
              </span>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Panel>
          <p className="oracle-eyebrow">Recommendation Engine</p>
          <h3 className="oracle-heading mt-2 text-2xl">Generate a New Outfit Plan</h3>
          <p className="mt-3 text-sm text-zinc-300">
            Build today&apos;s look based on mood, occasion, and your signature style logic.
          </p>
          <Link href="/oracle" className="chrome-button mt-5 inline-flex items-center">
            Open Oracle Generator
          </Link>
        </Panel>

        <Panel>
          <p className="oracle-eyebrow">Latest Look</p>
          {latestLook ? (
            <>
              <h3 className="oracle-heading mt-2 text-2xl">{latestLook.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{latestLook.vibe}</p>
              <Link
                href="/saved"
                className="mt-5 inline-flex rounded-full border border-zinc-500 px-4 py-2 text-sm text-zinc-200 hover:border-zinc-300"
              >
                View Saved Looks
              </Link>
            </>
          ) : (
            <>
              <h3 className="oracle-heading mt-2 text-2xl">No look generated yet</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Generate your first recommendation to populate this space.
              </p>
            </>
          )}
        </Panel>
      </section>
    </main>
  );
}
