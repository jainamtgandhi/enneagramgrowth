"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FileText, LayoutDashboard } from "lucide-react";

const navItems = [
  { href: "/teach", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teach/blog", label: "Blog Posts", icon: FileText },
];

export default function FacilitatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-dvh">
      <aside className="w-64 border-r border-border bg-surface p-4 hidden lg:block">
        <div className="mb-8">
          <Link href="/teach" className="font-serif text-lg font-bold text-brand">
            Teach
          </Link>
          <p className="text-small text-ink-muted mt-1">Enneagram Growth</p>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/teach" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-ui transition-colors",
                  isActive
                    ? "bg-brand-soft text-ink font-medium"
                    : "text-ink-muted hover:text-ink hover:bg-surface-sunken"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 pt-4 border-t border-border">
          <Link
            href="/"
            className="text-small text-ink-muted hover:text-ink"
          >
            &larr; Back to site
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
