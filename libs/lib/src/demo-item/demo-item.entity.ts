import { AutoMap } from '@automapper/classes';
import { Organization } from '@lib/organization/organization.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/entities/base-entity.entity';

@Entity('demo-item')
export class DemoItem extends BaseEntity {
  @AutoMap()
  @Column()
  name: string;

  @AutoMap(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.demoItems)
  organization: Organization;
}
