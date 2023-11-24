import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDemoItemDto {
  @ApiProperty()
  @AutoMap()
  @IsString()
  Name: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  OrganizationId: string | null;
}
