import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { WGBaseEntity } from "./WGBaseEntity";

@Entity({ name: "contact_me" })
export class ContactMeEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ default: "" })
  contactName!: string;
  @Column({ default: "" })
  address!: string;
  @Column({ default: "" })
  email!: string;
  @Column({ default: "" })
  phoneNumber!: string;
  @Column({ default: "" })
  mapPath!: string;
}

export default ContactMeEntity;
