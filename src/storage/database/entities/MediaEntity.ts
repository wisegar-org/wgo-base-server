import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { WGBaseEntity } from "../../../core/database/entities/WGBaseEntity";

@Entity({ name: "media" })
export class MediaEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ default: "" })
  displayName!: string;
  @Column({ default: "" })
  fileName!: string;
  @Column({ default: "" })
  fileExt!: string;
  @Column({ default: "" }) mimeType!: string;
  @Column({ type: "bytea" }) fileContent!: Buffer;

  @Column({ nullable: true, default: false })
  isPublic!: boolean;

  @Column({ default: "" })
  mediaType!: string;

  @Column({ nullable: true, default: "" })
  path!: string;
}

export default MediaEntity;
