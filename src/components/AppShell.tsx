"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const links = [
  { href: "/archetype-quiz", label: "Archetype Quiz" },
  { href: "/outfit-oracle", label: "Outfit Oracle" },
  { href: "/keep-the-kulture-alive", label: "Keep the Kulture Alive" },
  { href: "/bougie-on-a-budget", label: "Bougie on a Budget" }
];

export function AppShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="mx-auto min-h-screen w-[min(1180px,92vw)] py-5 md:py-7">
      <header className="sticky top-3 z-30 mb-6 rounded-3xl border border-white/20 bg-black/65 px-4 py-3 shadow-panel backdrop-blur-xl md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            <span className="text-xs font-semibold tracking-[0.28em] text-zinc-100">AI STYLE ORACLE</span>
          </Link>
          <nav className="flex flex-wrap gap-2 text-sm">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full border px-3 py-1.5 transition ${
                    active
                      ? "border-zinc-100 bg-white text-black"
                      : "border-zinc-700 text-zinc-300 hover:border-zinc-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
