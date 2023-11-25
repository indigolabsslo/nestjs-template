import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { EMediaType } from '../enums/media-type.enum';

export class CreateMediaDto {
  @ApiProperty()
  @AutoMap()
  @IsString()
  key: string;

  @ApiProperty()
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty()
  @AutoMap()
  @IsBoolean()
  public: boolean;

  @ApiProperty({ enum: EMediaType, enumName: 'EMediaType' })
  @AutoMap(() => String)
  @IsEnum(EMediaType)
  type: EMediaType;
}
