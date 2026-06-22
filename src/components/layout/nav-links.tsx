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

const learnLinks = [
  { href: "/learn", label: "Start the Primer", description: "7 free lessons from the basics" },
  { href: "/library/what-is-it", label: "What Is the Enneagram?" },
  { href: "/library/centers", label: "The Three Centers" },
  { href: "/library/wings", label: "Wings" },
  { href: "/library/arrows", label: "Arrows & Growth Paths" },
  { href: "/library/instincts", label: "The Three Instincts" },
];

const applyLinks = [
  { href: "/workplace", label: "Workplace", description: "How types show up at work" },
  { href: "/coping", label: "Coping & Solutions", description: "When patterns take over" },
  { href: "/growth", label: "Growth Practices", description: "From autopilot to awareness" },
];

const enneagramPaths = ["/learn", "/library", "/types", "/relationships"];
const applyPaths = ["/workplace", "/coping", "/growth"];

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
          if (link.href === "/library") {
            const isActive = enneagramPaths.some((p) => pathname.startsWith(p));
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
                  <div className="grid grid-cols-[200px_1fr_1fr] gap-0 w-[640px]">
                    {/* Col 1: The Nine Types */}
                    <div className="p-5 border-r border-border/60 bg-surface-sunken/40">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                        The Nine Types
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
                      <div className="mt-3 space-y-1">
                        <NavigationMenuLink
                          render={<Link href="/types" />}
                          className="!p-0 text-xs font-semibold text-brand hover:text-brand-hover"
                        >
                          All types &rarr;
                        </NavigationMenuLink>
                        <NavigationMenuLink
                          render={<Link href="/relationships" />}
                          className="!p-0 text-xs font-semibold text-brand hover:text-brand-hover block"
                        >
                          Relationships &rarr;
                        </NavigationMenuLink>
                      </div>
                    </div>

                    {/* Col 2: Learn */}
                    <div className="p-5 border-r border-border/60">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                        Learn
                      </p>
                      <div className="space-y-0.5">
                        {learnLinks.map((a, i) => (
                          <NavigationMenuLink
                            key={a.href}
                            render={<Link href={a.href} />}
                            className={cn(
                              "!px-2 !py-1.5 text-small hover:text-ink",
                              i === 0
                                ? "text-brand font-medium"
                                : "text-ink-muted"
                            )}
                          >
                            {a.label}
                          </NavigationMenuLink>
                        ))}
                      </div>
                      <NavigationMenuLink
                        render={<Link href="/library" />}
                        className="mt-3 !px-2 !py-0 text-xs font-semibold text-brand hover:text-brand-hover"
                      >
                        Full library &rarr;
                      </NavigationMenuLink>
                    </div>

                    {/* Col 3: Apply */}
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
                        Apply
                      </p>
                      <div className="space-y-1">
                        {applyLinks.map((a) => (
                          <NavigationMenuLink
                            key={a.href}
                            render={<Link href={a.href} />}
                            className="!px-2 !py-2 block"
                          >
                            <span className="text-small font-medium text-ink">
                              {a.label}
                            </span>
                            {a.description && (
                              <span className="block text-xs text-ink-muted mt-0.5">
                                {a.description}
                              </span>
                            )}
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          if (link.href === "/apply") {
            const isActive = applyPaths.some((p) => pathname.startsWith(p));
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
                  <div className="w-[280px] p-5">
                    <div className="space-y-1">
                      {applyLinks.map((a) => (
                        <NavigationMenuLink
                          key={a.href}
                          render={<Link href={a.href} />}
                          className="!px-3 !py-2.5 block rounded-lg hover:bg-surface-sunken"
                        >
                          <span className="text-small font-medium text-ink">
                            {a.label}
                          </span>
                          {a.description && (
                            <span className="block text-xs text-ink-muted mt-0.5">
                              {a.description}
                            </span>
                          )}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

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
