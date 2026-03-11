"use client";

import { quizQuestions } from "@/data/quizQuestions";
import { QuizAnswers } from "@/lib/buildStyleProfile";
import { useMemo, useState } from "react";
import { ChromeButton } from "@/components/oracle/ChromeButton";

interface QuizStepperProps {
  onComplete: (answers: QuizAnswers) => void;
}

export function QuizStepper({ onComplete }: QuizStepperProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const question = quizQuestions[index];
  const progress = Math.round(((index + 1) / quizQuestions.length) * 100);

  const selectedValues = useMemo(() => {
    const value = answers[question.key];
    if (!value) {
      return [];
    }
    return Array.isArray(value) ? value : [value];
  }, [answers, question.key]);

  const toggleAnswer = (option: string) => {
    if (question.type === "single") {
      setAnswers((prev) => ({ ...prev, [question.key]: option }));
      return;
    }

    setAnswers((prev) => {
      const current = prev[question.key];
      const list = Array.isArray(current) ? current : [];
      if (list.includes(option)) {
        return { ...prev, [question.key]: list.filter((item) => item !== option) };
      }
      return { ...prev, [question.key]: [...list, option] };
    });
  };

  const canContinue = selectedValues.length > 0;

  const next = () => {
    if (!canContinue) {
      return;
    }

    if (index === quizQuestions.length - 1) {
      onComplete(answers);
      return;
    }

    setIndex((prev) => prev + 1);
  };

  const previous = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="oracle-panel p-6 md:p-8">
      <div className="mb-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="oracle-eyebrow">Style Calibration</p>
          <span className="oracle-tag">{progress}% complete</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-900/90">
          <div
            className="h-full rounded-full bg-chrome-gradient transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-zinc-400">
          Question {index + 1} of {quizQuestions.length}
        </p>
      </div>

      <h2 className="oracle-heading mb-5 text-3xl md:text-4xl">{question.label}</h2>

      <div className="grid gap-2 md:grid-cols-2">
        {question.options.map((option) => {
          const active = selectedValues.includes(option);
          return (
            <button
              type="button"
              key={option}
              onClick={() => toggleAnswer(option)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition md:text-base ${
                active
                  ? "border-zinc-100 bg-white text-black"
                  : "border-zinc-700 bg-black/30 text-zinc-200 hover:border-zinc-400"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={previous}
          disabled={index === 0}
          className="rounded-full border border-zinc-600 px-4 py-2 text-sm text-zinc-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        <ChromeButton onClick={next} disabled={!canContinue}>
          {index === quizQuestions.length - 1 ? "Reveal My Style Oracle" : "Continue"}
        </ChromeButton>
      </div>
    </div>
  );
}
