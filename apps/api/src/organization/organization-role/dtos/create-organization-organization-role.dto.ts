import { CreateOrganizationRoleDto } from '@lib/organization-role/dtos/create-organization-role.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateOrganizationOrganizationRoleDto extends OmitType(
  CreateOrganizationRoleDto,
  ['organizationId'] as const,
) {}
{
}
