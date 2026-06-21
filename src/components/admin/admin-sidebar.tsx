"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, FileText, Flag, LayoutDashboard } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/library", label: "Library", icon: BookOpen },
  { href: "/admin/feature-flags", label: "Feature Flags", icon: Flag },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card p-4 hidden lg:block">
      <div className="mb-8">
        <Link href="/admin" className="font-heading text-lg font-bold text-primary">
          Admin
        </Link>
        <p className="text-xs text-muted-foreground mt-1">The Practice</p>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-8 pt-4 border-t">
        <Link
          href="/"
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          &larr; Back to site
        </Link>
      </div>
    </aside>
  );
}
