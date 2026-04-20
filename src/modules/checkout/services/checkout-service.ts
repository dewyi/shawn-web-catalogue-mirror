import "server-only";
import { requireAuth } from "@/modules/auth/lib/auth-helpers";
import { useCartStore } from "@/modules/cart/lib/cart-store";
import { createCheckoutSession } from "@/modules/checkout/lib/stripe-server";
import type { ShippingInfo } from "@/modules/checkout/types/checkout.types";
import { calculateShipping, calculateTax } from "@/shared/lib/pricing";

export async function processCheckout(shipping: ShippingInfo) {
  const session = await requireAuth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const cart = useCartStore.getState();
  if (cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const tax = calculateTax(cart.subtotal);
  const shippingCost = calculateShipping(cart.subtotal);
  const total = cart.subtotal + tax + shippingCost;

  const items = cart.items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price: Number.parseFloat(item.price),
  }));

  return createCheckoutSession(items, shipping, total, session.user.id);
}
