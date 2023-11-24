import { PartialType } from '@nestjs/swagger';
import { ReplaceOrganizationDto } from './replace-organization.dto';

export class UpdateOrganizationDto extends PartialType(
  ReplaceOrganizationDto,
) {}
