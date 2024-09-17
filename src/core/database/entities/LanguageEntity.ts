import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import MediaEntity from "./MediaEntity";
import { OGBaseEntity } from "./OGBaseEntity";

@Entity({ name: "languages" })
export class LanguageEntity extends OGBaseEntity {
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
