import { QuizQuestion } from "@/types/style";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    label: "Which aesthetics pull you in most?",
    type: "multi",
    key: "aesthetics",
    options: [
      "streetwear",
      "soft glam",
      "futuristic femme",
      "edgy minimal",
      "casual luxe",
      "artsy rebel"
    ]
  },
  {
    id: "q2",
    label: "What colors do you wear on repeat?",
    type: "multi",
    key: "favoriteColors",
    options: ["black", "white", "silver", "charcoal", "cream", "red", "electric blue"]
  },
  {
    id: "q3",
    label: "How do you prefer your fit?",
    type: "single",
    key: "fitPreference",
    options: ["oversized", "fitted", "balanced", "layered"]
  },
  {
    id: "q4",
    label: "What does your weekly lifestyle look like?",
    type: "single",
    key: "lifestyle",
    options: [
      "creative + social",
      "office + city",
      "remote + casual",
      "nightlife + events"
    ]
  },
  {
    id: "q5",
    label: "What budget range feels most realistic?",
    type: "single",
    key: "budget",
    options: ["low", "medium", "high"]
  },
  {
    id: "q6",
    label: "Your fashion risk level?",
    type: "single",
    key: "fashionRisk",
    options: ["safe", "moderate", "experimental"]
  },
  {
    id: "q7",
    label: "Who inspires your fashion eye?",
    type: "multi",
    key: "inspirations",
    options: [
      "street style creators",
      "runway editorials",
      "music icons",
      "vintage archives",
      "Black fashion pioneers"
    ]
  },
  {
    id: "q8",
    label: "What occasions do you dress for most?",
    type: "multi",
    key: "occasions",
    options: [
      "everyday",
      "work",
      "going out",
      "creative events",
      "travel",
      "weekend brunch"
    ]
  },
  {
    id: "q9",
    label: "How do you want to feel in your clothes?",
    type: "multi",
    key: "styleGoals",
    options: ["look unique", "feel confident", "stand out", "feel polished", "feel powerful"]
  },
  {
    id: "q10",
    label: "What fashion mood are you leaning toward?",
    type: "single",
    key: "moodDirection",
    options: ["bold", "effortless", "sensual", "artistic", "experimental"]
  }
];
