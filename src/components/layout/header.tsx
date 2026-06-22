import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";
import { SearchDialog } from "@/components/shared/search-dialog";
import { buildSearchIndex } from "@/lib/search/index";

const navLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/library", label: "Enneagram" },
  { href: "/types", label: "Types" },
  { href: "/relationships", label: "Relationships" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const searchEntries = buildSearchIndex();

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/60 shadow-[0_1px_0_var(--border)]">
      <div className="mx-auto flex h-[60px] max-w-[1200px] items-center px-5 sm:px-6">
        {/* Brand — fixed width so nav doesn't shift */}
        <Link href="/" className="mr-10 shrink-0">
          <span className="font-serif text-[1.3rem] font-bold text-brand leading-none">
            Enneagram Growth
          </span>
        </Link>

        {/* Nav — grows to fill, links left-aligned */}
        <nav className="hidden lg:flex flex-1 items-center">
          <NavLinks links={navLinks} />
        </nav>

        {/* Actions — pinned right */}
        <div className="hidden lg:flex items-center gap-2 ml-6">
          <SearchDialog entries={searchEntries} />
          <Link
            href="/discover"
            className="inline-flex items-center rounded-full bg-brand px-5 py-2 text-small font-semibold text-white hover:bg-brand-hover transition-colors shadow-sm"
          >
            Find Your Type
          </Link>
        </div>

        {/* Mobile — pinned right */}
        <div className="flex lg:hidden items-center gap-1 ml-auto">
          <SearchDialog entries={searchEntries} />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
