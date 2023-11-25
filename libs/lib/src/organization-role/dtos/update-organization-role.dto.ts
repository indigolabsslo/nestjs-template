import { PartialType } from '@nestjs/swagger';
import { ReplaceOrganizationRoleDto } from './replace-organization-role.dto';

export class UpdateOrganizationRoleDto extends PartialType(
  ReplaceOrganizationRoleDto,
) {}
