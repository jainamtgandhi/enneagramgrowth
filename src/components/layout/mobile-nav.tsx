"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  links: { href: string; label: string }[];
}

const enneagramSubLinks = [
  { href: "/enneagram", label: "Overview" },
  { href: "/enneagram/types", label: "The Nine Types" },
  { href: "/enneagram/what-is-it", label: "What Is the Enneagram?" },
  { href: "/enneagram/centers", label: "The Three Centers" },
  { href: "/enneagram/wings", label: "Wings" },
  { href: "/enneagram/arrows", label: "Arrows & Growth Paths" },
  { href: "/enneagram/instincts", label: "The Three Instincts" },
];

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [enneagramOpen, setEnneagramOpen] = useState(false);
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
        <div className="flex items-center justify-between mb-8">
          <span className="font-serif text-lg font-bold text-brand">
            Enneagram Growth
          </span>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            if (link.href === "/enneagram") {
              return (
                <div key={link.href}>
                  <button
                    onClick={() => setEnneagramOpen(!enneagramOpen)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-lg font-medium transition-colors",
                      isActive
                        ? "text-ink bg-brand-soft/30"
                        : "text-ink-muted hover:text-ink"
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        enneagramOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {enneagramOpen && (
                    <div className="mt-1 mb-2 ml-3 border-l-2 border-border pl-3 space-y-0.5">
                      {enneagramSubLinks.map((sub) => {
                        const subActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "block rounded-md px-2 py-1.5 text-base transition-colors",
                              subActive
                                ? "text-ink font-medium"
                                : "text-ink-muted hover:text-ink"
                            )}
                          >
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

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
