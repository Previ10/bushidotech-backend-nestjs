import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

@InputType()
export class SignupInput {
   
    @Field(()=> String)
    @IsEmail()
    email : string;

    @Field(()=> String)
    @IsNotEmpty()
    name : string;
    
    @Field(()=> String)
    @IsNotEmpty()
    lastname : string;

    @Field(()=> String)
    @IsNotEmpty()
    dni : string;

    @Field(()=> String)
    @IsNotEmpty()
    adress : string;

    @Field(()=> String)
    @IsNotEmpty()
    provincia : string;

    @Field(()=> String)
    @IsNotEmpty()
    ciudad : string;
    
    
    @Field(()=> String)
    @MinLength(6)
    passWord : string;

    
    



}