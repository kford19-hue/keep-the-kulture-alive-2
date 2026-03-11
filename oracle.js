const generateButton = document.getElementById("generate-outfit");
const generateImagesButton = document.getElementById("generate-images");
const result = document.getElementById("outfit-result");
const moodInput = document.getElementById("mood");
const eventInput = document.getElementById("event");
const aestheticInput = document.getElementById("aesthetic");
const imageGrid = document.getElementById("oracle-image-grid");
const imageStatus = document.getElementById("image-status");

const moodMap = {
  commanding: {
    silhouette: "sharp-shouldered outer layer with precise tailoring",
    texture: "polished leather or structured satin",
    palette: "obsidian, liquid silver, and bright white",
    formula: "Use a strong vertical line with one sculpted hero piece and a controlled waist.",
    styling: "Keep jewelry architectural and let the silhouette do most of the talking.",
    accessories: "chrome cuff, angular mini bag, pointed knee boot",
    copy: "This mood reads as authoritative and camera-ready, so the outfit should feel exact rather than soft."
  },
  playful: {
    silhouette: "cropped volume with movement through the hemline",
    texture: "glossy nylon, mesh, and reflective trim",
    palette: "graphite, pearl, and electric chrome accents",
    formula: "Break the look with one unexpected proportion and a lighter top layer.",
    styling: "Use contrast in scale so the outfit feels energetic instead of chaotic.",
    accessories: "stacked rings, compact shoulder bag, futuristic sneaker",
    copy: "This mood needs lift and motion, so the look leans expressive, youthful, and high-energy."
  },
  mysterious: {
    silhouette: "elongated column with fluid layering",
    texture: "smoked mesh, matte jersey, and dark metallic finish",
    palette: "black smoke, pewter, and moonlit grey",
    formula: "Keep the base monochrome and use shine only in small, deliberate moments.",
    styling: "Prioritize drape, shadow, and narrow lines that reveal shape slowly.",
    accessories: "slim eyewear, liquid-metal earrings, sleek clutch",
    copy: "This direction works best when the outfit feels cinematic and controlled rather than loud."
  },
  "soft power": {
    silhouette: "clean feminine structure with a fluid second layer",
    texture: "brushed knit, satin, and soft gloss finishes",
    palette: "bone, pearl, gunmetal, and onyx",
    formula: "Mix a refined fitted element with one fluid layer to balance strength and ease.",
    styling: "The finish should look expensive but never overworked.",
    accessories: "sculptural hoops, top-handle bag, low slingback boot",
    copy: "This mood should feel elegant and persuasive, with confidence expressed through refinement."
  }
};

const eventMap = {
  "dinner event": {
    setting: "low-lit dinner venue",
    practicality: "Prioritize elevated evening textures and a compact bag that reads polished from the table."
  },
  brunch: {
    setting: "sunlit terrace brunch",
    practicality: "The look should feel easy in daylight, with lighter texture contrast and cleaner accessories."
  },
  "gallery night": {
    setting: "contemporary gallery opening",
    practicality: "Lean directional and art-aware, with stronger shape language and restrained color."
  },
  "office day": {
    setting: "modern city office",
    practicality: "Balance authority with wearability so the outfit can hold a full schedule without losing edge."
  },
  "content shoot": {
    setting: "editorial content set",
    practicality: "Use sharper styling punctuation and camera-friendly contrast so the look translates on screen."
  },
  "travel day": {
    setting: "airport lounge and arrival moment",
    practicality: "Keep the structure intentional, but make comfort and layering do more of the work."
  }
};

const aestheticMap = {
  "futuristic femme": {
    garment: "sleek corseted jacket over engineered separates",
    details: "chrome edge lighting, minimal seams, sculpted futurist tailoring"
  },
  "street luxe": {
    garment: "luxury bomber with fluid cargo tailoring",
    details: "street-coded volume, premium fabrication, and directional hardware"
  },
  "edgy minimal": {
    garment: "monochrome fitted base with razor-clean outer structure",
    details: "reductive styling, hard lines, and minimal but expensive-looking finish"
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

function getInputs() {
  return {
    mood: moodInput.value.trim() || "Commanding",
    eventType: eventInput.value.trim() || "Dinner Event",
    aesthetic: aestheticInput.value.trim() || "Futuristic Femme"
  };
}

function normalize(value) {
  return value.trim().toLowerCase();
}

function getMoodProfile(mood) {
  return moodMap[normalize(mood)] || moodMap.commanding;
}

function getEventProfile(eventType) {
  return eventMap[normalize(eventType)] || {
    setting: `${eventType.toLowerCase()} environment`,
    practicality: "The styling should match the occasion without losing the luxury-tech visual language."
  };
}

function getAestheticProfile(aesthetic) {
  return aestheticMap[normalize(aesthetic)] || {
    garment: `${aesthetic.toLowerCase()} statement look`,
    details: "fashion-forward tailoring, elevated finishes, and futuristic balance"
  };
}

function buildLookTitle(input) {
  return `${input.mood} ${input.aesthetic} Oracle`;
}

function buildLookContent(input) {
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

function renderOutfit() {
  const input = getInputs();
  const content = buildLookContent(input);

  result.style.display = "block";
  result.innerHTML = `
    <p class="eyebrow">Generated Oracle Look</p>
    <h3 style="margin: 0.4rem 0 0.5rem">${content.title}</h3>
    <p style="margin: 0 0 1rem">${content.description}</p>
    <div class="feature-grid">
      <article>
        <h3>Outfit Formula</h3>
        <p>${content.formula}</p>
      </article>
      <article>
        <h3>Styling Suggestions</h3>
        <p>${content.styling}</p>
      </article>
      <article>
        <h3>Optional Accessories</h3>
        <p>${content.accessories}</p>
      </article>
    </div>
  `;
}

generateButton?.addEventListener("click", renderOutfit);

function buildImagePrompt(input, variant) {
  const moodProfile = getMoodProfile(input.mood);
  const eventProfile = getEventProfile(input.eventType);
  const aestheticProfile = getAestheticProfile(input.aesthetic);
  const shotTypes = [
    "full body editorial fashion photograph",
    "runway-style portrait with motion",
    "luxury campaign portrait with studio chrome reflections"
  ];

  return [
    "AI fashion campaign image",
    "futuristic female model",
    `wearing ${aestheticProfile.garment}`,
    `${moodProfile.silhouette}`,
    `${moodProfile.texture}`,
    `${moodProfile.palette} palette`,
    `${input.mood.toLowerCase()} expression`,
    `${input.aesthetic.toLowerCase()} styling`,
    `set in ${eventProfile.setting}`,
    aestheticProfile.details,
    shotTypes[variant],
    "ultra detailed",
    "cinematic lighting",
    "high fashion",
    "no crowd",
    "single model",
    "full outfit visible"
  ].join(", ");
}

function renderLoading() {
  imageGrid.innerHTML = "";
  for (let i = 0; i < 3; i += 1) {
    const card = document.createElement("article");
    card.className = "oracle-image-card loading";
    card.innerHTML = `<div class="oracle-image-frame"></div><p>Generating concept ${i + 1}...</p>`;
    imageGrid.appendChild(card);
  }
}

function createImageCard(label, prompt, seed) {
  const card = document.createElement("article");
  card.className = "oracle-image-card";

  const img = document.createElement("img");
  img.alt = `${label} generated from Oracle prompt`;
  img.loading = "lazy";
  img.referrerPolicy = "no-referrer";

  const title = document.createElement("p");
  title.textContent = label;

  const meta = document.createElement("small");
  meta.textContent = prompt;

  const error = document.createElement("small");
  error.className = "image-error";
  error.textContent =
    "Image generation failed for this concept. Try again or adjust the mood, event, or aesthetic.";
  error.style.display = "none";

  img.onerror = () => {
    img.replaceWith(Object.assign(document.createElement("div"), { className: "image-fallback" }));
    error.style.display = "block";
  };

  const encodedPrompt = encodeURIComponent(prompt);
  img.src =
    `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=1024&seed=${seed}` +
    "&model=flux&enhance=true&nologo=true&private=true";

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(meta);
  card.appendChild(error);
  return card;
}

function generateImages() {
  const input = getInputs();
  const seedBase = Date.now();

  imageStatus.textContent = "Generating AI model concepts from your selected outfit direction...";
  renderLoading();

  const cards = [];

  for (let i = 0; i < 3; i += 1) {
    const prompt = buildImagePrompt(input, i);
    const label = `Oracle Concept ${i + 1}`;
    cards.push(createImageCard(label, prompt, seedBase + i));
  }

  imageGrid.innerHTML = "";
  cards.forEach((card) => imageGrid.appendChild(card));
  imageStatus.textContent = "AI model concepts generated from your current Oracle inputs.";
}

generateImagesButton?.addEventListener("click", generateImages);
