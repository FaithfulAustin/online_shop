import mongoose, { Schema, model } from 'mongoose';

interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
});

const ProductModel = model<Product>('Product', productSchema);
export default ProductModel;
