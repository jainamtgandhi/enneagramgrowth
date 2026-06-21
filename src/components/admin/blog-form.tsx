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
import { slugify, estimateReadingTime } from "@/lib/utils/format";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { BlogPost } from "@/lib/content/types";

interface BlogFormProps {
  post?: BlogPost;
}

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [bodyMd, setBodyMd] = useState(post?.body_md ?? "");
  const [tags, setTags] = useState(post?.tags?.join(", ") ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(post?.cover_image_url ?? "");
  const [isPublished, setIsPublished] = useState(post?.is_published ?? false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!post) setSlug(slugify(value));
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const data = {
      title,
      slug,
      excerpt: excerpt || null,
      body_md: bodyMd,
      tags: tagArray,
      cover_image_url: coverImageUrl || null,
      is_published: isPublished,
      published_at: isPublished ? (post?.published_at ?? new Date().toISOString()) : null,
      reading_time_min: estimateReadingTime(bodyMd),
    };

    const { error } = post
      ? await supabase.from("blog_posts").update(data).eq("id", post.id)
      : await supabase.from("blog_posts").insert(data);

    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(post ? "Post updated" : "Post created");
      router.push("/admin/blog");
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
            placeholder="Post title"
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="post-slug"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Input
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief description"
        />
      </div>

      <div>
        <Label htmlFor="cover">Cover Image URL</Label>
        <Input
          id="cover"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="enneagram, growth, relationships"
        />
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
            placeholder="Write your post in Markdown..."
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
          {post ? "Update" : "Create"} Post
        </Button>
      </div>
    </div>
  );
}
