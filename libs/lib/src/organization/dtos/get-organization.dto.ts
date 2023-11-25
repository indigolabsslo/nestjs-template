import { AutoMap } from '@automapper/classes';
import { GetMediaDto } from '@lib/media/dtos/get-media.dto';
import { GetDto } from '@lib/shared/dtos/get.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetOrganizationDto extends GetDto {
  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty({ type: GetMediaDto })
  @AutoMap(() => GetMediaDto)
  image: GetMediaDto;

  @ApiProperty()
  @AutoMap()
  numberOfUsers: number;
}
