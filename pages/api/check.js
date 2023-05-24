import { initMongoose } from "../../lib/mongoose";

export default async function handler(req, res) {
  await initMongoose();

  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  const { name, email, products } = req.body;

  

  res.json("ok");
}
