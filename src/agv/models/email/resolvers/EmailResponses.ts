import { ObjectType } from "type-graphql";
import { Email } from "./EmailInputs";
import { GenericResponse } from "../../../../core";

@ObjectType()
export class EmailResponse extends GenericResponse(Email) {}
