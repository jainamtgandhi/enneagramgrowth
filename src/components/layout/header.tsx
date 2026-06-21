import Link from "next/link";
import { MobileNav } from "./mobile-nav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/enneagram", label: "Enneagram" },
  { href: "/discover", label: "Discover" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/60">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold text-brand">
            Enneagram Growth
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ui font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <MobileNav links={navLinks} />
      </div>
    </header>
  );
}
