import { AutoMap } from '@automapper/classes';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @CreateDateColumn()
  createDate: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedDate: Date;
}
