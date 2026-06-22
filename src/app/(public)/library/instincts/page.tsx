import type { Metadata } from "next";
import { ArticlePage } from "@/components/enneagram/article-page";

export const metadata: Metadata = {
  title: "The Three Instincts",
  description:
    "Self-preservation, social, and one-to-one: the instinctual drives that shape type expression.",
  openGraph: {
    title: "The Three Instincts | Enneagram Growth",
    description:
      "Self-preservation, social, and one-to-one: the instinctual drives that shape type expression.",
  },
};

export default function InstinctsPage() {
  return <ArticlePage slug="instincts" />;
}
