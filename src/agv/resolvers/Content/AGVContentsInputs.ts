import { Field, InputType, Int } from "type-graphql";

@InputType()
export class AGVContentsInput {
  @Field(() => String) contents!: string;
}
