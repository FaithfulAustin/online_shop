import mongoose, { Schema, model } from 'mongoose';

interface CartItem {
  productId: string;
  quantity: number;
}

interface Cart {
  userId: string;
  items: CartItem[];
}

const cartSchema = new Schema<Cart>({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

const CartModel = model<Cart>('Cart', cartSchema);
export default CartModel;
