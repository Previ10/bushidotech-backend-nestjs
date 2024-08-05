import { registerEnumType } from "@nestjs/graphql";

 
 export enum ValidRols{

    admin = 'admin',
    user = 'user',
    superUser = 'superUser'

 }

 registerEnumType(ValidRols,{name:'ValidRols', description:'These are authorized roles'})