"use client";

import { useState } from "react";

interface PostData {
  title: string;
  slug: string;
  excerpt: string;
  body_md: string;
  tags: string[];
  status: "draft" | "published" | "archived";
}

interface BlogPostFormProps {
  initialData?: PostData;
  onSave: (data: PostData) => void;
  saving: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function BlogPostForm({ initialData, onSave, saving }: BlogPostFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [bodyMd, setBodyMd] = useState(initialData?.body_md ?? "");
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(", ") ?? ""
  );
  const [status, setStatus] = useState<PostData["status"]>(
    initialData?.status ?? "draft"
  );
  const [autoSlug, setAutoSlug] = useState(!initialData);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (autoSlug) {
      setSlug(slugify(value));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onSave({ title, slug, excerpt, body_md: bodyMd, tags, status });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-[720px]">
      <div>
        <label className="block text-ui font-medium text-ink mb-1.5">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-body text-ink focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-ui font-medium text-ink mb-1.5">
          Slug
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setAutoSlug(false);
          }}
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-body text-ink focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-ui font-medium text-ink mb-1.5">
          Excerpt
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-body text-ink focus:border-brand focus:outline-none resize-y"
        />
      </div>

      <div>
        <label className="block text-ui font-medium text-ink mb-1.5">
          Content (Markdown)
        </label>
        <textarea
          value={bodyMd}
          onChange={(e) => setBodyMd(e.target.value)}
          rows={16}
          required
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-body text-ink font-mono focus:border-brand focus:outline-none resize-y"
        />
      </div>

      <div>
        <label className="block text-ui font-medium text-ink mb-1.5">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="enneagram, growth, type 9"
          className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-body text-ink focus:border-brand focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-ui font-medium text-ink mb-1.5">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as PostData["status"])}
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-body text-ink focus:border-brand focus:outline-none"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-brand px-8 py-2.5 text-ui font-medium text-white hover:bg-brand-hover transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : initialData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
