import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, BookOpen, Shield, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Our philosophy: depth over hype. An evidence-informed, ethical approach to the Enneagram.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          About The Practice
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A long-term, trust-first Enneagram platform that meets people where
          they are and grows alongside them.
        </p>
      </div>

      {/* Philosophy */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-bold">Our Philosophy</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          The Enneagram is one of the most powerful tools for self-understanding
          available — but only when used with depth, care, and integrity. We
          believe in honouring the system&apos;s richness rather than reducing people
          to a number. Real growth takes time, and we&apos;re here for the long
          journey, not the quick fix.
        </p>
      </section>

      {/* Core Principles */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold mb-6">
          Core Principles
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <BookOpen className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg">Depth Over Hype</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We honour the Enneagram&apos;s richness. No clickbait
                oversimplifications — just thoughtful, nuanced content that
                respects you and the system.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Eye className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg">Evidence-Informed</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We link to peer-reviewed psychology where available and are
                transparent about what&apos;s anecdotal. Honesty builds trust.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Heart className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg">
                Accessible &amp; Inclusive
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Plain-English defaults, designed for everyone. The Enneagram
                belongs to all of us, not just experts.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Shield className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg">Ethical Data Use</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Privacy by design. No dark patterns. Clear consent. Your data
                is yours, and we treat it with respect.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The Enneagram */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">
          What is the Enneagram?
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          The Enneagram is a personality framework that describes nine
          interconnected types, each with its own worldview, core motivations,
          fears, and path to growth. Unlike many personality systems, the
          Enneagram doesn&apos;t just describe behaviour — it reveals the
          underlying motivations that drive it.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Each type has a wing (an adjacent type that adds nuance), an
          instinctual variant (self-preservation, social, or sexual/one-to-one),
          and directions of integration and disintegration that show how we grow
          or regress under different conditions.
        </p>
      </section>

      <div className="mt-12 text-center">
        <Button render={<Link href="/discovery" />} size="lg" className="rounded-full px-8">
          Discover Your Type
        </Button>
      </div>
    </div>
  );
}
