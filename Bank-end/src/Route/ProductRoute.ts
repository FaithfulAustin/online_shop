import { IRoute, Router } from "express";
import { IRouterHandler } from "express-serve-static-core";
import { wrapAsync } from "../Utills/errorMiddleware";
import ProductController from "../Controller/ProductController";
import JWTValidator from "../MiddleWare/JWTVaildator";

const productController:ProductController  = new ProductController();
const productRouter = Router();

    productRouter.get("/listsOfProducts",JWTValidator.isLoggedIn, wrapAsync(productController.getAllProducts))
export default productRouter;
