import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  Generated,
  Index,
} from 'typeorm';
import { HistoryEntity } from './HistoryEntity';

export class OGBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Generated('uuid')
  @Column()
  uuid!: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  creatoIl!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  modificatoIl!: Date;

  @DeleteDateColumn({ nullable: true })
  cancellatoIl!: Date;

  history?: HistoryEntity[];
}
