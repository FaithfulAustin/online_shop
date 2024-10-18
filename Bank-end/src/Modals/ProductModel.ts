import mongoose, { Schema, model } from "mongoose";
import Product from "../Interfaces/Product.Interface";


// import bcrypt from "bcrypt"

const productSchema = new Schema<Product>({
 
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

})

const ProductModel = model<Product>("products", productSchema)
export default ProductModel