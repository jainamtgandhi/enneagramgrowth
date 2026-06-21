import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TypeCard } from "@/components/library/type-card";
import { PostCard } from "@/components/blog/post-card";
import { SectionHeader } from "@/components/shared/section-header";
import { ALL_TYPES } from "@/lib/enneagram/descriptions";
import { getLatestPosts } from "@/lib/content/queries";
import { ArrowRight } from "lucide-react";

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32 text-center">
          <h1 className="font-heading text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Nine paths.
            <br />
            <span className="text-primary">One practice.</span>
            <br />
            Your growth.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            A trust-first Enneagram platform that meets you where you are —
            from curious newcomer to committed practitioner.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button render={<Link href="/discovery" />} size="lg" className="rounded-full px-8 text-lg">
              Discover Your Type
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              render={<Link href="/library" />}
              variant="outline"
              size="lg"
              className="rounded-full px-8"
            >
              Explore the Library
            </Button>
          </div>
        </div>
      </section>

      {/* Type Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeader
          title="The Nine Types"
          description="Each type has its own worldview, motivations, and path to growth."
          className="text-center"
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_TYPES.map((type) => (
            <TypeCard key={type} type={type} />
          ))}
        </div>
      </section>

      {/* Discovery CTA */}
      <section className="bg-primary/5">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 text-center">
          <h2 className="font-heading text-3xl font-bold">
            Discover your type in under 3 minutes
          </h2>
          <p className="mt-4 text-muted-foreground">
            27 thoughtful questions. Instant results. No account needed.
          </p>
          <Button render={<Link href="/discovery" />} size="lg" className="mt-6 rounded-full px-8">
            Take the Quiz
          </Button>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <SectionHeader title="Latest from the Blog" />
            <Button variant="ghost" render={<Link href="/blog" />}>
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
