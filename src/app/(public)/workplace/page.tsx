import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = {
  title: "The Enneagram at Work",
  description:
    "How each type shows up in the workplace, and how to build teams, manage conflict, and communicate with awareness.",
  openGraph: {
    title: "The Enneagram at Work | Enneagram Growth",
    description:
      "How each type shows up in the workplace, and how to build teams, manage conflict, and communicate with awareness.",
  },
};

const topics = [
  {
    slug: "type-styles",
    title: "How Each Type Shows Up at Work",
    description:
      "Workplace profiles for all nine types -- strengths, blind spots, and what their coworkers wish they knew.",
  },
  {
    slug: "team-dynamics",
    title: "Team Dynamics by Center",
    description:
      "How Body, Heart, and Head center teams operate, and what happens when an entire center is missing.",
  },
  {
    slug: "managing",
    title: "Managing Each Type",
    description:
      "Practical guidance for leading, motivating, and giving feedback to each Enneagram type.",
  },
  {
    slug: "conflict",
    title: "Conflict Resolution",
    description:
      "How each center experiences workplace conflict differently, and strategies for navigating it.",
  },
  {
    slug: "stress",
    title: "Stress and Burnout Patterns",
    description:
      "How burnout looks different for each type, the warning signs to watch for, and what actually helps.",
  },
  {
    slug: "exercises",
    title: "Practice This",
    description:
      "Five team exercises for bringing Enneagram awareness into your meetings, decisions, and culture.",
  },
];

export default function WorkplaceHubPage() {
  return (
    <main className="mx-auto max-w-[1080px] px-5 py-12 sm:px-8 sm:py-16 lg:py-20">
      <Breadcrumbs items={[{ label: "Workplace" }]} />

      <h1 className="font-serif text-display font-semibold text-ink mb-4">
        The Enneagram at Work
      </h1>
      <p className="text-body-lg text-ink-muted max-w-[68ch] mb-12">
        You spend a staggering amount of your life at work. And most of the
        friction you experience there isn&apos;t about strategy, deadlines, or
        even competence. It&apos;s about people. The Enneagram opens a window
        into <em>why</em> your coworkers do what they do, and why you react the
        way you react. These guides turn that understanding into practical tools
        for teams, managers, and anyone who wants less friction and more
        genuine collaboration.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/workplace/${topic.slug}`}
            className="group rounded-2xl border border-border p-6 hover:shadow-card transition-all"
          >
            <h2 className="font-serif text-h3 font-semibold text-ink mb-2 group-hover:text-brand transition-colors">
              {topic.title}
            </h2>
            <p className="text-small text-ink-muted">
              {topic.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
