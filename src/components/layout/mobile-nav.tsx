"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navSections = [
  {
    heading: null,
    links: [
      { href: "/enneagram/types", label: "Types" },
      { href: "/learn", label: "Learn" },
      { href: "/enneagram", label: "Library" },
      { href: "/enneagram/workplace", label: "Workplace" },
    ],
  },
  {
    heading: "More",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
    ],
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden" />
        }
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <div className="flex items-center justify-between mb-6">
          <span className="font-serif text-lg font-bold text-brand">
            Enneagram Growth
          </span>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Prominent CTA */}
        <Link
          href="/discover"
          onClick={() => setOpen(false)}
          className="flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-ui font-medium text-white hover:bg-brand-hover transition-colors mb-6"
        >
          Find Your Type
        </Link>

        {navSections.map((section, i) => (
          <div key={i} className={cn(i > 0 && "mt-4 pt-4 border-t border-border/40")}>
            {section.heading && (
              <p className="px-3 mb-2 text-small font-medium text-ink-muted">
                {section.heading}
              </p>
            )}
            <nav className="flex flex-col gap-1">
              {section.links.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-lg font-medium transition-colors",
                      isActive
                        ? "text-ink bg-brand-soft/30"
                        : "text-ink-muted hover:text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
}
