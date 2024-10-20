import mongoose, { Schema, model } from 'mongoose';
import Product from "../Interfaces/Product.Interface";


const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  imgUrl: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductModel = model<Product>('Product', productSchema);
export default ProductModel;
