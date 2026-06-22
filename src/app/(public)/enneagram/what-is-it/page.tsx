import type { Metadata } from "next";
import { ArticlePage } from "@/components/enneagram/article-page";

export const metadata: Metadata = {
  title: "What Is the Enneagram?",
  description:
    "An introduction to the Enneagram system: its origins, principles, and purpose.",
  openGraph: {
    title: "What Is the Enneagram? | Enneagram Growth",
    description:
      "An introduction to the Enneagram system: its origins, principles, and purpose.",
  },
};

export default function WhatIsItPage() {
  return <ArticlePage slug="what-is-it" />;
}
