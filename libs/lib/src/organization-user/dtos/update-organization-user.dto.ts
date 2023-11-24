import { PartialType } from '@nestjs/swagger';
import { ReplaceOrganizationUserDto } from './replace-organization-user.dto';

export class UpdateOrganizationUserDto extends PartialType(
  ReplaceOrganizationUserDto,
) {}
