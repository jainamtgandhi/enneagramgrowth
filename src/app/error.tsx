"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="font-heading text-4xl font-bold text-destructive">
          Something went wrong
        </h1>
        <p className="text-lg text-muted-foreground">
          We encountered an unexpected error. Please try again.
        </p>
        <Button onClick={reset}>Try Again</Button>
      </div>
    </main>
  );
}
