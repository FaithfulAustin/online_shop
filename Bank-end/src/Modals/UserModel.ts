import mongoose, { Schema, model } from "mongoose";
import User from "../Interfaces/User.Interface";


// import bcrypt from "bcrypt"

const userSchema = new Schema<User>({
    full_name: {
        type: String,
        required: false,
    },   
 
 
    joinedAt: {
        type: Date,
        required: false,
        default: Date.now,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },

})

const UserModel = model<User>("users", userSchema)
export default UserModel