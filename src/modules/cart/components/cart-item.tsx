import { useCartStore } from "@/modules/cart/lib/cart-store";
import { formatCurrency } from "@/shared/lib/pricing";
import { Minus, Plus, Trash2 } from "lucide-react";

export function CartItemRow({
  item,
}: {
  item: {
    id: string;
    productId: string;
    productName: string;
    productSlug: string;
    productImage: string;
    price: string;
    quantity: number;
  };
}) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 border-b py-4">
      <img
        src={item.productImage || "/placeholder.svg"}
        alt={item.productName}
        className="h-20 w-20 rounded-md object-cover bg-gray-100"
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <a
            href={`/products/${item.productSlug}`}
            className="font-medium text-gray-900 hover:text-blue-600"
          >
            {item.productName}
          </a>
          <p className="text-sm text-blue-600 font-bold">{formatCurrency(item.price)}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border">
            <button
              type="button"
              className="p-1 text-gray-600 hover:bg-gray-100"
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-3 text-sm">{item.quantity}</span>
            <button
              type="button"
              className="p-1 text-gray-600 hover:bg-gray-100"
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            className="p-1 text-gray-400 hover:text-red-500"
            onClick={() => removeItem(item.productId)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="text-right font-bold">
        {formatCurrency((Number.parseFloat(item.price) * item.quantity).toString())}
      </div>
    </div>
  );
}
