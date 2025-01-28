import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";
import { AGVNewsletterInscriptionStatusEnum } from "@wisegar-org/wgo-base-models";
import { WGBaseEntity } from "../../core";

@Entity()
export class AGVNewsletterInscriptionEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ default: "" })
  email!: string;
  @Column({ default: AGVNewsletterInscriptionStatusEnum.Waiting })
  status!: AGVNewsletterInscriptionStatusEnum;
}
