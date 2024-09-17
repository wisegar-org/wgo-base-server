import "reflect-metadata";
import { Column, Entity } from "typeorm";
import { OGBaseEntity } from "./OGBaseEntity";
import { Actions } from "wgo-core-models";

@Entity({ name: "journal_history" })
export class HistoryEntity extends OGBaseEntity {
  @Column()
  entity!: string;
  @Column()
  recordId!: number;
  @Column()
  userId!: number;
  @Column()
  username!: string;
  @Column()
  message!: string;
  @Column({ type: "enum", enum: Actions })
  action!: Actions;

  @Column({ type: "jsonb", nullable: true })
  snapshot?: { [key: string]: unknown };
}
