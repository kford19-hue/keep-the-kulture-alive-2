import Link from "next/link";
import { Panel } from "@/components/Panel";

export default function HomePage() {
  return (
    <main className="space-y-4 pb-10">
      <Panel className="relative">
        <div className="absolute -right-16 top-6 hidden h-56 w-56 animate-float rounded-full border border-white/15 bg-white/5 blur-2xl md:block" />
        <p className="oracle-eyebrow">Landing</p>
        <h1 className="oracle-heading mt-3 max-w-4xl text-4xl leading-tight md:text-6xl">
          Style Intelligence for Originals.
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-300 md:text-lg">
          AI Style Oracle is your futuristic stylist and culture curator. Discover your signature
          aesthetic, build looks with intention, and honor the communities that shape fashion before
          the mainstream catches up.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/archetype-quiz" className="chrome-button inline-flex items-center">
            Start Style Reading
          </Link>
          <Link
            href="/keep-the-kulture-alive"
            className="rounded-full border border-zinc-500 px-5 py-2.5 text-sm text-zinc-200 hover:border-zinc-300"
          >
            Explore Moodboards
          </Link>
        </div>
      </Panel>
    </main>
  );
}
