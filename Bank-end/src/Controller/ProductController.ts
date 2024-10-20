import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import ProductService from '../Services/Product.service';
import HttpResponse from '../Response/HttpResponse';

export default class ProductController {
  private readonly productService: ProductService;

  constructor(){
    this.productService = new ProductService();
  }
  public getAllProducts = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const products = await this.productService.getAllProducts();
      return response
       .status(StatusCodes.OK)
       .send(new HttpResponse("success", "Lists Of Products", products));

    } catch (err) {
      next(err);
    }
  }


}
