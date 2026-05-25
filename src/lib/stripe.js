import Stripe from "stripe";
import config from "./config";

if (!config.stripe.secretKey) {
  console.warn("STRIPE_SECRET_KEY is missing in your environment config variables.");
}

export const stripe = new Stripe(config.stripe.secretKey || "", {
  apiVersion: "2022-11-15",
});
