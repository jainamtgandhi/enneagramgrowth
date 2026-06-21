import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-surface-sunken/30">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-semibold text-brand">
              Enneagram Growth
            </h3>
            <p className="mt-2 text-small text-ink-muted max-w-[28ch]">
              A mirror for self-awareness, not a diagnosis, label, or
              replacement for therapy.
            </p>
          </div>

          <div>
            <h4 className="text-ui font-semibold text-ink">Explore</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/enneagram"
                  className="text-small text-ink-muted hover:text-ink"
                >
                  The Enneagram
                </Link>
              </li>
              <li>
                <Link
                  href="/enneagram/types"
                  className="text-small text-ink-muted hover:text-ink"
                >
                  The Nine Types
                </Link>
              </li>
              <li>
                <Link
                  href="/discover"
                  className="text-small text-ink-muted hover:text-ink"
                >
                  Find Your Way In
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="text-small text-ink-muted hover:text-ink"
                >
                  Free Primer Course
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-small text-ink-muted hover:text-ink"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-ui font-semibold text-ink">About</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-small text-ink-muted hover:text-ink"
                >
                  Our Approach
                </Link>
              </li>
              <li>
                <Link
                  href="/about/instructor"
                  className="text-small text-ink-muted hover:text-ink"
                >
                  Meet the Instructor
                </Link>
              </li>
              <li>
                <Link
                  href="/enneagram/responsible-use"
                  className="text-small text-ink-muted hover:text-ink"
                >
                  Responsible Use
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-small text-ink-muted hover:text-ink"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="text-small text-ink-muted hover:text-ink"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center">
          <p className="text-small text-ink-muted">
            &copy; {new Date().getFullYear()} Enneagram Growth. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
