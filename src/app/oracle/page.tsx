"use client";

import { useState } from "react";
import Link from "next/link";
import { OutfitCard } from "@/components/OutfitCard";
import { Panel } from "@/components/Panel";
import { generateOutfit } from "@/lib/generateOutfit";
import { useStyleStore } from "@/store/styleStore";
import { ChromeButton } from "@/components/oracle/ChromeButton";
import {
  oracleAestheticTags,
  oracleMoods,
  oracleOccasions,
  oracleSeasons
} from "@/data/oracleSignals";

export default function OraclePage() {
  const profile = useStyleStore((state) => state.profile);
  const latestLook = useStyleStore((state) => state.latestLook);
  const setLatestLook = useStyleStore((state) => state.setLatestLook);
  const saveLook = useStyleStore((state) => state.saveLook);

  const [occasion, setOccasion] = useState(oracleOccasions[0]);
  const [mood, setMood] = useState(oracleMoods[0]);
  const [season, setSeason] = useState(oracleSeasons[0]);
  const [budgetNote, setBudgetNote] = useState("Under $250");
  const [categoryInput, setCategoryInput] = useState("Outerwear, Bottoms, Bag");
  const [colors, setColors] = useState("Black, Silver, White");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!profile) {
      return;
    }

    setLoading(true);
    const look = await generateOutfit(profile, {
      occasion,
      mood,
      season,
      budgetNote,
      categories: categoryInput
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      preferredColors: colors
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    });
    setLatestLook(look);
    setLoading(false);
  };

  if (!profile) {
    return (
      <main className="pb-10">
        <Panel>
          <h1 className="oracle-heading text-3xl">Oracle Locked</h1>
          <p className="mt-3 text-zinc-300">Complete onboarding first to activate personalized styling.</p>
          <Link href="/quiz" className="chrome-button mt-5 inline-flex items-center">
            Go to Onboarding
          </Link>
        </Panel>
      </main>
    );
  }

  return (
    <main className="space-y-4 pb-10">
      <Panel>
        <p className="oracle-eyebrow">AI Stylist</p>
        <h1 className="oracle-heading mt-2 text-4xl md:text-5xl">Generate Your Oracle Look</h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          This engine blends your style profile with your current mood and occasion to produce a
          full look concept and styling rationale.
        </p>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <label className="text-sm text-zinc-300">
            Occasion
            <select className="oracle-input" value={occasion} onChange={(event) => setOccasion(event.target.value)}>
              {oracleOccasions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-zinc-300">
            Mood
            <select className="oracle-input" value={mood} onChange={(event) => setMood(event.target.value)}>
              {oracleMoods.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-zinc-300">
            Season
            <select className="oracle-input" value={season} onChange={(event) => setSeason(event.target.value)}>
              {oracleSeasons.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-zinc-300">
            Budget Window
            <input
              className="oracle-input"
              value={budgetNote}
              onChange={(event) => setBudgetNote(event.target.value)}
            />
          </label>

          <label className="text-sm text-zinc-300">
            Categories (comma separated)
            <input
              className="oracle-input"
              value={categoryInput}
              onChange={(event) => setCategoryInput(event.target.value)}
            />
          </label>

          <label className="text-sm text-zinc-300">
            Preferred Colors
            <input className="oracle-input" value={colors} onChange={(event) => setColors(event.target.value)} />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {oracleAestheticTags.map((tag) => (
            <span key={tag} className="oracle-tag">
              {tag}
            </span>
          ))}
        </div>

        <ChromeButton onClick={handleGenerate} disabled={loading} className="mt-6">
          {loading ? "Generating Look..." : "Generate Outfit Recommendation"}
        </ChromeButton>
      </Panel>

      {latestLook ? (
        <OutfitCard
          look={latestLook}
          action={
            <button
              type="button"
              onClick={() => saveLook(latestLook)}
              className="rounded-full border border-zinc-500 px-4 py-2 text-xs uppercase tracking-[0.12em] text-zinc-200 hover:border-zinc-300"
            >
              Save to Closet
            </button>
          }
        />
      ) : (
        <Panel>
          <p className="text-zinc-300">
            No look generated yet. Submit your inputs to receive your first Oracle recommendation.
          </p>
        </Panel>
      )}
    </main>
  );
}
