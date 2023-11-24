import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty()
  @AutoMap()
  @IsString()
  Name: string;

  @ApiProperty()
  @IsUUID()
  ImageId: string;
}
