"use client";

import { useState } from "react";

export interface PostData {
  title: string;
  slug: string;
  excerpt: string;
  body_md: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  cover_image_url: string;
  reading_time_min: number | null;
  seo_title: string;
  seo_description: string;
  published_at: string;
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

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
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
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialData?.cover_image_url ?? ""
  );
  const [readingTimeMin, setReadingTimeMin] = useState<number | null>(
    initialData?.reading_time_min ?? null
  );
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(
    initialData?.seo_description ?? ""
  );
  const [publishedAt, setPublishedAt] = useState(
    initialData?.published_at ?? ""
  );
  const [autoSlug, setAutoSlug] = useState(!initialData);

  const inputClass =
    "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-body text-ink focus:border-brand focus:outline-none";

  function handleTitleChange(value: string) {
    setTitle(value);
    if (autoSlug) {
      setSlug(slugify(value));
    }
  }

  function handleBodyChange(value: string) {
    setBodyMd(value);
    setReadingTimeMin(estimateReadingTime(value));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onSave({
      title,
      slug,
      excerpt,
      body_md: bodyMd,
      tags,
      status,
      cover_image_url: coverImageUrl,
      reading_time_min: readingTimeMin,
      seo_title: seoTitle,
      seo_description: seoDescription,
      published_at: publishedAt,
    });
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
          className={inputClass}
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
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-ui font-medium text-ink mb-1.5">
          Cover Image URL
        </label>
        <input
          type="url"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className={inputClass}
        />
        <p className="text-small text-ink-muted mt-1">
          Optional. Recommended aspect ratio 16:9.
        </p>
      </div>

      <div>
        <label className="block text-ui font-medium text-ink mb-1.5">
          Excerpt
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className={`${inputClass} resize-y`}
        />
      </div>

      <div>
        <label className="block text-ui font-medium text-ink mb-1.5">
          Content (Markdown)
        </label>
        <textarea
          value={bodyMd}
          onChange={(e) => handleBodyChange(e.target.value)}
          rows={16}
          required
          className={`${inputClass} font-mono resize-y`}
        />
        {readingTimeMin && (
          <p className="text-small text-ink-muted mt-1">
            Estimated reading time: {readingTimeMin} min
          </p>
        )}
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
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

        <div>
          <label className="block text-ui font-medium text-ink mb-1.5">
            Publish Date
          </label>
          <input
            type="datetime-local"
            value={publishedAt ? publishedAt.slice(0, 16) : ""}
            onChange={(e) =>
              setPublishedAt(
                e.target.value ? new Date(e.target.value).toISOString() : ""
              )
            }
            className={inputClass}
          />
          <p className="text-small text-ink-muted mt-1">
            Auto-set when publishing. Override for scheduled posts.
          </p>
        </div>
      </div>

      {/* SEO Fields */}
      <details className="rounded-lg border border-border p-4">
        <summary className="text-ui font-medium text-ink cursor-pointer">
          SEO Settings
        </summary>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-ui font-medium text-ink mb-1.5">
              SEO Title
            </label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder={title || "Defaults to post title"}
              maxLength={60}
              className={inputClass}
            />
            <p className="text-small text-ink-muted mt-1">
              {seoTitle.length}/60 characters
            </p>
          </div>
          <div>
            <label className="block text-ui font-medium text-ink mb-1.5">
              SEO Description
            </label>
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder={excerpt || "Defaults to excerpt"}
              maxLength={160}
              rows={2}
              className={`${inputClass} resize-y`}
            />
            <p className="text-small text-ink-muted mt-1">
              {seoDescription.length}/160 characters
            </p>
          </div>
        </div>
      </details>

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
