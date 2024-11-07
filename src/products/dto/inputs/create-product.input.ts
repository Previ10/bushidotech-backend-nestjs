import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { FeatureInput } from 'src/features/dto/create-feature.input';

@InputType()
export class CreateProductInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @IsOptional()
  @Field(() => FeatureInput, { nullable: true })
  features?: FeatureInput;


  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  image?: string; 

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  brand?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  type?: string;

  @IsNumber()
  @IsOptional()
  @Field(() => Float, { nullable: true })
  precio?: number;

  @IsNumber()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  stock?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  garantia?: string[];
}