import { ArticlePage } from "@/components/enneagram/article-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coping & Solutions",
  description:
    "When your patterns take over, here is what to do. Practical coping strategies organized by the struggles you actually face.",
};

export default function CopingPage() {
  return <ArticlePage slug="coping" />;
}
