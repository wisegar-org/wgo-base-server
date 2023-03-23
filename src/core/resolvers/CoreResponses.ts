import { ClassType, Field, ObjectType } from "type-graphql";

export function GenericResponse<T>(TItemClass: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class Response {
    @Field()
    isSuccess!: boolean;
    @Field(() => TItemClass, { nullable: true })
    result!: T | null;
    @Field(() => String, { nullable: true })
    message!: string | null;
    @Field(() => String, { nullable: true })
    error!: string | null;
  }
  return Response;
}

export function GenericArrayResponse<T>(TItemClass: ClassType<T>) {
  @ObjectType({ isAbstract: true })
  abstract class ArrayResponse {
    @Field()
    isSuccess!: boolean;
    @Field(() => [TItemClass])
    result!: T[] | null;
    @Field(() => String, { nullable: true })
    message!: string | null;
    @Field(() => String, { nullable: true })
    error!: string | null;
  }
  return ArrayResponse;
}

@ObjectType()
export class LocalStorageResponse {
  @Field(() => String, { nullable: false })
  storage?: string;
}
