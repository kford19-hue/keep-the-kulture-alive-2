import { Panel } from "@/components/Panel";

const editorialSections = [
  {
    title: "Black Fashion Influence",
    body: "From runway direction to everyday silhouettes, Black creators continue to define the language of fashion before mainstream systems label it as trend."
  },
  {
    title: "Streetwear Culture",
    body: "Streetwear emerged from community expression, music, and local innovation. This section tracks how style codes travel from block to global stage."
  },
  {
    title: "Emerging Designers",
    body: "Spotlight on rising voices building future-facing collections with cultural memory, technical craft, and unapologetic perspective."
  },
  {
    title: "Fashion History",
    body: "Timeline-inspired notes that connect current aesthetics to their roots, giving credit to the communities who originated the look."
  }
];

export default function KeepTheKultureAlivePage() {
  return (
    <main className="space-y-4 pb-10">
      <Panel>
        <p className="oracle-eyebrow">Editorial Hub</p>
        <h1 className="oracle-heading mt-2 text-4xl md:text-5xl">Keep the Kulture Alive</h1>
        <p className="mt-3 max-w-3xl text-zinc-300">
          A digital magazine experience honoring the culture, creativity, and historical context that
          shape fashion before the mainstream catches up.
        </p>
      </Panel>

      <section className="grid gap-4 md:grid-cols-2">
        {editorialSections.map((section) => (
          <article key={section.title} className="oracle-panel">
            <p className="oracle-eyebrow">Feature</p>
            <h2 className="oracle-heading mt-2 text-2xl">{section.title}</h2>
            <p className="mt-3 text-sm text-zinc-300">{section.body}</p>
          </article>
        ))}
      </section>

      <Panel>
        <p className="oracle-eyebrow">Magazine Note</p>
        <p className="max-w-3xl text-zinc-300">
          Style is not only visual. It is archive, authorship, and cultural intelligence. This space
          exists to keep attribution visible and innovation connected to its origin.
        </p>
      </Panel>
    </main>
  );
}
