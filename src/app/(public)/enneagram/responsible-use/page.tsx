import type { Metadata } from "next";
import { ArticlePage } from "@/components/enneagram/article-page";

export const metadata: Metadata = {
  title: "Using the Enneagram Responsibly",
  description:
    "Ethical guidelines for working with the Enneagram, as individuals and in community.",
};

export default function ResponsibleUsePage() {
  return <ArticlePage slug="responsible-use" />;
}
