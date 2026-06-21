import type { Metadata } from "next";
import { ArticlePage } from "@/components/enneagram/article-page";

export const metadata: Metadata = {
  title: "Relationships & the Enneagram",
  description:
    "How to love, support, and connect with each type — practical guidance for partners, friends, and colleagues.",
};

export default function RelationshipsPage() {
  return <ArticlePage slug="relationships" />;
}
