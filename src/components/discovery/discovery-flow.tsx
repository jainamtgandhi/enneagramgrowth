"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useMyType } from "@/contexts/my-type-context";
import type { EnneagramType } from "@/lib/enneagram/types";
import {
  PHASE_1_QUESTIONS,
  getPhase2Questions,
  getPhase3Questions,
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

type Phase = "intro" | "center" | "type" | "confirm" | "result";

const CENTER_LABEL: Record<Center, string> = {
  body: "Body Center",
  heart: "Heart Center",
  head: "Head Center",
};

const PHASE_NAMES: Record<string, string> = {
  center: "Finding your center",
  type: "Exploring your type",
  confirm: "Going deeper",
};

export function DiscoveryFlow() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [centerAnswers, setCenterAnswers] = useState<DiscoveryOption[]>([]);
  const [typeAnswers, setTypeAnswers] = useState<DiscoveryOption[]>([]);
  const [confirmAnswers, setConfirmAnswers] = useState<DiscoveryOption[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [dominantCenter, setDominantCenter] = useState<Center | null>(null);
  const [result, setResult] = useState<DiscoveryResult | null>(null);

  const totalQuestions = dominantCenter
    ? PHASE_1_QUESTIONS.length +
      getPhase2Questions(dominantCenter).length +
      getPhase3Questions(dominantCenter).length
    : 30;

  const answeredSoFar =
    centerAnswers.length + typeAnswers.length + confirmAnswers.length;

  const handleStart = useCallback(() => {
    setPhase("center");
    setCurrentQ(0);
    setCenterAnswers([]);
    setTypeAnswers([]);
    setConfirmAnswers([]);
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
        setCurrentQ(0);
        setPhase("confirm");
      }
    },
    [typeAnswers, currentQ, dominantCenter]
  );

  const handleConfirmAnswer = useCallback(
    (option: DiscoveryOption) => {
      if (!dominantCenter) return;
      const newAnswers = [...confirmAnswers, option];
      setConfirmAnswers(newAnswers);

      const phase3Questions = getPhase3Questions(dominantCenter);
      if (currentQ < phase3Questions.length - 1) {
        setCurrentQ((q) => q + 1);
      } else {
        const centerScores = scoreCenterPhase(centerAnswers);
        const allTypeAnswers = [...typeAnswers, ...newAnswers];
        const typeScores = scoreTypePhase(allTypeAnswers, dominantCenter);
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
    [confirmAnswers, currentQ, dominantCenter, centerAnswers, typeAnswers]
  );

  if (phase === "intro") {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-border p-6 bg-surface-sunken">
          <h2 className="font-serif text-h3 font-semibold text-ink mb-3">
            Before you begin
          </h2>
          <ul className="space-y-2 text-body text-ink-muted">
            <li>This is not a test; there are no right or wrong answers.</li>
            <li>
              It will not tell you &ldquo;what you are.&rdquo; It will suggest
              types worth exploring.
            </li>
            <li>
              Answer based on your deep patterns, not how you act in your best
              moments, but how you tend to be when you&apos;re not trying.
            </li>
            <li>30 questions across three phases. Takes about 10 minutes.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border p-6 bg-surface">
          <h3 className="font-serif text-h4 font-semibold text-ink mb-2">
            Three phases
          </h3>
          <div className="space-y-3 text-body text-ink-muted">
            <div className="flex gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-soft text-small font-semibold text-brand shrink-0 mt-0.5">
                1
              </span>
              <p>
                <strong className="text-ink font-medium">
                  Finding your center
                </strong>:
                12 questions to discover whether you lead from Body, Heart, or
                Head.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-soft text-small font-semibold text-brand shrink-0 mt-0.5">
                2
              </span>
              <p>
                <strong className="text-ink font-medium">
                  Exploring your type
                </strong>:
                9 questions to narrow down which of the three types in your
                center resonates most.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-soft text-small font-semibold text-brand shrink-0 mt-0.5">
                3
              </span>
              <p>
                <strong className="text-ink font-medium">Going deeper</strong>:
                9 more questions exploring childhood patterns, shadow
                behaviors, and relationship dynamics.
              </p>
            </div>
          </div>
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
    return (
      <QuestionCard
        phaseName={PHASE_NAMES.center}
        phaseNumber={1}
        current={currentQ + 1}
        total={PHASE_1_QUESTIONS.length}
        overallProgress={answeredSoFar}
        overallTotal={totalQuestions}
        question={question.text}
        options={question.options}
        onSelect={handleCenterAnswer}
      />
    );
  }

  if (phase === "type" && dominantCenter) {
    const questions = getPhase2Questions(dominantCenter);
    const question = questions[currentQ];
    return (
      <div>
        <div className="mb-6 rounded-lg bg-brand-soft px-4 py-2 text-small text-brand font-medium">
          Your responses point toward the{" "}
          <strong>{CENTER_LABEL[dominantCenter]}</strong>. Now let&apos;s
          explore which type within it.
        </div>
        <QuestionCard
          phaseName={PHASE_NAMES.type}
          phaseNumber={2}
          current={currentQ + 1}
          total={questions.length}
          overallProgress={answeredSoFar}
          overallTotal={totalQuestions}
          question={question.text}
          options={question.options}
          onSelect={handleTypeAnswer}
        />
      </div>
    );
  }

  if (phase === "confirm" && dominantCenter) {
    const questions = getPhase3Questions(dominantCenter);
    const question = questions[currentQ];
    return (
      <div>
        <div className="mb-6 rounded-lg bg-brand-soft px-4 py-2 text-small text-brand font-medium">
          Final phase: deeper scenarios to confirm what resonates.
        </div>
        <QuestionCard
          phaseName={PHASE_NAMES.confirm}
          phaseNumber={3}
          current={currentQ + 1}
          total={questions.length}
          overallProgress={answeredSoFar}
          overallTotal={totalQuestions}
          question={question.text}
          options={question.options}
          onSelect={handleConfirmAnswer}
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
  phaseName,
  phaseNumber,
  current,
  total,
  overallProgress,
  overallTotal,
  question,
  options,
  onSelect,
}: {
  phaseName: string;
  phaseNumber: number;
  current: number;
  total: number;
  overallProgress: number;
  overallTotal: number;
  question: string;
  options: DiscoveryOption[];
  onSelect: (option: DiscoveryOption) => void;
}) {
  const progressPercent = Math.round((overallProgress / overallTotal) * 100);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-small text-ink-muted">
          <span>
            Phase {phaseNumber}: {phaseName} &middot; {current} of {total}
          </span>
          <span>{progressPercent}% complete</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-brand transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
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
  const { myType, setMyType } = useMyType();
  const [saved, setSaved] = useState(false);
  const centerInfo = CENTER_INFO[result.center];

  const sortedTypes = [...result.candidateTypes].sort((a, b) => {
    return (result.typeScores[b] ?? 0) - (result.typeScores[a] ?? 0);
  });

  const maxTypeScore = Math.max(
    ...Object.values(result.typeScores).filter((v) => v > 0),
    1
  );

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-border p-6">
        <p className="text-small text-ink-muted mb-2">
          Your responses suggest you lead with the
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
          Based on 30 questions across three phases, here are the types that
          resonate most with your answers. Read each profile and see what fits;
          no assessment can replace your own reflection.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {sortedTypes.map((n) => {
            const info = TYPE_INFO[n as keyof typeof TYPE_INFO];
            if (!info) return null;
            const score = result.typeScores[n] ?? 0;
            const strength = Math.round((score / maxTypeScore) * 100);
            return (
              <Link
                key={n}
                href={`/types/${n}`}
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
                <div className="mb-3">
                  <div className="flex items-center justify-between text-small text-ink-muted mb-1">
                    <span>Resonance</span>
                    <span>{strength}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-center-${result.center} transition-all`}
                      style={{ width: `${strength}%` }}
                    />
                  </div>
                </div>
                <p className="text-small text-ink-muted">{info.brief}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl bg-surface-sunken p-6">
        <h3 className="font-serif text-h3 font-semibold text-ink mb-2">
          What this means
        </h3>
        <p className="text-body text-ink-muted mb-3">
          This is a starting point, not a verdict. The Enneagram is about
          motivation, not behavior. Two people can act identically for
          completely different reasons.
        </p>
        <p className="text-body text-ink-muted">
          Read your top type&apos;s full profile. If the core fear and
          desire hit home, you&apos;re likely on the right track. If not,
          explore the other types in your center, or browse all nine.
        </p>
      </div>

      {sortedTypes.length > 0 && !saved && !myType && (
        <div className="rounded-xl border border-brand/20 bg-brand-soft/10 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1">
            <p className="text-body font-medium text-ink">
              Set Type {sortedTypes[0]} as your type?
            </p>
            <p className="text-small text-ink-muted mt-0.5">
              This personalizes the site for you. No account needed, stored
              locally in your browser. You can change it anytime.
            </p>
          </div>
          <button
            onClick={() => {
              setMyType(sortedTypes[0] as EnneagramType);
              setSaved(true);
            }}
            className="rounded-full bg-brand px-5 py-2 text-small font-semibold text-white hover:bg-brand-hover transition-colors shadow-sm shrink-0"
          >
            This is my type
          </button>
        </div>
      )}

      {saved && (
        <div className="rounded-xl border border-brand/20 bg-brand-soft/10 p-5">
          <p className="text-body font-medium text-ink">
            Type {sortedTypes[0]} saved as your type.
          </p>
          <p className="text-small text-ink-muted mt-0.5">
            The site will now highlight content relevant to you. You can
            change this anytime from the header.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRestart}
          className="rounded-full border border-border px-6 py-2.5 text-ui font-medium text-ink hover:bg-surface-sunken transition-colors"
        >
          Start over
        </button>
        <Link
          href="/types"
          className="rounded-full bg-brand px-6 py-2.5 text-ui font-medium text-white text-center hover:bg-brand-hover transition-colors"
        >
          Browse all types
        </Link>
      </div>
    </div>
  );
}
