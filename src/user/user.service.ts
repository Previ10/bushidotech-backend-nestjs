import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { Repository, EntityNotFoundError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
const bcrypt = require('bcryptjs');
import { SignupInput } from 'src/auth/dto/inputs/singup.inputs';
import { ValidRols } from 'src/auth/enums/valid-rols.enum';
import { MailerService } from 'src/utils/mailer.service';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  // Inicializar logger con un contexto más específico
  private logger: Logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,  // El repositorio de usuarios
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,  // El repositorio de productos
    private readonly mailerService: MailerService,
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
        passWord: bcrypt.hashSync(signupInput.passWord, 10),

        
        
      });
       console.log(newUser.passWord);
       
      const savedUser = await this.usersRepository.save(newUser);

      let dataEmail = {
        type : 'welcome',
        email : savedUser.email,
        data : {
          username: savedUser.email
        },
      }
      // Envía el correo electrónico
      await this.mailerService.sendMail(
        dataEmail, 
      );

      return savedUser;
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
    const savedUser = await this.usersRepository.save(newUser);

    let dataEmail = { 
      type : "welcome",
      email : savedUser.email,
      data : {
        username: savedUser.email
      },
    }
    // Envía el correo electrónico
    await this.mailerService.sendMail(
      dataEmail
    );

    return savedUser;
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

  async addToFavorites(userId: number, productId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId.toString() },
      relations: ['products'],
    });

    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!user || !product) {
      throw new Error('Usuario o producto no encontrado');
    }

    user.products.push(product);
    return this.usersRepository.save(user);
  }

  async removeFromFavorites(userId: number, productId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId.toString() },
      relations: ['products'],  
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Filtrar la lista de productos del usuario para eliminar el producto
    user.products = user.products.filter(p => p.id !== product.id);

    return await this.usersRepository.save(user);  // Guarda los cambios en la base de datos
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