import AuthService from "../Services/Auth.services";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validate } from "class-validator";
import HttpResponse from "../Response/HttpResponse";
import HttpException from "../Error/HttpException";
import { UserDto } from "../Dto/UserDto";
import { SiginDto } from "../Dto/SignInDto";

class AuthController {
    
    private readonly authServices: AuthService;

    constructor() {
        this.authServices = new AuthService();
        
    }

    public register = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) =>{
        try {
            
            const userDtoObj = new UserDto();
            userDtoObj.full_name = request.body.full_name;
            userDtoObj.email = request.body.email;
            userDtoObj.password = request.body.password;
  
            const errors = await validate(userDtoObj)
             if(errors.length !== 0) {
                 console.log(errors.length);
                
                 throw new HttpException(StatusCodes.BAD_REQUEST, errors.flatMap(err =>Object.values(err.constraints??{})));

            }

            const data = await this.authServices.register(userDtoObj);

             return response
             .status(StatusCodes.OK)
             .send(new HttpResponse("success", "User Added", data));
    
        } catch (err: unknown) {
            next(err);
            // return response
            // .status(StatusCodes.INTERNAL_SERVER_ERROR)
            // .send(new HttpResponse("error", "something went wrong try again", err));
        }
    }
    public login = async (
        request: Request,
        response: Response,
        next: NextFunction
    ) =>{
        try {
            
            const userDtoObj = new SiginDto();
            userDtoObj.email = request.body.email;
            userDtoObj.password = request.body.password;
  
            const errors = await validate(userDtoObj)
             if(errors.length !== 0) {
                 console.log(errors.length);
                
                 throw new HttpException(StatusCodes.BAD_REQUEST, errors.flatMap(err =>Object.values(err.constraints??{})));

            }

            const data = await this.authServices.login(userDtoObj);

             return response
             .status(StatusCodes.OK)
             .send(new HttpResponse("success", "Logged in", data));
    
        } catch (err: unknown) {
            next(err);
            // return response
            // .status(StatusCodes.INTERNAL_SERVER_ERROR)
            // .send(new HttpResponse("error", "something went wrong try again", err));
        }
    }
}

export const  authController  = new AuthController();
