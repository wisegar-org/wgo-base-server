import { Field, ObjectType } from "type-graphql";
import { MediaResponse } from "../../../storage";

@ObjectType()
export class IndexContentResponse {
  @Field(() => MediaResponse, { nullable: true }) image!: MediaResponse;
}
