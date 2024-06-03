import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' }) 
  findAll() {
    return this.userService.findAll();
  }
  
  @Query(() => User, { name: 'user' }) 
  findOne(@Args('id', { type: () => ID },  ) id: string) {
    return this.userService.findOne(id);
  }
  
  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ): Promise<User> {
    return await this.userService.update(id, updateUserInput);
  }


  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.userService.remove(id);
  }


}