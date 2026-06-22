"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: null,
    links: [{ href: "/discover", label: "Find Your Type" }],
  },
  {
    label: "Understand",
    links: [
      { href: "/types", label: "The Nine Types" },
      { href: "/learn", label: "Primer" },
      { href: "/library", label: "All Library Articles" },
    ],
  },
  {
    label: "Grow",
    links: [
      { href: "/growth", label: "Growth Practices" },
      { href: "/coping", label: "Coping & Solutions" },
    ],
  },
  {
    label: "Apply",
    links: [
      { href: "/workplace", label: "Workplace" },
      { href: "/relationships", label: "Relationships" },
    ],
  },
  {
    label: null,
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" },
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

        <nav className="flex flex-col gap-4">
          {navGroups.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  {group.label}
                </p>
              )}
              <div className="flex flex-col gap-0.5">
                {group.links.map((link) => {
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
                        "rounded-lg px-3 py-2 text-body font-medium transition-colors",
                        isActive
                          ? "text-ink bg-brand-soft/30"
                          : "text-ink-muted hover:text-ink"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
