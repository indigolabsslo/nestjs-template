import { AutoMap } from '@automapper/classes';
import { OrganizationUser } from '@lib/organization-user/organization-user.entity';
import { Organization } from '@lib/organization/organization.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/entities/base-entity.entity';

@Entity('organization-role')
export class OrganizationRole extends BaseEntity {
  @AutoMap()
  @Column()
  name: string;

  @AutoMap(() => [String])
  @Column('text', { array: true })
  permissions: string[];

  @AutoMap(() => Organization)
  @ManyToOne(
    () => Organization,
    (organization) => organization.organizationUsers,
  )
  organization: Organization;

  @OneToMany(
    () => OrganizationUser,
    (organizationUser) => organizationUser.organizationRole,
  )
  organizationUsers: OrganizationUser[];
}
