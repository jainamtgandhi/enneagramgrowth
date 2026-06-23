"use client";

import Link from "next/link";
import { useVisited } from "@/hooks/use-visited";
import { Check } from "lucide-react";

interface LessonData {
  slug: string;
  title: string;
  description: string;
  order: number;
  readTime: number;
}

interface LearnPathProps {
  lessons: LessonData[];
}

export function LearnPath({ lessons }: LearnPathProps) {
  const { isVisited } = useVisited();

  return (
    <ol className="relative space-y-4">
      <div className="absolute left-[15px] top-[20px] bottom-[20px] w-px bg-border" />

      {lessons.map((lesson) => {
        const visited = isVisited(`/learn/${lesson.slug}`);
        return (
          <li key={lesson.slug} className="relative">
            <Link
              href={`/learn/${lesson.slug}`}
              className="group flex items-start gap-4 rounded-xl border border-border bg-surface p-5 hover:border-brand hover:shadow-card transition-all"
            >
              <span
                className={`relative z-10 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full font-serif font-bold text-ui border-2 border-surface ${
                  visited
                    ? "bg-brand text-white"
                    : "bg-brand-soft text-brand"
                }`}
              >
                {visited ? (
                  <Check className="h-4 w-4" />
                ) : (
                  lesson.order
                )}
              </span>
              <div className="flex-1 min-w-0">
                <h2 className="text-body font-medium text-ink group-hover:text-brand transition-colors">
                  {lesson.title}
                </h2>
                <p className="text-small text-ink-muted mt-1">
                  {lesson.description}
                </p>
                <span className="text-small text-ink-muted mt-1 flex items-center gap-2">
                  ~{lesson.readTime} min read
                  {visited && (
                    <span className="text-emerald-600 font-medium">
                      Read
                    </span>
                  )}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
