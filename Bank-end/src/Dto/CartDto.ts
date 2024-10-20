import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsString, MinLength, Validate, IsEmail, Matches } from "class-validator";



export class CartDto {
 
    @IsNotEmpty() 
    @IsString()
    public productId!: string;
    public qty!: number;
}