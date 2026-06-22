import type { Metadata } from "next";
import { ArticlePage } from "@/components/enneagram/article-page";

export const metadata: Metadata = {
  title: "Growth Practices",
  description:
    "The inner process of growth, from autopilot to awareness, and practical exercises for each type and center.",
  openGraph: {
    title: "Growth Practices | Enneagram Growth",
    description:
      "The inner process of growth, from autopilot to awareness, and practical exercises for each type and center.",
  },
};

export default function GrowthPracticesPage() {
  return <ArticlePage slug="growth-practices" />;
}
