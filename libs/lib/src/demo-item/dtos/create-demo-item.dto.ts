import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateDemoItemDto {
  @ApiProperty()
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty()
  @IsUUID()
  organizationId: string;
}
