"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

interface NavLinksProps {
  links: NavLink[];
  variant?: "primary" | "subtle";
}

export function NavLinks({ links, variant = "primary" }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : link.href === "/enneagram"
              ? pathname === "/enneagram" ||
                (pathname.startsWith("/enneagram/") &&
                  !pathname.startsWith("/enneagram/types") &&
                  !pathname.startsWith("/enneagram/workplace"))
              : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-ui font-medium transition-colors relative",
              variant === "primary" && "py-3",
              variant === "subtle" && "text-small",
              isActive
                ? cn(
                    "text-ink",
                    variant === "primary" &&
                      "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand"
                  )
                : "text-ink-muted hover:text-ink"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
