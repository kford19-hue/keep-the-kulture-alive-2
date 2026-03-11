import { archetypeLibrary } from "@/data/archetypes";
import { StyleArchetype, StyleProfile } from "@/types/style";

const includesAny = (source: string[], values: string[]) => values.some((value) => source.includes(value));

export function generateArchetype(profile: Omit<StyleProfile, "styleArchetype" | "id">): StyleArchetype {
  const aesthetics = profile.aesthetics;

  if (includesAny(aesthetics, ["streetwear", "soft glam", "futuristic femme"])) {
    return archetypeLibrary[0];
  }

  if (includesAny(aesthetics, ["edgy minimal", "casual luxe"])) {
    return archetypeLibrary[1];
  }

  return archetypeLibrary[2];
}
