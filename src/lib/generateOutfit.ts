import { OutfitInput, OutfitRecommendation, StyleProfile } from "@/types/style";

function pickTitle(profile: StyleProfile, mood: string): string {
  const moodValue = mood.toLowerCase();

  if (profile.aesthetics.includes("futuristic femme")) {
    return moodValue.includes("bold") ? "Chrome Velocity Edit" : "Neo Muse Uniform";
  }

  if (profile.aesthetics.includes("edgy minimal") || profile.aesthetics.includes("casual luxe")) {
    return "Monochrome Power Capsule";
  }

  if (profile.aesthetics.includes("streetwear")) {
    return "City Signal Look";
  }

  return "Curated Oracle Ensemble";
}

function seasonFabric(season: string): string {
  const map: Record<string, string> = {
    spring: "lightweight",
    summer: "breathable",
    fall: "textured",
    winter: "insulated"
  };

  return map[season.toLowerCase()] ?? "adaptive";
}

function riskNote(risk: StyleProfile["fashionRisk"]): string {
  if (risk === "experimental") {
    return "Push contrast with one directional statement piece.";
  }

  if (risk === "safe") {
    return "Keep the shape clean and anchor with familiar silhouettes.";
  }

  return "Balance one striking element with polished essentials.";
}

export async function generateOutfit(
  profile: StyleProfile,
  input: OutfitInput
): Promise<OutfitRecommendation> {
  const baseColor = input.preferredColors?.[0] ?? profile.favoriteColors[0] ?? "black";
  const accentColor = input.preferredColors?.[1] ?? profile.favoriteColors[1] ?? "silver";
  const fabricDirection = seasonFabric(input.season);
  const categories = input.categories?.length ? input.categories : ["Outerwear", "Bottoms", "Bag"];

  const pieces = [
    `${fabricDirection} ${baseColor} outer layer with sculpted structure`,
    `clean base top in ${accentColor} to frame the silhouette`,
    `${profile.fitPreference} bottoms with movement and polish`,
    `${input.occasion} ready ${categories[0]?.toLowerCase() ?? "layer"}`,
    `statement ${categories[1]?.toLowerCase() ?? "piece"} that reflects ${input.mood.toLowerCase()}`
  ];

  const accessories = [
    "sculptural metal earrings",
    "stacked rings with chrome finish",
    "sleek mini bag"
  ];

  const shoes = ["pointed ankle boot", "minimal fashion sneaker"];

  return {
    id: `${Date.now()}`,
    title: pickTitle(profile, input.mood),
    vibe: `${input.mood} | ${input.occasion} | ${profile.aesthetics.slice(0, 2).join(" + ")}`,
    pieces,
    accessories,
    shoes,
    stylingNotes: `${riskNote(profile.fashionRisk)} Keep proportions intentional and let one hero item lead the look.`,
    whyItWorks: `This outfit aligns with your ${profile.styleArchetype} identity, uses ${input.budgetNote} budget logic, and pairs ${baseColor}/${accentColor} tones with ${profile.fitPreference} balance.`,
    createdAt: new Date().toISOString(),
    profileId: profile.id
  };
}
