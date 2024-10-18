import { Trim } from "class-sanitizer";
import { IsNotEmpty, IsString, MinLength, Validate, IsEmail, Matches } from "class-validator";


export class UserDto {

  
    @IsNotEmpty()
    @IsString()
    public full_name!: string;    
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
    @Matches(/(?=.*[@$!%*?&])/, { message: 'Password must contain at least one special character' })    
    public password!: string;
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @Trim()
    public email!: string;
    
    
}