import type { Metadata } from "next";
import { ArticlePage } from "@/components/enneagram/article-page";

export const metadata: Metadata = {
  title: "The Three Centers of Intelligence",
  description:
    "Body, Heart, and Head — understanding the three triads that organize the nine types.",
};

export default function CentersPage() {
  return <ArticlePage slug="centers" />;
}
