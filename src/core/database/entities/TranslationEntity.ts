import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { LanguageEntity } from './LanguageEntity';
import { OGBaseEntity } from './OGBaseEntity';

@Entity({ name: 'translations' })
export class TranslationEntity extends OGBaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ nullable: false }) key!: string;
  @Column({ default: 'Empty' }) value!: string;

  @Column({ nullable: true }) languageId!: number;
  @ManyToOne(() => LanguageEntity, (lang) => lang.id)
  language!: LanguageEntity;
}

export default TranslationEntity;
