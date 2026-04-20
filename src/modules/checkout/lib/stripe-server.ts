import "server-only";
import { stripe } from "@/lib/stripe";
import type { CheckoutSession, ShippingInfo } from "@/modules/checkout/types/checkout.types";

export async function createCheckoutSession(
  items: Array<{ productId: string; quantity: number; price: number }>,
  shipping: ShippingInfo,
  total: number,
  userId: string,
): Promise<CheckoutSession> {
  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: `Product ${item.productId}`,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    customer_email: shipping.name,
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "DE", "FR", "AU"],
    },
    metadata: {
      userId,
      shippingName: shipping.name,
      shippingAddressLine1: shipping.addressLine1,
      shippingAddressLine2: shipping.addressLine2 || "",
      shippingCity: shipping.city,
      shippingState: shipping.state,
      shippingZip: shipping.zip,
      shippingCountry: shipping.country,
      shippingPhone: shipping.phone || "",
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
    total_amount_amount: Math.round(total * 100),
    amount_shipping: undefined,
  });

  if (!session.url) {
    throw new Error("Stripe checkout URL is missing");
  }

  return {
    sessionId: session.id,
    url: session.url,
  };
}
