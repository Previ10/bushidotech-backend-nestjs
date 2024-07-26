import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponse } from './types/login-response.type';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/inputs/login.inputs';
import * as bcrypt from 'bcrypt';
import { SignupInput } from './dto/inputs/singup.inputs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.userService.registerUser(signupInput);
    const token = "ABC123"; 
    
    // const token = this.jwtService.sign(

    // ) 

    return {
      token,
      user,
    };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, passWord } = loginInput;
    const user = await this.userService.findOneByemail(email);

    const isPasswordValid = await bcrypt.compare(passWord, user.passWord);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const token = "ABC123"; 

    return {
      token,
      user,
    };
  }
}