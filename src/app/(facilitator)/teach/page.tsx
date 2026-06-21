import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCommentStats } from "@/lib/content/comments";
import { FileText, MessageSquare, Compass, TrendingUp } from "lucide-react";

export default async function TeachDashboardPage() {
  const supabase = await createClient();

  const [blogResult, discoveryResult, commentStats] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("id, status", { count: "exact", head: false }),
    supabase
      .from("discovery_results")
      .select("id", { count: "exact", head: true }),
    getCommentStats(),
  ]);

  const posts = blogResult.data ?? [];
  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;
  const discoveryCount = discoveryResult.count ?? 0;
  const totalComments = commentStats.pending + commentStats.approved + commentStats.flagged;

  const stats = [
    {
      label: "Published Posts",
      value: publishedCount,
      sub: `${draftCount} draft${draftCount !== 1 ? "s" : ""}`,
      icon: FileText,
      href: "/teach/blog",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Comments",
      value: totalComments,
      sub: commentStats.pending > 0
        ? `${commentStats.pending} pending review`
        : "All reviewed",
      icon: MessageSquare,
      href: "/teach/comments",
      color: commentStats.pending > 0 ? "text-warning" : "text-brand",
      bg: commentStats.pending > 0 ? "bg-warning/10" : "bg-brand-soft",
    },
    {
      label: "Discovery Sessions",
      value: discoveryCount,
      sub: "Total completions",
      icon: Compass,
      href: "#",
      color: "text-center-head-ink",
      bg: "bg-center-head-soft",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-h1 font-semibold text-ink">Dashboard</h1>
        <p className="text-body text-ink-muted mt-1">
          Welcome back. Here&apos;s what&apos;s happening on your site.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="rounded-xl border border-border bg-surface p-5 hover:border-brand hover:shadow-card transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-small font-medium text-ink-muted">
                  {stat.label}
                </span>
                <span className={`rounded-lg p-2 ${stat.bg}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </span>
              </div>
              <p className="text-h1 font-bold text-ink">{stat.value}</p>
              <p className="text-small text-ink-muted mt-1">{stat.sub}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-h3 font-semibold text-ink">
              Quick Actions
            </h2>
          </div>
          <div className="space-y-2">
            <Link
              href="/teach/blog/new"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-brand hover:shadow-card transition-all"
            >
              <FileText className="h-5 w-5 text-brand" />
              <div>
                <p className="text-body font-medium text-ink">Write a new blog post</p>
                <p className="text-small text-ink-muted">Create and publish content</p>
              </div>
            </Link>
            <Link
              href="/teach/comments"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-brand hover:shadow-card transition-all"
            >
              <MessageSquare className="h-5 w-5 text-brand" />
              <div>
                <p className="text-body font-medium text-ink">
                  Review comments
                  {commentStats.pending > 0 && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-warning/10 px-2 py-0.5 text-small font-medium text-warning">
                      {commentStats.pending} pending
                    </span>
                  )}
                </p>
                <p className="text-small text-ink-muted">Approve or flag reader comments</p>
              </div>
            </Link>
            <Link
              href="/enneagram"
              className="flex items-center gap-3 rounded-lg border border-border p-4 hover:border-brand hover:shadow-card transition-all"
            >
              <TrendingUp className="h-5 w-5 text-brand" />
              <div>
                <p className="text-body font-medium text-ink">View public site</p>
                <p className="text-small text-ink-muted">See your site as visitors do</p>
              </div>
            </Link>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-h3 font-semibold text-ink">
              Content Overview
            </h2>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-body text-ink">Type pages</span>
              <span className="text-body font-medium text-ink">9 types</span>
            </div>
            <div className="border-t border-border" />
            <div className="flex items-center justify-between">
              <span className="text-body text-ink">Learning articles</span>
              <span className="text-body font-medium text-ink">7 lessons</span>
            </div>
            <div className="border-t border-border" />
            <div className="flex items-center justify-between">
              <span className="text-body text-ink">Library articles</span>
              <span className="text-body font-medium text-ink">8 articles</span>
            </div>
            <div className="border-t border-border" />
            <div className="flex items-center justify-between">
              <span className="text-body text-ink">Blog posts</span>
              <span className="text-body font-medium text-ink">
                {publishedCount} published, {draftCount} draft{draftCount !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="border-t border-border" />
            <div className="flex items-center justify-between">
              <span className="text-body text-ink">Approved comments</span>
              <span className="text-body font-medium text-ink">{commentStats.approved}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
