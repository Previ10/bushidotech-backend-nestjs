import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs/singup.imputs';
import { AuthResponse } from './types/login-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(@Args('signupInput') signupInput: SignupInput): Promise<AuthResponse> {
    return await this.authService.signup(signupInput);
  }

  // @Mutation(() => AuthResponse, { name: 'login' })
  // async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
  //   return await this.authService.login(loginInput);
  // }

  // @Mutation(() => AuthResponse, { name: 'revalidateToken' })
  // async revalidateToken(@Args('token', { type: () => String }) token: string): Promise<AuthResponse> {
  //   return await this.authService.revalidateToken(token);
  // }
 
}
