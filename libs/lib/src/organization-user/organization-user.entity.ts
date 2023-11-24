import { AutoMap } from '@automapper/classes';
import { Organization } from '@lib/organization/organization.entity';
import { User } from '@lib/user/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/entities/base-entity.entity';
import { EOrganizationUserRole } from './enums/organization-user-role.enum';

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

  @AutoMap(() => String)
  @Column({
    type: 'enum',
    enum: EOrganizationUserRole,
    default: EOrganizationUserRole.USER,
    enumName: 'EOrganizationUserRole',
  })
  Role: EOrganizationUserRole;
}
