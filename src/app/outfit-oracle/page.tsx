"use client";

import { useState, useTransition } from "react";
import { Panel } from "@/components/Panel";
import { buildLookContent, type OracleInput } from "@/lib/oracleLookBuilder";

interface GeneratedImage {
  imageUrl: string;
  prompt: string;
}

const defaultInput: OracleInput = {
  mood: "Commanding",
  eventType: "Dinner Event",
  aesthetic: "Futuristic Femme"
};

export default function OutfitOraclePage() {
  const [mood, setMood] = useState(defaultInput.mood);
  const [eventType, setEventType] = useState(defaultInput.eventType);
  const [aesthetic, setAesthetic] = useState(defaultInput.aesthetic);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);
  const [status, setStatus] = useState("Generate images to preview futuristic models in the recommended looks.");
  const [isPending, startTransition] = useTransition();

  const look = buildLookContent({ mood, eventType, aesthetic });

  function handleGenerateImages() {
    setImageError(null);
    setStatus("Generating AI model concepts from your current outfit direction...");

    startTransition(async () => {
      try {
        const response = await fetch("/api/generate-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ mood, eventType, aesthetic })
        });

        const payload = (await response.json()) as
          | { images: GeneratedImage[] }
          | { error: string };

        if (!response.ok || !("images" in payload)) {
          throw new Error("error" in payload ? payload.error : "Image generation failed.");
        }

        setImages(payload.images);
        setStatus("AI-generated futuristic model concepts are ready.");
      } catch (error) {
        setImages([]);
        setImageError(error instanceof Error ? error.message : "Image generation failed.");
        setStatus("Image generation failed.");
      }
    });
  }

  return (
    <main className="space-y-4 pb-10">
      <Panel>
        <p className="oracle-eyebrow">Outfit Oracle</p>
        <h1 className="oracle-heading mt-2 text-4xl md:text-5xl">AI Stylist Generator</h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Enter your mood, event type, and desired aesthetic. The Oracle generates a custom outfit
          strategy and backend-powered AI fashion imagery.
        </p>
      </Panel>

      <Panel>
        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-sm text-zinc-300">
            Mood
            <input className="oracle-input" value={mood} onChange={(event) => setMood(event.target.value)} />
          </label>
          <label className="text-sm text-zinc-300">
            Event Type
            <input
              className="oracle-input"
              value={eventType}
              onChange={(event) => setEventType(event.target.value)}
            />
          </label>
          <label className="text-sm text-zinc-300">
            Desired Aesthetic
            <input
              className="oracle-input"
              value={aesthetic}
              onChange={(event) => setAesthetic(event.target.value)}
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={handleGenerateImages} className="chrome-button" disabled={isPending}>
            {isPending ? "Generating AI Images..." : "Generate Futuristic Models"}
          </button>
        </div>
      </Panel>

      <Panel>
        <p className="oracle-eyebrow">Generated Look</p>
        <h2 className="oracle-heading mt-2 text-3xl">{look.title}</h2>
        <p className="mt-3 max-w-3xl text-zinc-300">{look.description}</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-white/15 bg-black/25 p-4">
            <h3 className="font-semibold text-zinc-100">Outfit Formula</h3>
            <p className="mt-2 text-sm text-zinc-300">{look.formula}</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-black/25 p-4">
            <h3 className="font-semibold text-zinc-100">Styling Suggestions</h3>
            <p className="mt-2 text-sm text-zinc-300">{look.styling}</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-black/25 p-4">
            <h3 className="font-semibold text-zinc-100">Optional Accessories</h3>
            <p className="mt-2 text-sm text-zinc-300">{look.accessories}</p>
          </article>
        </div>
      </Panel>

      <Panel>
        <p className="oracle-eyebrow">Oracle Image Lab</p>
        <h2 className="oracle-heading mt-2 text-3xl">AI Model Generator</h2>
        <p className="mt-3 text-zinc-300">{status}</p>
        {imageError ? (
          <p className="mt-3 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {imageError}
          </p>
        ) : null}
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <article
                  key={`loading-${index}`}
                  className="rounded-3xl border border-white/15 bg-white/[0.03] p-3"
                >
                  <div className="aspect-[3/4] rounded-2xl bg-white/10 animate-pulse" />
                  <div className="mt-3 h-5 w-36 rounded-full bg-white/10 animate-pulse" />
                  <div className="mt-2 h-16 rounded-2xl bg-white/5 animate-pulse" />
                </article>
              ))
            : images.map((image, index) => (
                <article
                  key={`${index}-${image.prompt}`}
                  className="rounded-3xl border border-white/15 bg-white/[0.03] p-3"
                >
                  {/* Data URLs avoid client-side hotlink failures and keep the generated image bound to the prompt. */}
                  <img
                    src={image.imageUrl}
                    alt={`Futuristic model concept ${index + 1}`}
                    className="aspect-[3/4] w-full rounded-2xl object-cover"
                  />
                  <h3 className="mt-3 font-display text-2xl">Oracle Concept {index + 1}</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">{image.prompt}</p>
                </article>
              ))}
        </div>
      </Panel>
    </main>
  );
}
