import { Injectable } from '@nestjs/common';
import { SignupInput } from './dto/inputs/singup.imputs';
import { AuthResponse } from './types/login-response.type';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

constructor(
    private readonly userServide:UserService,
){

}

async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.userServide.registerUser(signupInput);
    const token = "ABC123"

    return {
        token,
        user,
    };

}
}
