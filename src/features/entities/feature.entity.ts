import { ObjectType, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@ObjectType()
export class Feature {
  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  general?: string[];

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  conectividad?: string[];

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  consumoEnergia?: string[];

  @Field(() => [String], { nullable: true })
  @Column('text', { array: true, nullable: true })
  dimensiones?: string[];
}