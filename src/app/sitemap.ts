import type { MetadataRoute } from "next";
import { ALL_TYPES } from "@/lib/enneagram/types";
import { getAllContentFiles } from "@/lib/content/mdx";
import type { ArticleFrontmatter } from "@/lib/content/mdx";
import { TYPE_PAIR_RELATIONSHIPS } from "@/lib/enneagram/relationships";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("is_published", true);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about/instructor`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/types`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/library`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/library/what-is-it`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/library/centers`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/library/wings`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/library/arrows`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/library/instincts`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/library/mistyping`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/library/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/library/responsible-use`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/relationships`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/relationships/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/workplace`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/coping`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/growth`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/discover`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/learn`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const typeSections = ["childhood", "communication", "famous", "careers", "relationships", "growth-path", "subtypes", "parenting", "leadership", "spiritual"];

  const typeRoutes: MetadataRoute.Sitemap = ALL_TYPES.map((n) => ({
    url: `${SITE_URL}/types/${n}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const typeSectionRoutes: MetadataRoute.Sitemap = ALL_TYPES.flatMap((n) =>
    typeSections.map((section) => ({
      url: `${SITE_URL}/types/${n}/${section}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const relationshipRoutes: MetadataRoute.Sitemap = TYPE_PAIR_RELATIONSHIPS.map((p) => ({
    url: `${SITE_URL}/relationships/${p.type1}-${p.type2}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const lessonSlugs = [
    "what-is-the-enneagram",
    "the-three-centers",
    "the-nine-types",
    "wings-arrows-growth",
    "finding-your-type",
    "using-it-responsibly",
    "going-deeper",
  ];

  const lessonRoutes: MetadataRoute.Sitemap = lessonSlugs.map((slug) => ({
    url: `${SITE_URL}/learn/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const copingRoutes: MetadataRoute.Sitemap = getAllContentFiles<ArticleFrontmatter>("coping").map((f) => ({
    url: `${SITE_URL}/coping/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const workplaceRoutes: MetadataRoute.Sitemap = getAllContentFiles<ArticleFrontmatter>("workplace").map((f) => ({
    url: `${SITE_URL}/workplace/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const growthRoutes: MetadataRoute.Sitemap = getAllContentFiles<ArticleFrontmatter>("growth").map((f) => ({
    url: `${SITE_URL}/growth/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...typeRoutes,
    ...typeSectionRoutes,
    ...relationshipRoutes,
    ...lessonRoutes,
    ...copingRoutes,
    ...workplaceRoutes,
    ...growthRoutes,
    ...postRoutes,
  ];
}
