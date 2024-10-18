import { IRoute, Router } from "express";
import { authController } from "../Controller/AuthController";
import { IRouterHandler } from "express-serve-static-core";
import { wrapAsync } from "../Utills/errorMiddleware";
const authRouter = Router();

    authRouter.post("/register", wrapAsync(authController.register))
    authRouter.post("/login", wrapAsync(authController.login))
export default authRouter;
