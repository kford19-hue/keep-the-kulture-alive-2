# AI Style Oracle

Next.js + TypeScript + Tailwind build for the smart styling system.

## Features

- Multi-step style profile quiz
- Style archetype generation + dashboard
- AI outfit generator (mock service layer, API-ready)
- Saved looks vault (client persistence)
- Moodboard inspiration feed (save/unsave)
- Keep the Kulture Alive module (expansion-ready architecture)

## Tech

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Zustand (persisted local state)

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Key Paths

- `src/data/*` seeded quiz/archetype/moodboard data
- `src/types/style.ts` core contracts
- `src/lib/generateArchetype.ts` archetype logic
- `src/lib/generateOutfit.ts` mock recommendation engine
- `src/store/styleStore.ts` persisted client state
