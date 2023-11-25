import { AutoMap } from '@automapper/classes';
import { GetDto } from '@lib/shared/dtos/get.dto';
import { ApiProperty } from '@nestjs/swagger';
import { EMediaType } from '../enums/media-type.enum';

export class GetMediaDto extends GetDto {
  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  public: boolean;

  @ApiProperty({ enum: EMediaType, enumName: 'EMediaType' })
  @AutoMap(() => String)
  type: EMediaType;

  @ApiProperty()
  @AutoMap()
  url: string;
}
