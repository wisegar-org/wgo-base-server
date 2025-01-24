import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";
import { WGBaseEntity } from "../../../core";
import { AGVNewsletterInscriptionStatusEnum } from "@wisegar-org/wgo-base-models";

@Entity()
export class AGVNewsletterInscriptionEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ default: "" })
  email!: string;
  @Column({ default: AGVNewsletterInscriptionStatusEnum.Waiting })
  status!: AGVNewsletterInscriptionStatusEnum;
}
