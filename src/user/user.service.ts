import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { Repository, EntityNotFoundError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SignupInput } from 'src/auth/dto/inputs/singup.inputs';
import { ValidRols } from 'src/auth/enums/valid-rols.enum';

@Injectable()
export class UserService {
  private users: User[] = [];

  // Inicializar logger con un contexto más específico
  private logger: Logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async registerUser(signupInput: SignupInput): Promise<User> {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: { email: signupInput.email },
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

  async create(createUserInput: CreateUserInput): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserInput.email },
    });

    if (existingUser) {
      throw new ConflictException(
        `Ya existe un usuario registrado con ese correo electronico`,
      );
    }

    const newUser = this.usersRepository.create(createUserInput);
    return await this.usersRepository.save(newUser);
  }

  async findAll(rol: ValidRols[]): Promise<User[]> {

    if(rol.length === 0) return this.usersRepository.find();
    return this.usersRepository.createQueryBuilder()
    .andWhere('ARRAY[rol] && ARRAY[:...rol]')
    .setParameter('rol', rol)
    .getMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User id # ${id} not found`);
    return user;
  }

  async findOneByemail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`${email} not found`);
      }
      throw error;
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);
    const updatedUser = this.usersRepository.merge(user, updateUserInput);
    return await this.usersRepository.save(updatedUser);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return { ...user, id };
  }

  async findOneByid(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ id });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(`${id} not found`);
      }
      throw error;
    }
  }

  // Manejo de errores
  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('key ', ''));
    }
    if (error.code === 'error-001') {
      const message = error.detail ? error.detail.replace('key ', '') : 'An unknown error occurred';
      throw new BadRequestException(message);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Please check the server logs for more details');
  }


}