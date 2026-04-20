import { getServerSession } from "@/modules/auth/lib/auth-helpers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  if (session.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-[80vh] gap-6 container-max py-8">
      <aside className="hidden w-56 shrink-0 md:block">
        <nav className="space-y-1">
          <a
            href="/dashboard"
            className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Overview
          </a>
          <a
            href="/dashboard/products"
            className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Products
          </a>
          <a
            href="/dashboard/orders"
            className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Orders
          </a>
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}
