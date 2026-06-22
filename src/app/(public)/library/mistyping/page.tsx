import type { Metadata } from "next";
import { ArticlePage } from "@/components/enneagram/article-page";

export const metadata: Metadata = {
  title: "Common Misidentifications",
  description:
    "Why people mistype, and how to tell similar types apart.",
  openGraph: {
    title: "Common Misidentifications | Enneagram Growth",
    description:
      "Why people mistype, and how to tell similar types apart.",
  },
};

export default function MistypingPage() {
  return <ArticlePage slug="mistyping" />;
}
