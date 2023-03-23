import { Field, InputType } from "type-graphql";

@InputType()
export class ContactMeInput {
  @Field(() => String, { nullable: true })
  contactName?: string;
  @Field(() => String, { nullable: true })
  address?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  phoneNumber?: string;
  @Field(() => String, { nullable: true })
  mapPath?: string;
}
