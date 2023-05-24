import { initMongoose } from "../../lib/mongoose";
import Order from "../../models/Order";

// const stripePromisse = loadStripe(process.env.STRIPE_SECRET_KEY);
const stripePromisse = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await initMongoose();

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { name, email, products } = req.body;

  try {
    const order = await Order.create({
      name,
      email,
      products,
    });

    const stripe = await stripePromisse;

    const lineItems = products.map((product) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.count,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      customer_email: email,
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: { orderId: order._id.toString() },
    });

    const sessionId = session.id;

    res.status(200).json({ sessionId: sessionId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
