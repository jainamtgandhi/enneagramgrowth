import type { Database } from "@/types/database";

export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
