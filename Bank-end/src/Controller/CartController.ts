
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validate } from "class-validator";
import HttpResponse from "../Response/HttpResponse";
import HttpException from "../Error/HttpException";
import CartModel from '../Modals/CartModal';
import CartService from "../Services/Cart.service";
import { CartDto } from "../Dto/CartDto";

export default class CartController {
    private readonly cartService: CartService;

    constructor() {
        this.cartService = new CartService();
    }

    public addToCart = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const token = request.headers.authorization
            if (!token) throw new HttpException(StatusCodes.BAD_REQUEST, "Authorization header needed")

            const cartDtoObj = new CartDto();

            cartDtoObj.productId = request.body.productId;
            cartDtoObj.qty = request.body.qty;

            const errors = await validate(cartDtoObj)
            if (errors.length !== 0) {
                throw new HttpException(StatusCodes.BAD_REQUEST, errors.flatMap(err => Object.values(err.constraints ?? {})));
            }

            const data = await this.cartService.addToCart(cartDtoObj, token);
            return response.status(StatusCodes.OK).send(new HttpResponse("success", "Items: ", data))


        } catch (err) {
            next(err);
        }
    }

    public getAllItemUser = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) => {
        try {
            const token = request.headers.authorization
            if (!token) throw new HttpException(StatusCodes.BAD_REQUEST, "Authorization header needed")

            const data = await this.cartService.getAllItemUser(token);
            return response.status(StatusCodes.OK).send(new HttpResponse("success", "Items: ", data))


        } catch (err) {
            next(err);
        }
    }

    public deleteCartItem = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        try {
           
            const itemId= request.params.id as string;
            const data = await this.cartService.deleteCartItem(itemId);
            return response.status(StatusCodes.OK).send(new HttpResponse("success", "Item: ", data))
    
        }
        catch (err: unknown) {
            next(err);
        }
    
    }
    
}

