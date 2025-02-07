import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from "typeorm";
import { WGBaseEntity } from "../../../database/entities/WGBaseEntity";

/**
 * @deprecated
 */
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
