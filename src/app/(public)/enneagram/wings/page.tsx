import type { Metadata } from "next";
import { ArticlePage } from "@/components/enneagram/article-page";

export const metadata: Metadata = {
  title: "Wings",
  description:
    "How adjacent types influence and shade your core Enneagram type.",
};

export default function WingsPage() {
  return <ArticlePage slug="wings" />;
}
