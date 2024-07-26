import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponse } from './types/login-response.type';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/inputs/login.inputs';
import * as bcrypt from 'bcrypt';
import { SignupInput } from './dto/inputs/singup.inputs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  private getJwtToken(userId: string){
    return this.jwtService.sign({id: userId})
  }

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.userService.registerUser(signupInput);
    
    const token = this.getJwtToken(user.id);

    return {
      token,user,};
}

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, passWord } = loginInput;
    const user = await this.userService.findOneByemail(email);

    const isPasswordValid = await bcrypt.compare(passWord, user.passWord);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }
  async validateUser(id:string): Promise<User>{
   const user = await this.userService.findOneByid(id);
   if(!user.isActive ){
      throw new UnauthorizedException(`User is inactive, talk with an admin`)

   }
   delete user.passWord
   return user;

  }

  revalidateToken (user:User):AuthResponse {

    const token = this.getJwtToken(user.id);
    return {token, user}
  }
}