import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY environment variable is required");
}

export const stripe = new Stripe(secretKey, {
  apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion,
});
