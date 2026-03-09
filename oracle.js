const generateButton = document.getElementById("generate-outfit");
const result = document.getElementById("outfit-result");
const moodInput = document.getElementById("mood");
const eventInput = document.getElementById("event");
const aestheticInput = document.getElementById("aesthetic");

generateButton?.addEventListener("click", () => {
  const mood = moodInput.value.trim() || "Commanding";
  const eventType = eventInput.value.trim() || "Dinner Event";
  const aesthetic = aestheticInput.value.trim() || "Futuristic Femme";

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
