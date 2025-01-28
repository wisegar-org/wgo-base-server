import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from "typeorm";
import { WGBaseEntity } from "./WGBaseEntity";

@Entity({ name: "settings" })
export class SettingsEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: "", unique: true })
  type_settings!: string;

  @Column({ type: "json", default: {} })
  settings!: any;
}

export default SettingsEntity;
