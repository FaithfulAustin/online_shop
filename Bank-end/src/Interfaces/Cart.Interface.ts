import mongoose from "mongoose";

export default interface Cart{

    userId: mongoose.Schema.Types.ObjectId;
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;

}

