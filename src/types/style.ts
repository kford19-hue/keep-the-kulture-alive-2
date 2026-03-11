export type Aesthetic =
  | "streetwear"
  | "soft glam"
  | "futuristic femme"
  | "edgy minimal"
  | "casual luxe"
  | "street luxe"
  | "off-duty model"
  | "artsy rebel"
  | "cyber streetwear";

export type FitPreference = "oversized" | "fitted" | "balanced" | "layered";
export type BudgetRange = "low" | "medium" | "high";
export type FashionRisk = "safe" | "moderate" | "experimental";

export interface StyleProfile {
  id: string;
  styleArchetype: string;
  aesthetics: Aesthetic[];
  favoriteColors: string[];
  fitPreference: string;
  budget: BudgetRange;
  fashionRisk: FashionRisk;
  styleGoals: string[];
  occasions: string[];
  inspirations: string[];
  lifestyle: string;
  moodDirection: string;
}

export interface StyleArchetype {
  name: string;
  description: string;
  keySilhouettes: string[];
  colorDirection: string[];
  signaturePieces: string[];
  philosophy: string;
}

export interface OutfitInput {
  occasion: string;
  mood: string;
  season: string;
  budgetNote: string;
  categories?: string[];
  preferredColors?: string[];
}

export interface OutfitRecommendation {
  id: string;
  title: string;
  vibe: string;
  pieces: string[];
  accessories: string[];
  shoes: string[];
  stylingNotes: string;
  whyItWorks: string;
  createdAt: string;
  profileId: string;
}

export interface QuizQuestion {
  id: string;
  label: string;
  type: "single" | "multi";
  options: string[];
  key: string;
}

export interface MoodboardCard {
  id: string;
  title: string;
  description: string;
  keywords: string[];
}
