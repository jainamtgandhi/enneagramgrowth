"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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

const understandTopLinks = [
  { href: "/types", label: "The Nine Types" },
  { href: "/learn", label: "Primer" },
];

const libraryLinks = [
  { href: "/library/what-is-it", label: "What Is the Enneagram?" },
  { href: "/library/centers", label: "The Three Centers" },
  { href: "/library/wings", label: "Wings" },
  { href: "/library/arrows", label: "Arrows & Growth Paths" },
  { href: "/library/instincts", label: "The Three Instincts" },
  { href: "/library/mistyping", label: "Common Misidentifications" },
  { href: "/library/glossary", label: "Glossary" },
  { href: "/library/responsible-use", label: "Using It Responsibly" },
];

const growthLinks = [
  { href: "/growth/core-process", label: "The Core Process" },
  { href: "/growth/by-center", label: "Practices by Center" },
  { href: "/growth/by-type", label: "Practices by Type" },
  { href: "/growth/weekly-plan", label: "Weekly Practice Plan" },
  { href: "/growth/principles", label: "Key Principles" },
];

const applyLinks = [
  { href: "/workplace", label: "Workplace", description: "How types show up at work" },
  { href: "/relationships", label: "Relationships", description: "How types connect and clash" },
];

const understandPaths = ["/types", "/learn", "/library"];
const growPaths = ["/growth", "/coping"];
const applyPaths = ["/workplace", "/relationships"];

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
          /* ── Understand dropdown ── */
          if (link.href === "/understand") {
            const isActive = understandPaths.some((p) => pathname.startsWith(p));
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
                    <div className="space-y-0.5">
                      {understandTopLinks.map((a) => (
                        <NavigationMenuLink
                          key={a.href}
                          render={<Link href={a.href} />}
                          className="!px-3 !py-2.5 block rounded-lg text-small font-medium text-ink hover:bg-surface-sunken"
                        >
                          {a.label}
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                        Library
                      </p>
                      <div className="space-y-0.5">
                        {libraryLinks.map((a) => (
                          <NavigationMenuLink
                            key={a.href}
                            render={<Link href={a.href} />}
                            className="!px-3 !py-2 block rounded-lg text-small text-ink-muted hover:text-ink hover:bg-surface-sunken"
                          >
                            {a.label}
                          </NavigationMenuLink>
                        ))}
                      </div>
                      <NavigationMenuLink
                        render={<Link href="/library" />}
                        className="mt-2 !px-3 !py-0 text-xs font-semibold text-brand hover:text-brand-hover block"
                      >
                        All articles &rarr;
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          /* ── Grow dropdown ── */
          if (link.href === "/grow") {
            const isActive = growPaths.some((p) => pathname.startsWith(p));
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
                    <p className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      Growth Practices
                    </p>
                    <div className="space-y-0.5">
                      {growthLinks.map((a) => (
                        <NavigationMenuLink
                          key={a.href}
                          render={<Link href={a.href} />}
                          className="!px-3 !py-2 block rounded-lg text-small text-ink-muted hover:text-ink hover:bg-surface-sunken"
                        >
                          {a.label}
                        </NavigationMenuLink>
                      ))}
                    </div>
                    <NavigationMenuLink
                      render={<Link href="/growth" />}
                      className="mt-2 !px-3 !py-0 text-xs font-semibold text-brand hover:text-brand-hover block"
                    >
                      All growth practices &rarr;
                    </NavigationMenuLink>
                    <div className="mt-3 pt-3 border-t border-border">
                      <NavigationMenuLink
                        render={<Link href="/coping" />}
                        className="!px-3 !py-2.5 block rounded-lg hover:bg-surface-sunken"
                      >
                        <span className="text-small font-medium text-ink">
                          Coping &amp; Solutions
                        </span>
                        <span className="block text-xs text-ink-muted mt-0.5">
                          Pattern-specific strategies for when autopilot takes over
                        </span>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          /* ── Apply dropdown ── */
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

          /* ── Plain links (Discover, Blog, About) ── */
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
