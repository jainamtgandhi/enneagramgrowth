import Link from "next/link";
import { MobileNav } from "./mobile-nav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/library", label: "Library" },
  { href: "/discovery", label: "Discover" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold text-primary">
            The Practice
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
