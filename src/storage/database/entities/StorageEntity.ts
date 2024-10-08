import {
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
  Column,
} from "typeorm";
import { WGBaseEntity } from "../../../core/database/entities/WGBaseEntity";
import { MediaEntity } from "../../../core";

@Entity({ name: "storage" })
export class StorageEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: "" })
  type!: string;

  @Column({ type: "json", default: {} })
  content: any;

  @Column({ nullable: true })
  imageId!: number;
  @ManyToOne(() => MediaEntity, (media) => media.id)
  image!: MediaEntity;

  @ManyToMany(() => MediaEntity)
  @JoinTable()
  imageList!: MediaEntity[];
}

export default StorageEntity;
