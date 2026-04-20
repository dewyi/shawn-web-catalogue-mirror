import "server-only";
import { orderItems, orders, products } from "@/db/schema";
import type { Order } from "@/modules/orders/types/order.types";
import { db } from "@/shared/lib/db";
import { desc, eq } from "drizzle-orm";

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const result = await db
    .select({
      id: orders.id,
      userId: orders.userId,
      stripeSessionId: orders.stripeSessionId,
      status: orders.status,
      total: orders.total,
      shippingName: orders.shippingName,
      shippingAddressLine1: orders.shippingAddressLine1,
      shippingAddressLine2: orders.shippingAddressLine2,
      shippingCity: orders.shippingCity,
      shippingState: orders.shippingState,
      shippingZip: orders.shippingZip,
      shippingCountry: orders.shippingCountry,
      shippingPhone: orders.shippingPhone,
      createdAt: orders.createdAt,
      updatedAt: orders.updatedAt,
      items: {
        id: orderItems.id,
        orderId: orderItems.orderId,
        productId: orderItems.productId,
        quantity: orderItems.quantity,
        priceAtPurchase: orderItems.priceAtPurchase,
        product: {
          name: products.name,
          slug: products.slug,
          images: products.images,
        },
      },
    })
    .from(orders)
    .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
    .leftJoin(products, eq(orderItems.productId, products.id))
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));

  const grouped: Map<string, Order> = new Map();
  for (const row of result) {
    if (!grouped.has(row.id)) {
      grouped.set(row.id, {
        ...row,
        items: [],
      } as Order);
    }
    const order = grouped.get(row.id)!;
    if (row.items) {
      order.items.push(row.items as any);
    }
  }

  return Array.from(grouped.values());
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const result = await db
    .select({
      id: orders.id,
      userId: orders.userId,
      stripeSessionId: orders.stripeSessionId,
      status: orders.status,
      total: orders.total,
      shippingName: orders.shippingName,
      shippingAddressLine1: orders.shippingAddressLine1,
      shippingAddressLine2: orders.shippingAddressLine2,
      shippingCity: orders.shippingCity,
      shippingState: orders.shippingState,
      shippingZip: orders.shippingZip,
      shippingCountry: orders.shippingCountry,
      shippingPhone: orders.shippingPhone,
      createdAt: orders.createdAt,
      updatedAt: orders.updatedAt,
      items: {
        id: orderItems.id,
        orderId: orderItems.orderId,
        productId: orderItems.productId,
        quantity: orderItems.quantity,
        priceAtPurchase: orderItems.priceAtPurchase,
        product: {
          name: products.name,
          slug: products.slug,
          images: products.images,
        },
      },
    })
    .from(orders)
    .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
    .leftJoin(products, eq(orderItems.productId, products.id))
    .where(eq(orders.id, orderId))
    .limit(1);

  if (result.length === 0) return null;

  const order = result[0] as unknown as Order;
  order.items = result.filter((r) => r.items).map((r) => r.items as any);

  return order;
}

export async function updateOrderStatus(orderId: string, status: Order["status"]): Promise<Order> {
  const result = await db
    .update(orders)
    .set({ status, updatedAt: new Date() })
    .where(eq(orders.id, orderId))
    .returning();

  return result[0] as Order;
}
