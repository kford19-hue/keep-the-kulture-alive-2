import { generateArchetype } from "@/lib/generateArchetype";
import { FashionRisk, FitPreference, StyleProfile } from "@/types/style";

export type QuizAnswers = Record<string, string | string[]>;

const getMulti = (value: string | string[] | undefined): string[] => {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

const getSingle = (value: string | string[] | undefined, fallback: string): string => {
  if (!value) {
    return fallback;
  }
  return Array.isArray(value) ? value[0] ?? fallback : value;
};

export function buildStyleProfile(answers: QuizAnswers): StyleProfile {
  const draft = {
    aesthetics: getMulti(answers.aesthetics) as StyleProfile["aesthetics"],
    favoriteColors: getMulti(answers.favoriteColors),
    fitPreference: getSingle(answers.fitPreference, "balanced") as FitPreference,
    budget: getSingle(answers.budget, "medium") as StyleProfile["budget"],
    fashionRisk: getSingle(answers.fashionRisk, "moderate") as FashionRisk,
    styleGoals: getMulti(answers.styleGoals),
    occasions: getMulti(answers.occasions),
    inspirations: getMulti(answers.inspirations),
    lifestyle: getSingle(answers.lifestyle, "creative + social"),
    moodDirection: getSingle(answers.moodDirection, "bold")
  };

  const archetype = generateArchetype(draft);

  return {
    id: `profile-${Date.now()}`,
    styleArchetype: archetype.name,
    ...draft
  };
}
