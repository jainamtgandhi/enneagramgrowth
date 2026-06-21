import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="font-heading text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-muted-foreground">
          This page doesn&apos;t exist yet.
        </p>
        <Button render={<Link href="/" />}>Go Home</Button>
      </div>
    </main>
  );
}
