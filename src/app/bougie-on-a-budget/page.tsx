import { Panel } from "@/components/Panel";

const budgetIdeas = [
  {
    title: "Budget Outfit Ideas",
    points: [
      "Monochrome blazer + straight-leg denim + structured tote",
      "Satin midi skirt + fitted tee + metallic accessories",
      "Oversized shirt + tailored trousers + pointed flats"
    ]
  },
  {
    title: "Smart Styling Tricks",
    points: [
      "Prioritize fit tailoring over logo-heavy buys.",
      "Use one statement accessory to elevate basics.",
      "Repeat hero pieces with different layering logic."
    ]
  },
  {
    title: "Affordable Brand Suggestions",
    points: ["Zara", "Mango", "COS", "Aritzia sale edit", "ASOS design line"]
  },
  {
    title: "High Fashion Look for Less",
    points: [
      "Pair thrifted leather with modern chrome jewelry.",
      "Use tonal black layering for instant editorial polish.",
      "Mix budget staples with one premium anchor piece."
    ]
  }
];

export default function BougieOnABudgetPage() {
  return (
    <main className="space-y-4 pb-10">
      <Panel>
        <p className="oracle-eyebrow">Affordable Style</p>
        <h1 className="oracle-heading mt-2 text-4xl md:text-5xl">Bougie on a Budget</h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          Premium-looking style strategies with practical spend limits. Build elevated looks without
          compromising your aesthetic direction.
        </p>
      </Panel>

      <section className="grid gap-4 md:grid-cols-2">
        {budgetIdeas.map((idea) => (
          <article key={idea.title} className="oracle-panel">
            <h2 className="oracle-heading text-2xl">{idea.title}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {idea.points.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
