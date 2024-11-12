import { ArgsType, Field } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";


@ArgsType()
export class FilterName {

    @Field(()=> String, { nullable:true})
    @IsOptional()
    @IsString()
    filterName?: string;
}