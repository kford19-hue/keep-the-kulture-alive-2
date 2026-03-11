interface SignalStatProps {
  label: string;
  value: string;
}

export function SignalStat({ label, value }: SignalStatProps) {
  return (
    <article className="rounded-2xl border border-white/20 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">{label}</p>
      <p className="mt-2 font-display text-2xl text-white">{value}</p>
    </article>
  );
}
