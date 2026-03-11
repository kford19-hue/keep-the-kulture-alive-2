"use client";

import { QuizStepper } from "@/components/QuizStepper";
import { Panel } from "@/components/Panel";
import { buildStyleProfile } from "@/lib/buildStyleProfile";
import { useStyleStore } from "@/store/styleStore";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const setProfile = useStyleStore((state) => state.setProfile);
  const router = useRouter();

  return (
    <main className="space-y-4 pb-10">
      <Panel>
        <p className="oracle-eyebrow">Onboarding Experience</p>
        <h1 className="oracle-heading mt-2 text-4xl md:text-5xl">Calibrate Your Style Identity</h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Answer a few fashion-intelligence prompts so the Oracle can personalize silhouettes,
          aesthetic direction, color strategy, and occasion-based recommendations.
        </p>
      </Panel>

      <QuizStepper
        onComplete={(answers) => {
          const profile = buildStyleProfile(answers);
          setProfile(profile);
          router.push("/dashboard");
        }}
      />
    </main>
  );
}
