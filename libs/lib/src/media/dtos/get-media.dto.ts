import { AutoMap } from '@automapper/classes';
import { GetDto } from '@lib/shared/dtos/get.dto';
import { ApiProperty } from '@nestjs/swagger';
import { EMediaType } from '../enums/media-type.enum';

export class GetMediaDto extends GetDto {
  @ApiProperty()
  @AutoMap()
  Name: string;

  @ApiProperty()
  @AutoMap()
  Public: boolean;

  @ApiProperty({ enum: EMediaType, enumName: 'EMediaType' })
  @AutoMap(() => String)
  Type: EMediaType;

  @ApiProperty()
  @AutoMap()
  Url: string;
}
