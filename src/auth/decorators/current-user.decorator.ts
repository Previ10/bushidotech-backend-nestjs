import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { ValidRols } from '../enums/valid-rols.enum';

[
  ValidRols.user,
  ValidRols.admin,
  ValidRols.superUser,

]

export const CurrentUser = createParamDecorator(
  (rols: ValidRols[] = [], context: ExecutionContext) => {

    console.log({rols})
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException(`No user inside the request - make sure that we use AuthGuard`);
    }
    if(rols.length === 0) return user;

    for(const rol of user.rol){
      if(rols.includes(rol as ValidRols)) {


        return user;
      }

      
    }

    throw new ForbiddenException(`User ${user.name} ${user.lastname} need a valid role [${rols}]`)

  },

);