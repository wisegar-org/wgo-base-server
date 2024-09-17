import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import "reflect-metadata";
import { UserEntity } from "./UserEntity";
import { WGBaseEntity } from "./WGBaseEntity";

@Entity({ name: "roles" })
export class RoleEntity extends WGBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @ManyToMany(() => UserEntity, (user: any) => user.roles)
  users?: UserEntity[];
}
