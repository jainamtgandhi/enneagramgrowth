import type { Metadata } from "next";
import { ArticlePage } from "@/components/enneagram/article-page";

export const metadata: Metadata = {
  title: "Arrows & Growth Paths",
  description:
    "How each type shifts under growth and stress — the dynamic connections of the Enneagram.",
};

export default function ArrowsPage() {
  return <ArticlePage slug="arrows" />;
}
