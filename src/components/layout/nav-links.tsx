"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CENTER_INFO } from "@/lib/enneagram/types";
import type { Center } from "@/lib/enneagram/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export interface NavLink {
  href: string;
  label: string;
}

interface NavLinksProps {
  links: NavLink[];
}

const CENTER_ORDER: Center[] = ["body", "heart", "head"];

const exploreLinks = [
  { href: "/library/what-is-it", label: "What Is the Enneagram?" },
  { href: "/library/centers", label: "The Three Centers" },
  { href: "/library/wings", label: "Wings" },
  { href: "/library/arrows", label: "Arrows & Growth Paths" },
  { href: "/library/instincts", label: "The Three Instincts" },
];

const applyLinks = [
  { href: "/relationships", label: "Relationships" },
  { href: "/relationships/compare", label: "Compare Types" },
  { href: "/workplace", label: "Workplace" },
  { href: "/coping", label: "Coping & Solutions" },
  { href: "/growth", label: "Growth Practices" },
];

const linkBase =
  "!bg-transparent !px-0 !rounded-none text-ui font-medium transition-colors relative py-[18px]";
const activeClasses =
  "text-ink after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-brand after:rounded-full";
const inactiveClasses = "text-ink-muted hover:text-ink";

export function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-7">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          if (link.href === "/library") {
            return (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuTrigger
                  className={cn(
                    linkBase,
                    isActive ? activeClasses : inactiveClasses
                  )}
                >
                  {link.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-0">
                  <div className="grid grid-cols-[200px_1fr_1fr] gap-0 w-[600px]">
                    {/* Col 1: The Nine Types */}
                    <div className="p-5 border-r border-border/60 bg-surface-sunken/40">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                        Types
                      </p>
                      <div className="space-y-3">
                        {CENTER_ORDER.map((center) => {
                          const info = CENTER_INFO[center];
                          return (
                            <div key={center}>
                              <p
                                className={`text-xs font-medium text-center-${center}-ink mb-1.5`}
                              >
                                {info.label}
                              </p>
                              <div className="flex gap-1.5">
                                {info.types.map((n) => (
                                  <NavigationMenuLink
                                    key={n}
                                    render={
                                      <Link href={`/types/${n}`} />
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
                        render={<Link href="/types" />}
                        className="mt-3 !p-0 text-xs font-semibold text-brand hover:text-brand-hover"
                      >
                        All types &rarr;
                      </NavigationMenuLink>
                    </div>

                    {/* Col 2: Learn the System */}
                    <div className="p-5 border-r border-border/60">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                        Learn
                      </p>
                      <div className="space-y-0.5">
                        {exploreLinks.map((a) => (
                          <NavigationMenuLink
                            key={a.href}
                            render={<Link href={a.href} />}
                            className="!px-2 !py-1.5 text-small text-ink-muted hover:text-ink"
                          >
                            {a.label}
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>

                    {/* Col 3: Apply */}
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                        Apply
                      </p>
                      <div className="space-y-0.5">
                        {applyLinks.map((a) => (
                          <NavigationMenuLink
                            key={a.href}
                            render={<Link href={a.href} />}
                            className="!px-2 !py-1.5 text-small text-ink-muted hover:text-ink"
                          >
                            {a.label}
                          </NavigationMenuLink>
                        ))}
                      </div>
                      <NavigationMenuLink
                        render={<Link href="/library" />}
                        className="mt-3 !px-2 !py-0 text-xs font-semibold text-brand hover:text-brand-hover"
                      >
                        Browse all &rarr;
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
                  linkBase,
                  isActive ? activeClasses : inactiveClasses
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
