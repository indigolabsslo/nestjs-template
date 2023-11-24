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
  Name: string;

  @AutoMap(() => Media)
  @OneToOne(() => Media)
  @JoinColumn()
  Image: Media;

  @OneToMany(
    () => OrganizationUser,
    (organizationUser) => organizationUser.Organization,
  )
  OrganizationUsers: OrganizationUser[];

  @OneToMany(() => DemoItem, (demoItem) => demoItem.Organization)
  DemoItems: DemoItem[];

  @AutoMap()
  NumberOfUsers: number;

  @AfterLoad()
  setDetails() {
    this.NumberOfUsers = this.OrganizationUsers?.length ?? 0;
  }
}
