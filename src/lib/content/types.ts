import type { Database } from "@/types/database";

export type LibraryArticle =
  Database["public"]["Tables"]["library_articles"]["Row"];
export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type QuizSession = Database["public"]["Tables"]["quiz_sessions"]["Row"];
export type FeatureFlag = Database["public"]["Tables"]["feature_flags"]["Row"];
