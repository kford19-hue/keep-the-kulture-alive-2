"use client";

import { useMemo, useState } from "react";
import { Panel } from "@/components/Panel";

type Archetype = "Street Luxe Visionary" | "Futuristic Femme Architect" | "Edgy Minimal Storyteller";

type Question = {
  id: string;
  label: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: "energy",
    label: "What energy do you want your outfit to carry tonight?",
    options: ["Commanding", "Playful", "Mysterious", "Soft Power"]
  },
  {
    id: "silhouette",
    label: "Pick your favorite silhouette direction.",
    options: ["Structured tailoring", "Flowing layers", "Sharp monochrome", "Street volume"]
  },
  {
    id: "lifestyle",
    label: "What fits your week best?",
    options: ["Creative meetings", "Night events", "Office and city", "Content shoots"]
  },
  {
    id: "influence",
    label: "What inspires your style eye most?",
    options: ["Runway futurism", "Street culture", "Minimalist editorials", "Music icons"]
  }
];

function detectArchetype(answers: Record<string, string>): Archetype {
  const joined = Object.values(answers).join(" ").toLowerCase();

  if (joined.includes("street") || joined.includes("music") || joined.includes("volume")) {
    return "Street Luxe Visionary";
  }

  if (joined.includes("futur") || joined.includes("soft") || joined.includes("flow")) {
    return "Futuristic Femme Architect";
  }

  return "Edgy Minimal Storyteller";
}

function archetypeInsight(archetype: Archetype): string {
  if (archetype === "Street Luxe Visionary") {
    return "You lead with bold confidence, remixing streetwear codes with polished statement pieces.";
  }

  if (archetype === "Futuristic Femme Architect") {
    return "You build sleek, intentional looks with feminine structure and modern futurist edge.";
  }

  return "You tell stories through clean lines, sharp contrast, and understated power styling.";
}

export default function ArchetypeQuizPage() {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const isComplete = questions.every((question) => Boolean(answers[question.id]));

  const result = useMemo(() => {
    if (!isComplete) {
      return null;
    }

    const archetype = detectArchetype(answers);
    return {
      archetype,
      insight: archetypeInsight(archetype)
    };
  }, [answers, isComplete]);

  return (
    <main className="space-y-4 pb-10">
      <Panel>
        <p className="oracle-eyebrow">Archetype Quiz</p>
        <h1 className="oracle-heading mt-2 text-4xl md:text-5xl">Decode Your Fashion Frequency</h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Answer fast prompts about mood, silhouettes, lifestyle, and creative influences to reveal
          your style archetype profile.
        </p>
      </Panel>

      <Panel>
        <div className="space-y-6">
          {questions.map((question) => (
            <section key={question.id}>
              <h2 className="mb-3 text-lg font-semibold text-zinc-100">{question.label}</h2>
              <div className="grid gap-2 md:grid-cols-2">
                {question.options.map((option) => {
                  const active = answers[question.id] === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))}
                      className={`rounded-2xl border px-4 py-3 text-left transition ${
                        active
                          ? "border-zinc-100 bg-white text-black"
                          : "border-zinc-700 bg-black/40 text-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </Panel>

      {result ? (
        <Panel>
          <p className="oracle-eyebrow">Your Archetype</p>
          <h2 className="oracle-heading mt-2 text-3xl md:text-4xl">{result.archetype}</h2>
          <p className="mt-3 max-w-2xl text-zinc-300">{result.insight}</p>
        </Panel>
      ) : (
        <Panel>
          <p className="text-zinc-300">Complete all prompts to generate your style archetype profile.</p>
        </Panel>
      )}
    </main>
  );
}
