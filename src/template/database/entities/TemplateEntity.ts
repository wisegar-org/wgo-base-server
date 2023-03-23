import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from "typeorm";
import { WGBaseEntity } from "../../../core/database/entities/WGBaseEntity";

@Entity({ name: "templates" })
export class TemplateEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;
  @Column({ type: "text" })
  body!: string;
  @Column({ default: "" })
  documentType!: string;
}

export default TemplateEntity;
