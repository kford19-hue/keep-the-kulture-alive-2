import { StyleProfile } from "@/types/style";

interface StyleProfileCardProps {
  profile: StyleProfile;
}

export function StyleProfileCard({ profile }: StyleProfileCardProps) {
  return (
    <section className="oracle-panel">
      <p className="oracle-eyebrow">Style DNA</p>
      <h2 className="oracle-heading mt-2 text-3xl">{profile.styleArchetype}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {profile.aesthetics.map((item) => (
          <span key={item} className="oracle-tag">
            {item}
          </span>
        ))}
      </div>
      <div className="mt-5 grid gap-3 text-sm text-zinc-200 md:grid-cols-2">
        <p>
          <span className="text-zinc-400">Fit:</span> {profile.fitPreference}
        </p>
        <p>
          <span className="text-zinc-400">Budget:</span> {profile.budget}
        </p>
        <p>
          <span className="text-zinc-400">Risk:</span> {profile.fashionRisk}
        </p>
        <p>
          <span className="text-zinc-400">Mood:</span> {profile.moodDirection}
        </p>
      </div>
    </section>
  );
}
