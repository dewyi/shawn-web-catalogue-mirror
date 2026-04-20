import { useCartStore } from "@/modules/cart/lib/cart-store";
import { Button } from "@/shared/components/button";
import { calculateShipping, calculateTax, formatCurrency } from "@/shared/lib/pricing";
import Link from "next/link";

export function CartSummary() {
  const { items, subtotal } = useCartStore();

  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-gray-500">Your cart is empty</p>
        <Link href="/products">
          <Button className="mt-4">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (8%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
        </div>
        <div className="border-t pt-2 text-base font-bold flex justify-between">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
      <Link href="/checkout" className="block mt-4">
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </Link>
    </div>
  );
}
