import { UserDto } from "../Dto/UserDto";
import HttpException from "../Error/HttpException"
import { StatusCodes } from "http-status-codes"
import UserModel from "../Modals/UserModel";
import encryptPassword from "../Utills/encryptPassword";
import { SiginDto } from "../Dto/SignInDto";
import Jwt from "../Utills/jwt";

export default class AuthService {
    private userModel = UserModel

   public async register(user:UserDto) {
    const account = await this.findByEmail(user.email)
    if (account) throw new HttpException(StatusCodes.CONFLICT, "Email already exists");
   
  
    const encryptedPassword = await  encryptPassword.encryptPassword(user.password);
    const newUser = await this.userModel.create({ ...user, password: encryptedPassword });
    if (!newUser) throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "an error occurred");
    return newUser;
}
public async login(user:SiginDto) {

  const account = await this.findByEmail(user.email)
  if (!account) throw new HttpException(StatusCodes.CONFLICT, "User does not exists");
  const isPasswordValid = await encryptPassword.checkPassword(user.password, account.password);
  if (!isPasswordValid) throw new HttpException(StatusCodes.CONFLICT, "Password does not match");
  const token = Jwt.signJwt(user.email, "30d")
  const returnData ={
    ...account,
    token
   }

   return returnData;
}

public async findByEmail(email: string) {
    const account = await this.userModel.findOne({ email })
    return account;
  }
}
