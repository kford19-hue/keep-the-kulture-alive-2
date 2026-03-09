const generateButton = document.getElementById("generate-outfit");
const generateImagesButton = document.getElementById("generate-images");
const result = document.getElementById("outfit-result");
const moodInput = document.getElementById("mood");
const eventInput = document.getElementById("event");
const aestheticInput = document.getElementById("aesthetic");
const imageGrid = document.getElementById("oracle-image-grid");
const imageStatus = document.getElementById("image-status");

function getInputs() {
  return {
    mood: moodInput.value.trim() || "Commanding",
    eventType: eventInput.value.trim() || "Dinner Event",
    aesthetic: aestheticInput.value.trim() || "Futuristic Femme"
  };
}

generateButton?.addEventListener("click", () => {
  const { mood, eventType, aesthetic } = getInputs();

  result.style.display = "block";
  result.innerHTML = `
    <p class="eyebrow">Generated Oracle Look</p>
    <h3 style="margin: 0.4rem 0 0.9rem">${mood} ${aesthetic} Edit</h3>
    <div class="feature-grid">
      <article>
        <h3>Outfit Formula</h3>
        <p>Structured hero piece, balanced layer, and sleek base for ${eventType.toLowerCase()}.</p>
      </article>
      <article>
        <h3>Styling Suggestions</h3>
        <p>Use one reflective accent, controlled silhouette contrast, and tonal black grounding.</p>
      </article>
      <article>
        <h3>Optional Accessories</h3>
        <p>Chrome hoops, mini top-handle bag, and pointed boots or clean fashion sneakers.</p>
      </article>
    </div>
  `;
});

function buildImagePrompt({ mood, eventType, aesthetic }, variant) {
  const variants = {
    0: "editorial full-body fashion shot",
    1: "street style photo with movement",
    2: "studio portrait with chrome lighting"
  };

  return [
    "high fashion outfit concept",
    `${mood.toLowerCase()} mood`,
    `${eventType.toLowerCase()} occasion`,
    `${aesthetic.toLowerCase()} aesthetic`,
    "luxury futuristic womenswear",
    "black white chrome palette",
    variants[variant],
    "clean background",
    "ultra detailed"
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

function buildSourceList(prompt, input, seed, variant) {
  const encodedPrompt = encodeURIComponent(prompt);
  const keywords = encodeURIComponent(
    `fashion,style,editorial,${input.aesthetic},${input.mood},${input.eventType}`
  );

  return [
    `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=1024&seed=${seed}&nologo=true`,
    `https://loremflickr.com/768/1024/fashion,style?lock=${seed}`,
    `https://source.unsplash.com/random/768x1024/?${keywords}&sig=${seed}`,
    `https://picsum.photos/seed/oracle-${seed}-${variant}/768/1024`
  ];
}

function createImageCard(label, prompt, sources) {
  const card = document.createElement("article");
  card.className = "oracle-image-card";

  const img = document.createElement("img");
  img.alt = label;
  img.loading = "lazy";

  let sourceIndex = 0;

  const tryNextSource = () => {
    if (sourceIndex >= sources.length) {
      img.replaceWith(Object.assign(document.createElement("div"), { className: "image-fallback" }));
      return;
    }

    img.src = sources[sourceIndex];
    sourceIndex += 1;
  };

  img.onerror = tryNextSource;
  tryNextSource();

  const title = document.createElement("p");
  title.textContent = label;

  const meta = document.createElement("small");
  meta.textContent = prompt;

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(meta);
  return card;
}

function generateImages() {
  const input = getInputs();
  const seedBase = Date.now();

  imageStatus.textContent = "Generating 3 oracle concepts...";
  renderLoading();

  const cards = [];

  for (let i = 0; i < 3; i += 1) {
    const prompt = buildImagePrompt(input, i);
    const seed = seedBase + i;
    const sources = buildSourceList(prompt, input, seed, i);
    const label = `Oracle Concept ${i + 1}`;
    cards.push(createImageCard(label, prompt, sources));
  }

  imageGrid.innerHTML = "";
  cards.forEach((card) => imageGrid.appendChild(card));
  imageStatus.textContent = "Generated concepts based on your current inputs.";
}

generateImagesButton?.addEventListener("click", generateImages);
