import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray } from "class-validator";
import { ValidRols } from "src/auth/enums/valid-rols.enum";


@ArgsType()
export class ValidRolsArgs {

    @Field(() => [ValidRols], {nullable: true})
    @IsArray()
    rols:ValidRols[] = []
}