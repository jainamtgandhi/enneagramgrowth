import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8">{children}</main>
    </div>
  );
}
