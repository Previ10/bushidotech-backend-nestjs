import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupInput } from 'src/auth/dto/inputs/singup.imputs';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  private users: User[] = []; 

  //clase creada  por nest para mostrar logs en e consola.
  private logger: Logger = new Logger()

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {
    
  }

   
  async registerUser(signupInput: SignupInput): Promise<User> {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: [
          { email: signupInput.email },
        ],
      });
  
      if (existingUser) {
        throw new ConflictException(
          `Ya existe un usuario registrado con ese correo electronico`,
        );
      }
  
      const newUser = this.usersRepository.create({
        ...signupInput,
        passWord: bcrypt.hashSync(signupInput.passWord, 10)
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  
  async create(createUserInput: CreateUserInput): Promise <User> {


      const existingUser = await this.usersRepository.findOne({
        where: [
          { email: createUserInput.email },
        ],
      });
  
      if (existingUser) {
        throw new ConflictException(
          `Ya existe un usuario registrado con ese correo electronico`,
        );
      }
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

  //Manejo de errores:

  private handleDBErrors(error : any) : never {
    this.logger.error( error);
    
    if(error.code === '23505'){
      throw new BadRequestException(error.detail.replace('key ',''))

    }
    throw new InternalServerErrorException('please check')

  }
}
