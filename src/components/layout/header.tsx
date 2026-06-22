import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

const topLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

const mainLinks = [
  { href: "/enneagram/types", label: "Types" },
  { href: "/learn", label: "Learn" },
  { href: "/enneagram", label: "Library" },
  { href: "/enneagram/workplace", label: "Workplace" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/60">
      {/* Top bar: brand + utility links */}
      <div className="border-b border-border/30">
        <div className="mx-auto flex h-10 max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-brand">
              Enneagram Growth
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <NavLinks links={topLinks} variant="subtle" />
          </nav>
        </div>
      </div>

      {/* Main bar: content links + CTA */}
      <div className="border-b border-border/40">
        <div className="mx-auto flex h-12 max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <nav className="hidden md:flex items-center gap-8">
            <NavLinks links={mainLinks} variant="primary" />
          </nav>
          <Link
            href="/discover"
            className="hidden md:inline-flex items-center rounded-full bg-brand px-5 py-1.5 text-small font-medium text-white hover:bg-brand-hover transition-colors"
          >
            Find Your Type
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
