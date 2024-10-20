import Product from "../Modals/ProductModel";
import HttpException from "../Error/HttpException"
import { StatusCodes } from "http-status-codes"

export default class ProductService {
    private productsModel = Product;

    public async getAllProducts() {
        const products = await this.productsModel.find();
        if (!products) throw new HttpException(StatusCodes.NOT_FOUND, "No products Found");
        return products;
    }


}