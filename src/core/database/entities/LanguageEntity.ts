import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WGBaseEntity } from "./WGBaseEntity";
import { MediaEntity } from "../..";

@Entity({ name: "languages" })
export class LanguageEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ default: "" })
  code!: string;
  @Column({ default: false })
  enabled!: boolean;
  @Column({ default: false })
  default!: boolean;

  @Column({ nullable: true })
  logoId!: number;
  @ManyToOne(() => MediaEntity, (media) => media.id)
  logo!: MediaEntity;
}
