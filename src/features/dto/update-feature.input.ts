import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { FeatureInput } from './create-feature.input';

@InputType()
export class UpdateFeatureInput extends PartialType(FeatureInput) {
  @Field(() => Int)
  id: number;
}
