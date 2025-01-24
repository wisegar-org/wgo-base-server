import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class EmailResponse {
  @Field(() => Boolean) sent!: boolean;
  @Field(() => String) error!: string;
  @Field(() => Boolean) isSuccess!: boolean;
}
