export interface OracleInput {
  mood: string;
  eventType: string;
  aesthetic: string;
}

interface MoodProfile {
  silhouette: string;
  texture: string;
  palette: string;
  formula: string;
  styling: string;
  accessories: string;
  copy: string;
}

interface EventProfile {
  setting: string;
  practicality: string;
}

interface AestheticProfile {
  garment: string;
  details: string;
}

const moodMap: Record<string, MoodProfile> = {
  commanding: {
    silhouette: "sharp-shouldered outer layer with precise tailoring",
    texture: "polished leather or structured satin",
    palette: "obsidian, liquid silver, and optic white",
    formula: "Use a strong vertical line with one sculpted hero piece and a controlled waist.",
    styling: "Keep jewelry architectural and let the silhouette do most of the talking.",
    accessories: "chrome cuff, angular mini bag, pointed knee boot",
    copy:
      "This mood reads as authoritative and camera-ready, so the outfit should feel exact rather than soft."
  },
  playful: {
    silhouette: "cropped volume with movement through the hemline",
    texture: "glossy nylon, mesh, and reflective trim",
    palette: "graphite, pearl, and electric chrome accents",
    formula: "Break the look with one unexpected proportion and a lighter top layer.",
    styling: "Use contrast in scale so the outfit feels energetic instead of chaotic.",
    accessories: "stacked rings, compact shoulder bag, futuristic sneaker",
    copy:
      "This mood needs lift and motion, so the look leans expressive, youthful, and high-energy."
  },
  mysterious: {
    silhouette: "elongated column with fluid layering",
    texture: "smoked mesh, matte jersey, and dark metallic finish",
    palette: "black smoke, pewter, and moonlit grey",
    formula: "Keep the base monochrome and use shine only in small, deliberate moments.",
    styling: "Prioritize drape, shadow, and narrow lines that reveal shape slowly.",
    accessories: "slim eyewear, liquid-metal earrings, sleek clutch",
    copy:
      "This direction works best when the outfit feels cinematic and controlled rather than loud."
  },
  "soft power": {
    silhouette: "clean feminine structure with a fluid second layer",
    texture: "brushed knit, satin, and soft gloss finishes",
    palette: "bone, pearl, gunmetal, and onyx",
    formula:
      "Mix a refined fitted element with one fluid layer to balance strength and ease.",
    styling: "The finish should look expensive but never overworked.",
    accessories: "sculptural hoops, top-handle bag, low slingback boot",
    copy:
      "This mood should feel elegant and persuasive, with confidence expressed through refinement."
  }
};

const eventMap: Record<string, EventProfile> = {
  "dinner event": {
    setting: "a low-lit dinner venue",
    practicality:
      "Prioritize elevated evening textures and a compact bag that reads polished from the table."
  },
  brunch: {
    setting: "a sunlit terrace brunch",
    practicality:
      "The look should feel easy in daylight, with lighter texture contrast and cleaner accessories."
  },
  "gallery night": {
    setting: "a contemporary gallery opening",
    practicality:
      "Lean directional and art-aware, with stronger shape language and restrained color."
  },
  "office day": {
    setting: "a modern city office",
    practicality:
      "Balance authority with wearability so the outfit can hold a full schedule without losing edge."
  },
  "content shoot": {
    setting: "an editorial content set",
    practicality:
      "Use sharper styling punctuation and camera-friendly contrast so the look translates on screen."
  },
  "travel day": {
    setting: "an airport lounge and arrival moment",
    practicality:
      "Keep the structure intentional, but make comfort and layering do more of the work."
  }
};

const aestheticMap: Record<string, AestheticProfile> = {
  "futuristic femme": {
    garment: "a sleek corseted jacket over engineered separates",
    details: "chrome edge lighting, minimal seams, and sculpted futurist tailoring"
  },
  "street luxe": {
    garment: "a luxury bomber with fluid cargo tailoring",
    details: "street-coded volume, premium fabrication, and directional hardware"
  },
  "edgy minimal": {
    garment: "a monochrome fitted base with razor-clean outer structure",
    details: "reductive styling, hard lines, and a minimal but expensive-looking finish"
  },
  "soft glam": {
    garment: "liquid drape layered under a polished statement jacket",
    details: "soft sheen, feminine architecture, and controlled glamour"
  },
  chic: {
    garment: "tailored separates with a refined hero coat",
    details: "editorial polish, quiet luxury balance, and clean proportion"
  }
};

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function getMoodProfile(mood: string): MoodProfile {
  return moodMap[normalize(mood)] ?? moodMap.commanding;
}

function getEventProfile(eventType: string): EventProfile {
  return (
    eventMap[normalize(eventType)] ?? {
      setting: `${eventType.toLowerCase()} environment`,
      practicality:
        "The styling should match the occasion without losing the luxury-tech visual language."
    }
  );
}

function getAestheticProfile(aesthetic: string): AestheticProfile {
  return (
    aestheticMap[normalize(aesthetic)] ?? {
      garment: `${aesthetic.toLowerCase()} statement look`,
      details: "fashion-forward tailoring, elevated finishes, and futuristic balance"
    }
  );
}

export function buildLookTitle(input: OracleInput) {
  return `${input.mood} ${input.aesthetic} Oracle`;
}

export function buildLookContent(input: OracleInput) {
  const moodProfile = getMoodProfile(input.mood);
  const eventProfile = getEventProfile(input.eventType);
  const aestheticProfile = getAestheticProfile(input.aesthetic);

  return {
    title: buildLookTitle(input),
    formula: `${aestheticProfile.garment} anchored by ${moodProfile.silhouette}. ${moodProfile.formula}`,
    styling: `${moodProfile.styling} ${eventProfile.practicality}`,
    accessories: moodProfile.accessories,
    description: `${moodProfile.copy} For ${eventProfile.setting}, push ${aestheticProfile.details} in a ${moodProfile.palette} palette with ${moodProfile.texture}.`
  };
}

export function buildImagePrompt(input: OracleInput, variant: number) {
  const moodProfile = getMoodProfile(input.mood);
  const eventProfile = getEventProfile(input.eventType);
  const aestheticProfile = getAestheticProfile(input.aesthetic);
  const shotTypes = [
    "full-body editorial fashion photograph",
    "runway-style portrait with motion",
    "luxury campaign portrait with studio chrome reflections"
  ];

  return [
    "AI fashion campaign image",
    "single futuristic female model",
    `wearing ${aestheticProfile.garment}`,
    moodProfile.silhouette,
    moodProfile.texture,
    `${moodProfile.palette} palette`,
    `${input.mood.toLowerCase()} expression`,
    `${input.aesthetic.toLowerCase()} styling`,
    `set in ${eventProfile.setting}`,
    aestheticProfile.details,
    shotTypes[variant] ?? shotTypes[0],
    "ultra detailed",
    "cinematic lighting",
    "high fashion",
    "full outfit visible",
    "no crowd",
    "no collage",
    "no text"
  ].join(", ");
}
