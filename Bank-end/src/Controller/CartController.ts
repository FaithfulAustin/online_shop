
// import { NextFunction, Request, Response } from "express";
// import { StatusCodes } from "http-status-codes";
// import { validate } from "class-validator";
// import HttpResponse from "../Response/HttpResponse";
// import HttpException from "../Error/HttpException";
// import CartModel from '../Modals/CartModal';

// export default class CartController {
//   public async addToCart(req: Request, res: Response, next: NextFunction) {
//     try {
//       const { productId, quantity } = req.body;
//       const userId = req.userId; // assuming userId is attached to req from JWT middleware

//       let cart = await CartModel.findOne({ userId });

//       if (!cart) {
//         cart = new CartModel({ userId, items: [{ productId, quantity }] });
//       } else {
//         const itemIndex = cart.items.findIndex(item => item.productId === productId);
//         if (itemIndex > -1) {
//           cart.items[itemIndex].quantity += quantity;
//         } else {
//           cart.items.push({ productId, quantity });
//         }
//       }

//       await cart.save();
//       res.status(201).json({ message: 'Item added to cart', cart });
//     } catch (err) {
//       next(err);
//     }
//   }

//   public async getCart(req: Request, res: Response, next: NextFunction) {
//     try {
//       const userId = req.userId;
//       const cart = await CartModel.findOne({ userId }).populate('items.productId');
//       res.status(200).json({ cart });
//     } catch (err) {
//       next(err);
//     }
//   }
// }
