import { Entity,  Column } from "typeorm";
import { OGBaseEntity } from "./OGBaseEntity";

@Entity({ name: "roles" })
export class RolEntity extends OGBaseEntity {
  @Column({ unique: true })
  name!: string;
}

export default RolEntity;
