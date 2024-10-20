import mongoose, { Schema, model } from 'mongoose';

import Cart from '../Interfaces/Cart.Interface';



const cartSchema = new Schema<Cart>({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const CartModel = model<Cart>('Cart', cartSchema);
export default CartModel;
