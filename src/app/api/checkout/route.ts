import { requireAuth } from "@/modules/auth/lib/auth-helpers";
import { useCartStore } from "@/modules/cart/lib/cart-store";
import { createCheckoutSession } from "@/modules/checkout/lib/stripe-server";
import { calculateShipping, calculateTax } from "@/shared/lib/pricing";
import { addressSchema } from "@/shared/lib/validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await requireAuth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validated = addressSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: validated.error.errors[0].message }, { status: 400 });
    }

    const shipping = validated.data;
    const cart = useCartStore.getState();

    if (cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const tax = calculateTax(cart.subtotal);
    const shippingCost = calculateShipping(cart.subtotal);
    const total = cart.subtotal + tax + shippingCost;

    const items = cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: Number.parseFloat(item.price),
    }));

    const result = await createCheckoutSession(items, shipping, total, session.user.id);

    return NextResponse.json({ url: result.url });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
