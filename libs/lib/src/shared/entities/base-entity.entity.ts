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
  Id: string;

  @AutoMap()
  @CreateDateColumn()
  CreateDate: Date;

  @AutoMap()
  @UpdateDateColumn()
  UpdatedDate: Date;
}
