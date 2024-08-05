import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  lastname: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  dni?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  adress?: string;

  @IsNumber()
  @Field(() => Int, { nullable: true })
  numero?: string;
  
  @IsNumber()
  @Field(() => Int, { nullable: true })
  piso?: string;
  
  @IsString()
  @Field(() => String, { nullable: true })
  provincia?: string;
  
  @IsString()
  @Field(() => String, { nullable: true })
  ciudad?: string;

  @Field(()=> String)
  @MinLength(6)
  passWord : string;
}