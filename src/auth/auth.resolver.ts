import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs/singup.inputs';
import { AuthResponse } from './types/login-response.type';
import { LoginInput } from './dto/inputs/login.inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(@Args('signupInput') signupInput: SignupInput): Promise<AuthResponse> {
    return await this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
    return await this.authService.login(loginInput);
  }

@Query(() => AuthResponse, { name: 'revalidate' })
@UseGuards(JwtAuthGuard)
revalidateToken(
  @CurrentUser() user: User
): AuthResponse {

  return this.authService.revalidateToken(user);
}
}