import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  category: String,
  material: String,
  shortDesc: String,
  longDesc: String,
  price: String,
  picture: String,
});

const Product = models?.Product || model('Product', ProductSchema);

export default Product;
