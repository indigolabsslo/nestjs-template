import { DemoItem } from '@lib/demo-item/demo-item.entity';
import { Media } from '@lib/media/media.entity';
import { OrganizationRole } from '@lib/organization-role/organization-role.entity';
import { OrganizationUser } from '@lib/organization-user/organization-user.entity';
import { Organization } from '@lib/organization/organization.entity';
import { BaseEntity } from '@lib/shared/entities/base-entity.entity';
import { User } from '@lib/user/user.entity';

export const Entities = [
  DemoItem,
  Media,
  OrganizationRole,
  OrganizationUser,
  Organization,
  BaseEntity,
  User,
];
