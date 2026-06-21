"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { ArticleContent } from "@/components/library/article-content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils/format";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { LibraryArticle } from "@/lib/content/types";
import type { ArticleCategory } from "@/types/database";

const CATEGORIES: ArticleCategory[] = [
  "core-type",
  "wing",
  "instinct",
  "growth",
  "relationship",
  "responsible-use",
  "overview",
];

interface LibraryFormProps {
  article?: LibraryArticle;
}

export function LibraryForm({ article }: LibraryFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [bodyMd, setBodyMd] = useState(article?.body_md ?? "");
  const [typeTag, setTypeTag] = useState<string>(
    article?.type_tag?.toString() ?? ""
  );
  const [category, setCategory] = useState<ArticleCategory>(
    article?.category ?? "core-type"
  );
  const [position, setPosition] = useState(article?.position ?? 0);
  const [isPublished, setIsPublished] = useState(
    article?.is_published ?? false
  );

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!article) setSlug(slugify(value));
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }

    setSaving(true);
    const supabase = createClient();

    const data = {
      title,
      slug,
      body_md: bodyMd,
      type_tag: typeTag ? parseInt(typeTag) : null,
      category,
      position,
      is_published: isPublished,
    };

    const { error } = article
      ? await supabase.from("library_articles").update(data).eq("id", article.id)
      : await supabase.from("library_articles").insert(data);

    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(article ? "Article updated" : "Article created");
      router.push("/admin/library");
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Article title"
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="article-slug"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="type">Type Tag (1-9)</Label>
          <Input
            id="type"
            type="number"
            min="1"
            max="9"
            value={typeTag}
            onChange={(e) => setTypeTag(e.target.value)}
            placeholder="Optional"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ArticleCategory)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="position">Sort Position</Label>
          <Input
            id="position"
            type="number"
            value={position}
            onChange={(e) => setPosition(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <Tabs defaultValue="edit">
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <Textarea
            value={bodyMd}
            onChange={(e) => setBodyMd(e.target.value)}
            placeholder="Write in Markdown..."
            className="min-h-[400px] font-mono text-sm"
          />
        </TabsContent>
        <TabsContent value="preview">
          <Card>
            <CardContent className="p-6">
              {bodyMd ? (
                <ArticleContent content={bodyMd} />
              ) : (
                <p className="text-muted-foreground">Nothing to preview</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Switch
            checked={isPublished}
            onCheckedChange={setIsPublished}
            id="published"
          />
          <Label htmlFor="published">Published</Label>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="h-4 w-4 mr-1 animate-spin" />}
          {article ? "Update" : "Create"} Article
        </Button>
      </div>
    </div>
  );
}
