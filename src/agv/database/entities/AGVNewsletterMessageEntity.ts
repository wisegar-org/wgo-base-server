import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";
import { WGBaseEntity } from "../../../core";
import { AGVNewsletterMessageStatusEnum } from "@wisegar-org/wgo-base-models";

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
