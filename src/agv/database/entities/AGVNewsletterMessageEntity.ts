import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";
import { AGVNewsletterMessageStatusEnum } from "../../models/enums";
import { WGBaseEntity } from "../../../core";

@Entity()
export class AGVNewsletterMessageEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ default: "" })
  title!: string;
  @Column({ type: "text", default: "" })
  message!: string;
  @Column({ default: AGVNewsletterMessageStatusEnum.Waiting })
  status!: AGVNewsletterMessageStatusEnum;
}
