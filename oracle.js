const generateButton = document.getElementById("generate-outfit");
const generateImagesButton = document.getElementById("generate-images");
const result = document.getElementById("outfit-result");
const moodInput = document.getElementById("mood");
const eventInput = document.getElementById("event");
const aestheticInput = document.getElementById("aesthetic");
const imageGrid = document.getElementById("oracle-image-grid");
const imageStatus = document.getElementById("image-status");

const moodMap = {
  commanding:
    "This direction reads precise and high-authority, so the outfit should use sharp structure and polished contrast.",
  playful:
    "This direction needs motion and lift, so the outfit should use lighter contrast and more expressive proportion.",
  mysterious:
    "This direction works best with shadow, drape, and slow reveal rather than obvious statement pieces.",
  "soft power":
    "This direction should feel elegant and persuasive, using refined styling instead of aggressive contrast."
};

function getInputs() {
  return {
    mood: moodInput.value.trim() || "Commanding",
    eventType: eventInput.value.trim() || "Dinner Event",
    aesthetic: aestheticInput.value.trim() || "Futuristic Femme"
  };
}

function getDescription({ mood, eventType, aesthetic }) {
  const moodDescription = moodMap[mood.trim().toLowerCase()] || moodMap.commanding;
  return `${moodDescription} For ${eventType.toLowerCase()}, the Oracle pushes ${aesthetic.toLowerCase()} styling with a black, white, and chrome fashion-tech finish.`;
}

generateButton?.addEventListener("click", () => {
  const input = getInputs();

  result.style.display = "block";
  result.innerHTML = `
    <p class="eyebrow">Generated Oracle Look</p>
    <h3 style="margin: 0.4rem 0 0.5rem">${input.mood} ${input.aesthetic} Oracle</h3>
    <p style="margin: 0 0 1rem">${getDescription(input)}</p>
    <div class="feature-grid">
      <article>
        <h3>Outfit Formula</h3>
        <p>${input.aesthetic} structure tailored for ${input.eventType.toLowerCase()} with a stronger silhouette lead.</p>
      </article>
      <article>
        <h3>Styling Suggestions</h3>
        <p>Keep the finish editorial and controlled so the outfit stays premium rather than overloaded.</p>
      </article>
      <article>
        <h3>Optional Accessories</h3>
        <p>Chrome jewelry, a directional bag, and sleek shoes with a sharp shape language.</p>
      </article>
    </div>
  `;
});

generateImagesButton?.addEventListener("click", () => {
  imageGrid.innerHTML = "";
  imageStatus.innerHTML =
    'This file is only the static demo. Start the Next app and open <strong>http://localhost:3000/outfit-oracle</strong> to use backend AI image generation.';
});
