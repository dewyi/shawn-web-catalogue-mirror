"use client";

import { CartItemRow } from "@/modules/cart/components/cart-item";
import { CartSummary } from "@/modules/cart/components/cart-summary";
import { useCartStore } from "@/modules/cart/lib/cart-store";

export default function CartPage() {
  const { items } = useCartStore();

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
            {items.map((item) => (
              <CartItemRow key={item.productId} item={item} />
            ))}
          </div>
        )}
      </div>
      <div>
        <CartSummary />
      </div>
    </div>
  );
}
