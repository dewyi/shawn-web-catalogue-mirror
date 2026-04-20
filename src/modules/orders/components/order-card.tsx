import { formatCurrency } from "@/shared/lib/pricing";
import Link from "next/link";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export function OrderCard({
  order,
}: {
  order: {
    id: string;
    status: string;
    total: string;
    createdAt: Date;
    items: Array<{ quantity: number }>;
  };
}) {
  return (
    <Link
      href={`/dashboard/orders/${order.id}`}
      className="block rounded-lg border p-4 hover:border-blue-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-sm text-gray-500">{order.id}</p>
          <p className="mt-1 font-medium">
            {order.items.length} item{order.items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="text-right">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}
          >
            {order.status}
          </span>
          <p className="mt-1 font-bold">{formatCurrency(order.total)}</p>
        </div>
      </div>
      <p className="mt-2 text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
    </Link>
  );
}
