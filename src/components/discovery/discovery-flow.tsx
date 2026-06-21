"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  PHASE_1_QUESTIONS,
  getPhase2Questions,
} from "@/lib/discovery/questions";
import type { DiscoveryOption } from "@/lib/discovery/questions";
import {
  scoreCenterPhase,
  getDominantCenter,
  scoreTypePhase,
  getCandidateTypes,
} from "@/lib/discovery/scoring";
import type { DiscoveryResult } from "@/lib/discovery/scoring";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import { CENTER_INFO } from "@/lib/enneagram/types";
import type { Center } from "@/lib/enneagram/types";

type Phase = "intro" | "center" | "type" | "result";

const CENTER_LABEL: Record<Center, string> = {
  body: "Body Center",
  heart: "Heart Center",
  head: "Head Center",
};

export function DiscoveryFlow() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [centerAnswers, setCenterAnswers] = useState<DiscoveryOption[]>([]);
  const [typeAnswers, setTypeAnswers] = useState<DiscoveryOption[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [dominantCenter, setDominantCenter] = useState<Center | null>(null);
  const [result, setResult] = useState<DiscoveryResult | null>(null);

  const handleStart = useCallback(() => {
    setPhase("center");
    setCurrentQ(0);
    setCenterAnswers([]);
    setTypeAnswers([]);
    setDominantCenter(null);
    setResult(null);
  }, []);

  const handleCenterAnswer = useCallback(
    (option: DiscoveryOption) => {
      const newAnswers = [...centerAnswers, option];
      setCenterAnswers(newAnswers);

      if (currentQ < PHASE_1_QUESTIONS.length - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        const scores = scoreCenterPhase(newAnswers);
        const center = getDominantCenter(scores);
        setDominantCenter(center);
        setCurrentQ(0);
        setPhase("type");
      }
    },
    [centerAnswers, currentQ]
  );

  const handleTypeAnswer = useCallback(
    (option: DiscoveryOption) => {
      if (!dominantCenter) return;
      const newAnswers = [...typeAnswers, option];
      setTypeAnswers(newAnswers);

      const phase2Questions = getPhase2Questions(dominantCenter);
      if (currentQ < phase2Questions.length - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        const centerScores = scoreCenterPhase(centerAnswers);
        const typeScores = scoreTypePhase(newAnswers, dominantCenter);
        const candidateTypes = getCandidateTypes(typeScores);
        setResult({
          center: dominantCenter,
          candidateTypes,
          centerScores,
          typeScores,
        });
        setPhase("result");
      }
    },
    [typeAnswers, currentQ, dominantCenter, centerAnswers]
  );

  if (phase === "intro") {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-border p-6 bg-surface-sunken">
          <h2 className="font-serif text-h3 font-semibold text-ink mb-3">
            Before you begin
          </h2>
          <ul className="space-y-2 text-body text-ink-muted">
            <li>This is not a test — there are no right or wrong answers.</li>
            <li>
              It will not tell you &ldquo;what you are.&rdquo; It will suggest
              types worth exploring.
            </li>
            <li>
              Answer based on your deep patterns — not how you act in your best
              moments.
            </li>
            <li>The whole process takes about 3 minutes.</li>
          </ul>
        </div>
        <button
          onClick={handleStart}
          className="rounded-full bg-brand px-8 py-3 text-ui font-medium text-white hover:bg-brand-hover transition-colors"
        >
          Begin
        </button>
      </div>
    );
  }

  if (phase === "center") {
    const question = PHASE_1_QUESTIONS[currentQ];
    const total = PHASE_1_QUESTIONS.length;
    return (
      <QuestionCard
        phase={1}
        current={currentQ + 1}
        total={total}
        question={question.text}
        options={question.options}
        onSelect={handleCenterAnswer}
      />
    );
  }

  if (phase === "type" && dominantCenter) {
    const questions = getPhase2Questions(dominantCenter);
    const question = questions[currentQ];
    const total = questions.length;
    return (
      <div>
        <div className="mb-6 rounded-lg bg-brand-soft px-4 py-2 text-small text-brand">
          Exploring the {CENTER_LABEL[dominantCenter]}
        </div>
        <QuestionCard
          phase={2}
          current={currentQ + 1}
          total={total}
          question={question.text}
          options={question.options}
          onSelect={handleTypeAnswer}
        />
      </div>
    );
  }

  if (phase === "result" && result) {
    return <ResultView result={result} onRestart={handleStart} />;
  }

  return null;
}

function QuestionCard({
  phase,
  current,
  total,
  question,
  options,
  onSelect,
}: {
  phase: number;
  current: number;
  total: number;
  question: string;
  options: DiscoveryOption[];
  onSelect: (option: DiscoveryOption) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-small text-ink-muted">
          Phase {phase} — Question {current} of {total}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-6 rounded-full ${
                i < current ? "bg-brand" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      <h2 className="font-serif text-h2 font-semibold text-ink">{question}</h2>

      <div className="space-y-3">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => onSelect(option)}
            className="w-full text-left rounded-xl border border-border p-5 hover:border-brand hover:shadow-card transition-all"
          >
            <span className="text-body text-ink">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultView({
  result,
  onRestart,
}: {
  result: DiscoveryResult;
  onRestart: () => void;
}) {
  const centerInfo = CENTER_INFO[result.center];

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-border p-6">
        <p className="text-small text-ink-muted mb-2">
          Your responses suggest you may lead with the
        </p>
        <h2
          className={`font-serif text-h1 font-bold text-center-${result.center}-ink mb-3`}
        >
          {centerInfo.label}
        </h2>
        <p className="text-body text-ink-muted">{centerInfo.theme}</p>
      </div>

      <div>
        <h3 className="font-serif text-h3 font-semibold text-ink mb-4">
          Types to explore
        </h3>
        <p className="text-body text-ink-muted mb-6">
          Based on your answers, you may want to start with these types. Read
          each one and see what resonates — no test can replace your own
          reflection.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {result.candidateTypes.map((n) => {
            const info = TYPE_INFO[n as keyof typeof TYPE_INFO];
            if (!info) return null;
            return (
              <Link
                key={n}
                href={`/enneagram/types/${n}`}
                className={`rounded-xl border border-border p-5 hover:border-center-${result.center} hover:shadow-card transition-all`}
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className={`font-serif text-h2 font-bold text-center-${result.center}-ink`}
                  >
                    {n}
                  </span>
                  <span className="text-ui font-medium text-ink">
                    {info.name}
                  </span>
                </div>
                <p className="text-small text-ink-muted">{info.brief}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl bg-surface-sunken p-6">
        <h3 className="font-serif text-h3 font-semibold text-ink mb-2">
          Remember
        </h3>
        <p className="text-body text-ink-muted">
          This is a starting point, not a verdict. Many people relate to 2-3
          types. The Enneagram is about motivation — read each type deeply and
          see which core fear and desire resonate most. If none of these feel
          right, explore the other centers too.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRestart}
          className="rounded-full border border-border px-6 py-2.5 text-ui font-medium text-ink hover:bg-surface-sunken transition-colors"
        >
          Start over
        </button>
        <Link
          href="/enneagram/types"
          className="rounded-full bg-brand px-6 py-2.5 text-ui font-medium text-white text-center hover:bg-brand-hover transition-colors"
        >
          Browse all types
        </Link>
      </div>
    </div>
  );
}
