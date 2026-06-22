import type { Metadata } from "next";
import { ArticlePage } from "@/components/enneagram/article-page";

export const metadata: Metadata = {
  title: "Enneagram Glossary",
  description:
    "Key terms and concepts used throughout the Enneagram system.",
  openGraph: {
    title: "Enneagram Glossary | Enneagram Growth",
    description:
      "Key terms and concepts used throughout the Enneagram system.",
  },
};

export default function GlossaryPage() {
  return <ArticlePage slug="glossary" />;
}
