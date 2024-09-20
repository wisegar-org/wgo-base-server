import { ObjectType } from "type-graphql";
import { WGEmail } from "./WGEmailInputs";
import { GenericResponse } from "../../core/resolvers/CoreResponses";

@ObjectType()
export class WGEmailResponse extends GenericResponse(WGEmail) {}
