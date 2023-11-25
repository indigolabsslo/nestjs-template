import { AutoMap } from '@automapper/classes';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../shared/entities/base-entity.entity';
import { EMediaType } from './enums/media-type.enum';

@Entity('media')
export class Media extends BaseEntity {
  @AutoMap()
  @Column({ unique: true })
  key: string;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column({ default: false })
  public: boolean;

  @AutoMap(() => String)
  @Column({ type: 'enum', enum: EMediaType, enumName: 'EMediaType' })
  type: EMediaType;

  @AutoMap()
  url: string;
}
