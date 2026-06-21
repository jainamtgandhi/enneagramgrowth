"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="font-serif text-h1 font-semibold text-danger">
          Something went wrong
        </h1>
        <p className="text-body text-ink-muted max-w-[48ch] mx-auto">
          We hit an unexpected error. You can try again or head back home.
        </p>
        <button
          onClick={reset}
          className="rounded-full bg-brand px-6 py-2 text-ui font-medium text-white hover:bg-brand-hover transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
