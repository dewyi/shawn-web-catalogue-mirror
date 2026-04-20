import { orders } from "@/db/schema";
import { OrderCard } from "@/modules/orders/components/order-card";
import { db } from "@/shared/lib/db";
import { desc } from "drizzle-orm";

export default async function AdminOrdersPage() {
  const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(50);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Orders</h1>
      {allOrders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {allOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={{
                id: order.id,
                status: order.status,
                total: order.total,
                createdAt: order.createdAt,
                items: [],
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
