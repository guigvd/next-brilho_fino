import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
  products: Object,
  name: String,
  email: String,
});

const Order = models?.Order || model("Order", OrderSchema);

export default Order;
