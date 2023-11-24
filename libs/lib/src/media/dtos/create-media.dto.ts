import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { EMediaType } from '../enums/media-type.enum';

export class CreateMediaDto {
  @ApiProperty()
  @AutoMap()
  @IsString()
  Key: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  Name: string;

  @ApiProperty()
  @AutoMap()
  @IsBoolean()
  Public: boolean;

  @ApiProperty({ enum: EMediaType, enumName: 'EMediaType' })
  @AutoMap(() => String)
  @IsEnum(EMediaType)
  Type: EMediaType;
}
