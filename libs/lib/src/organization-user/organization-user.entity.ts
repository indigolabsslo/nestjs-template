import { AutoMap } from '@automapper/classes';
import { OrganizationRole } from '@lib/organization-role/organization-role.entity';
import { Organization } from '@lib/organization/organization.entity';
import { User } from '@lib/user/user.entity';
import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/entities/base-entity.entity';

@Entity('organization-user')
export class OrganizationUser extends BaseEntity {
  @AutoMap(() => Organization)
  @ManyToOne(
    () => Organization,
    (organization) => organization.OrganizationUsers,
  )
  Organization: Organization;

  @AutoMap(() => User)
  @ManyToOne(() => User, (user) => user.OrganizationUsers)
  User: User;

  @AutoMap(() => OrganizationRole)
  @ManyToOne(
    () => OrganizationRole,
    (organizationRole) => organizationRole.organizationUsers,
  )
  organizationRole: OrganizationRole;
}
