import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePreferenceDto {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  productId: string;
  
  @IsNotEmpty()
  @Field(() => Int)
  quantity: number;
}