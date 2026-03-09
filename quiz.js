const energyButtons = document.querySelectorAll("#energy-buttons button");
const silhouetteButtons = document.querySelectorAll("#silhouette-buttons button");
const revealButton = document.getElementById("reveal-archetype");
const resultBox = document.getElementById("archetype-result");

let energy = "";
let silhouette = "";

function bindSingleSelect(buttons, setter) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      setter(button.textContent.trim());
    });
  });
}

bindSingleSelect(energyButtons, (value) => {
  energy = value;
});

bindSingleSelect(silhouetteButtons, (value) => {
  silhouette = value;
});

function getArchetype(energyValue, silhouetteValue) {
  const signature = `${energyValue} ${silhouetteValue}`.toLowerCase();

  if (signature.includes("command") || signature.includes("street")) {
    return "Street Luxe Visionary";
  }

  if (signature.includes("soft") || signature.includes("futur") || signature.includes("fluid")) {
    return "Futuristic Femme Architect";
  }

  return "Edgy Minimal Storyteller";
}

revealButton?.addEventListener("click", () => {
  if (!energy || !silhouette) {
    resultBox.style.display = "block";
    resultBox.innerHTML = "<p>Select one energy and one silhouette to reveal your archetype.</p>";
    return;
  }

  const archetype = getArchetype(energy, silhouette);

  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <p class="eyebrow">Result</p>
    <h3 style="margin: 0.4rem 0 0.5rem">${archetype}</h3>
    <p>Your profile leans ${energy.toLowerCase()} with ${silhouette.toLowerCase()} structure.</p>
  `;
});
