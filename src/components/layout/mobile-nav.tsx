"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/learn", label: "Learn" },
  { href: "/types", label: "Types" },
  { href: "/library", label: "Enneagram" },
  { href: "/relationships", label: "Relationships" },
  { href: "/workplace", label: "Workplace" },
  { href: "/coping", label: "Coping" },
  { href: "/growth", label: "Growth" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
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

        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => {
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
      </SheetContent>
    </Sheet>
  );
}
