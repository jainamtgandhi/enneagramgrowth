import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary">
              The Practice
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Nine paths. One practice. Your growth.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">Explore</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/library"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Type Library
                </Link>
              </li>
              <li>
                <Link
                  href="/discovery"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Discovery Quiz
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">About</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link
                  href="/library/responsible-use"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Responsible Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} The Practice. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
