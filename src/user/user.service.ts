import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupInput } from 'src/auth/dto/inputs/singup.imputs';
import { error } from 'console';

@Injectable()
export class UserService {
  private users: User[] = []; 

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {
    
  }

   
  async registerUser(signupInput: SignupInput): Promise<User> {
    try {
        const existingUser = await this.usersRepository.findOne({ where: { email: signupInput.email } });
        if (existingUser) {
            throw new BadRequestException('Ya existe un usuario cargado con este email');
        }

        const newUser = this.usersRepository.create(signupInput);
        return await this.usersRepository.save(newUser);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw new BadRequestException("Algo salió mal al registrar el usuario");
    }
}

  
  async create(createUserInput: CreateUserInput): Promise <User> {
    const newUser = this.usersRepository.create(createUserInput)
    return await this.usersRepository.save(newUser);
     
  }
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User>{
    const user = await this.usersRepository.findOneBy({id})
    if(!user) throw new NotFoundException(`User id # ${id} not found`);
    return await user;
  }
  
  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);
    const updatedUser = this.usersRepository.merge(user, updateUserInput);
    return await this.usersRepository.save(updatedUser);
  }

 
  async remove(id: string) {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user)
    return {...user, id}
  }
}
