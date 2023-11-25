import { AutoMap } from '@automapper/classes';
import { DemoItem } from '@lib/demo-item/demo-item.entity';
import { Media } from '@lib/media/media.entity';
import { OrganizationUser } from '@lib/organization-user/organization-user.entity';
import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../shared/entities/base-entity.entity';

@Entity('organization')
export class Organization extends BaseEntity {
  @AutoMap()
  @Column()
  name: string;

  @AutoMap(() => Media)
  @OneToOne(() => Media)
  @JoinColumn()
  image: Media;

  @OneToMany(
    () => OrganizationUser,
    (organizationUser) => organizationUser.organization,
  )
  organizationUsers: OrganizationUser[];

  @OneToMany(() => DemoItem, (demoItem) => demoItem.organization)
  demoItems: DemoItem[];

  @AutoMap()
  numberOfUsers: number;

  @AfterLoad()
  setDetails() {
    this.numberOfUsers = this.organizationUsers?.length ?? 0;
  }
}
