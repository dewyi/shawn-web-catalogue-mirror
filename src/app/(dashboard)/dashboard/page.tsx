import { orders, products, users } from "@/db/schema";
import { db } from "@/shared/lib/db";
import { formatCurrency } from "@/shared/lib/pricing";
import { count, sum } from "drizzle-orm";

export default async function DashboardPage() {
  const [orderCount, productCount, userCount, revenueResult] = await Promise.all([
    db.select({ count: count() }).from(orders),
    db.select({ count: count() }).from(products),
    db.select({ count: count() }).from(users),
    db.select({ total: sum(orders.total) }).from(orders),
  ]);

  const revenue = revenueResult[0]?.total || "0";

  const stats = [
    { label: "Total Orders", value: orderCount[0]?.count || 0 },
    { label: "Total Products", value: productCount[0]?.count || 0 },
    { label: "Total Users", value: userCount[0]?.count || 0 },
    { label: "Revenue", value: formatCurrency(revenue) },
  ];

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border p-6">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
