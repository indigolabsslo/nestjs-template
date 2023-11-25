import { CreateDemoItemDto } from '@lib/demo-item/dtos/create-demo-item.dto';
import { OmitType } from '@nestjs/swagger';

export class CreateOrganizationDemoItemDto extends OmitType(CreateDemoItemDto, [
  'organizationId',
] as const) {}
{
}
