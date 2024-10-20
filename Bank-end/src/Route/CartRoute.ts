import { IRoute, Router } from "express";
import { wrapAsync } from "../Utills/errorMiddleware";
import CartController from "../Controller/CartController";
import JWTValidator from "../MiddleWare/JWTVaildator";

const cartController: CartController = new CartController();
const cartRouter = Router();

cartRouter.post("/addToCart", JWTValidator.isLoggedIn, wrapAsync(cartController.addToCart))
cartRouter.get("/getAUserItem", JWTValidator.isLoggedIn, wrapAsync(cartController.getAllItemUser))
cartRouter.delete('/deleteCartItem/:id',JWTValidator.isLoggedIn, wrapAsync(cartController.deleteCartItem));

export default cartRouter;
