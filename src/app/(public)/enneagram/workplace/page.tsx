import { ArticlePage } from "@/components/enneagram/article-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Enneagram at Work",
  description:
    "How each type shows up in the workplace, and how to build teams, manage conflict, and communicate with awareness.",
};

export default function WorkplacePage() {
  return <ArticlePage slug="workplace" />;
}
