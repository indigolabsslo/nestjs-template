import { PartialType } from '@nestjs/swagger';
import { ReplaceOrganizationDemoItemDto } from './replace-organization-demo-item.dto';

export class UpdateOrganizationDemoItemDto extends PartialType(
  ReplaceOrganizationDemoItemDto,
) {}
