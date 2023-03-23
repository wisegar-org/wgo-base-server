import { ObjectType } from "type-graphql";
import { Email } from "./EmailInputs";
import { GenericResponse } from "../../core/resolvers/CoreResponses";

@ObjectType()
export class EmailResponse extends GenericResponse(Email) {}
