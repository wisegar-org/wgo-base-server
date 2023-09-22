import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class EmailFromToAppInput {
  @Field(() => String) subject!: string;
  @Field(() => String) body!: string;
  @Field(() => String, { nullable: true }) data!: string;
}
@InputType()
export class EmailToAppInput extends EmailFromToAppInput {
  @Field(() => String) from!: string;
}
@InputType()
export class EmailInput extends EmailToAppInput {
  @Field(() => String) to!: string;
}

@InputType()
export class EmailToAddressAndAppInput extends EmailFromToAppInput {
  @Field(() => String) to!: string;
}

@ObjectType()
export class EmailFromToApp {
  @Field(() => String) subject!: string;
  @Field(() => String) body!: string;
}
@ObjectType()
export class EmailToApp extends EmailFromToApp {
  @Field(() => String) from!: string;
}
@ObjectType()
export class Email extends EmailToApp {
  @Field(() => String) to!: string;
}
