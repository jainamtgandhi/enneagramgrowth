import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="font-serif text-display font-semibold text-brand">
          404
        </h1>
        <p className="text-body text-ink-muted max-w-[48ch] mx-auto">
          This page doesn&apos;t exist, or it moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="rounded-full bg-brand px-6 py-2 text-ui font-medium text-white hover:bg-brand-hover transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/enneagram"
            className="rounded-full border border-border px-6 py-2 text-ui font-medium text-ink hover:bg-surface-sunken transition-colors"
          >
            Explore the Enneagram
          </Link>
        </div>
      </div>
    </main>
  );
}
