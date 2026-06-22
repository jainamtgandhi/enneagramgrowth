"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CENTER_INFO } from "@/lib/enneagram/types";
import type { Center } from "@/lib/enneagram/types";
import { TYPE_INFO } from "@/lib/enneagram/descriptions";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavLink {
  href: string;
  label: string;
}

interface NavLinksProps {
  links: NavLink[];
}

const CENTER_ORDER: Center[] = ["body", "heart", "head"];

const quickArticles = [
  { href: "/enneagram/what-is-it", label: "What Is the Enneagram?" },
  { href: "/enneagram/centers", label: "The Three Centers" },
  { href: "/enneagram/wings", label: "Wings" },
  { href: "/enneagram/arrows", label: "Arrows & Growth Paths" },
  { href: "/enneagram/instincts", label: "The Three Instincts" },
];

export function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-6">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          if (link.href === "/enneagram") {
            return (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuTrigger
                  className={cn(
                    "!bg-transparent !px-0 !rounded-none text-ui font-medium transition-colors relative py-5",
                    isActive
                      ? "text-ink after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand"
                      : "text-ink-muted hover:text-ink"
                  )}
                >
                  {link.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-0">
                  <div className="grid grid-cols-2 gap-0 w-[480px]">
                    {/* Left: The Nine Types */}
                    <div className="p-5 border-r border-border">
                      <p className="text-small font-medium text-ink-muted mb-3">
                        The Nine Types
                      </p>
                      <div className="space-y-3">
                        {CENTER_ORDER.map((center) => {
                          const info = CENTER_INFO[center];
                          return (
                            <div key={center}>
                              <p
                                className={`text-small font-medium text-center-${center}-ink mb-1`}
                              >
                                {info.label}
                              </p>
                              <div className="flex gap-1.5">
                                {info.types.map((n) => (
                                  <NavigationMenuLink
                                    key={n}
                                    render={
                                      <Link
                                        href={`/enneagram/types/${n}`}
                                      />
                                    }
                                    className={`!p-0 flex items-center justify-center w-8 h-8 rounded-lg text-small font-bold bg-center-${center}-soft text-center-${center}-ink hover:ring-2 hover:ring-center-${center}/40 transition-all`}
                                  >
                                    {n}
                                  </NavigationMenuLink>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <NavigationMenuLink
                        render={<Link href="/enneagram/types" />}
                        className="mt-3 !p-0 text-small font-medium text-brand hover:text-brand-hover"
                      >
                        View all types &rarr;
                      </NavigationMenuLink>
                    </div>

                    {/* Right: Explore the System */}
                    <div className="p-5">
                      <p className="text-small font-medium text-ink-muted mb-3">
                        Explore the System
                      </p>
                      <div className="space-y-0.5">
                        {quickArticles.map((article) => (
                          <NavigationMenuLink
                            key={article.href}
                            render={<Link href={article.href} />}
                            className="!px-2 !py-1.5 text-small text-ink-muted hover:text-ink"
                          >
                            {article.label}
                          </NavigationMenuLink>
                        ))}
                      </div>
                      <NavigationMenuLink
                        render={<Link href="/enneagram" />}
                        className="mt-2 !px-2 !py-0 text-small font-medium text-brand hover:text-brand-hover"
                      >
                        View all &rarr;
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink
                render={<Link href={link.href} />}
                className={cn(
                  "!bg-transparent !px-0 !rounded-none text-ui font-medium transition-colors relative py-5",
                  isActive
                    ? "text-ink after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand"
                    : "text-ink-muted hover:text-ink"
                )}
              >
                {link.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
