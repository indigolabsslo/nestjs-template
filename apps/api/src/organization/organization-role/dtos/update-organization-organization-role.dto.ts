import { PartialType } from '@nestjs/swagger';
import { ReplaceOrganizationOrganizationRoleDto } from './replace-organization-organization-role.dto';

export class UpdateOrganizationOrganizationRoleDto extends PartialType(
  ReplaceOrganizationOrganizationRoleDto,
) {}
