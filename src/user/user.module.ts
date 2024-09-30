import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailerService } from 'src/utils/mailer.service';
import { Product } from 'src/products/entities/product.entity';

@Module({
  providers: [
    UserResolver,
    UserService,
    MailerService,
  ],
  imports: [TypeOrmModule.forFeature([User, Product])],
  exports: [UserService],
})
export class UserModule {}
