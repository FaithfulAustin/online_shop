import Cart from "../Modals/CartModal";
import HttpException from "../Error/HttpException"
import { StatusCodes } from "http-status-codes"
import { CartDto } from "../Dto/CartDto";
import Jwt from "../Utills/jwt";
import UserModel from "../Modals/UserModel";
import ProductModel from "../Modals/ProductModel";

export default class CartService {
    private cartModel = Cart;
   private user = UserModel;
   private product = ProductModel;


    public async getAllItemUser(token:string) {
        const user = await this.getIdFromToken(token);
        const userId = await (user).id;        
        const items = await this.cartModel.find({ userId }, null ,  { populate: ['productId'] });
        
        if (!items) throw new HttpException(StatusCodes.NOT_FOUND, "No Item Found");
        return items;   
    }
    public async addToCart(cart:CartDto,token:string) {
        const user = await this.getIdFromToken(token);
        const userId = await (user).id;
        
        const productId = await this.product.findById(cart.productId);
        if (!productId) throw new HttpException(StatusCodes.NOT_FOUND, "Product not found");
        if(!userId) throw new HttpException(StatusCodes.NOT_FOUND, "User not found");
        const existingItem = await this.cartModel.findOne({ userId, productId });
        if (existingItem) {
            existingItem.quantity += cart.qty;
            await existingItem.save();
            return existingItem;
        }

        const cartItems = await this.cartModel.create({userId:userId, productId:productId , quantity:cart.qty});
        if (!cartItems) throw new HttpException(StatusCodes.NOT_FOUND, "No Item Found");
        return cartItems;
    }
    public async deleteCartItem(id: string) {
        const item = await this.cartModel.deleteOne({_id:id})
        if (!item) throw new HttpException(StatusCodes.NOT_FOUND, "Item not Found");
        return item;
  
     }
    public async getIdFromToken(token: string) {
        const splitToken = token?.split(' ')
        const { value: email } = Jwt.verifyJwt(splitToken[1] as string)
        const account = await this.user.findOne({ email })
        if (!account) throw new HttpException(StatusCodes.NOT_FOUND, "account not found");
  
                  
        return account;
     }


}