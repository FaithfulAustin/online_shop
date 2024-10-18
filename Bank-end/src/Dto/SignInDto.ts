import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsString, MinLength, Validate, IsEmail, Matches } from "class-validator";


export class SiginDto {


    @IsNotEmpty()    
    public password!: string;
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @Trim()
    public email!: string;


}