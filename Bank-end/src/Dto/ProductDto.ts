import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsString, MinLength, Validate, IsEmail, Matches } from "class-validator";



export class ProductDto {
    @IsNotEmpty() 
    @IsString()
    public name!: string;
    @IsNotEmpty() 
    @IsString()
    public imgUrl!: string;
    public price!: number;
}