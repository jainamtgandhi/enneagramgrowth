import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Brain, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Discover Your Type",
  description:
    "Take the Enneagram Discovery Quiz. 27 questions, under 3 minutes. Discover your primary type, wing, and growth path.",
};

export default function DiscoveryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Discover Your Type
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The Enneagram describes nine interconnected personality types. This
          quick assessment will help you identify your primary type and wing.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-sm text-center">
          <CardContent className="pt-6">
            <Clock className="mx-auto h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold">Under 3 Minutes</h3>
            <p className="text-sm text-muted-foreground mt-1">
              27 thoughtful questions
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm text-center">
          <CardContent className="pt-6">
            <Brain className="mx-auto h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold">Instant Results</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Type, wing, and confidence level
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm text-center">
          <CardContent className="pt-6">
            <Shield className="mx-auto h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold">Private & Free</h3>
            <p className="text-sm text-muted-foreground mt-1">
              No account required
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 text-center">
        <Button render={<Link href="/discovery/quiz" />} size="lg" className="rounded-full px-8 text-lg">
          Start Discovery
        </Button>
      </div>

      <div className="mt-12 space-y-6">
        <h2 className="font-heading text-2xl font-semibold text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Is this a clinical assessment?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              No. This is a self-discovery tool based on the Enneagram system.
              It&apos;s not a clinical diagnostic instrument. For professional
              assessment, consult a certified Enneagram practitioner.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">What happens with my answers?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Your answers are used only to calculate your results. No personal
              information is collected. See our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                privacy policy
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-semibold">How accurate is this?</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This quick assessment provides a starting point for
              self-exploration. The confidence indicator shows how clear-cut
              your result is. Many people benefit from reading about their top
              2-3 types to find the best fit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
