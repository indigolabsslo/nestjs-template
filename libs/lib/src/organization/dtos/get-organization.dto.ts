import { AutoMap } from '@automapper/classes';
import { GetMediaDto } from '@lib/media/dtos/get-media.dto';
import { GetDto } from '@lib/shared/dtos/get.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetOrganizationDto extends GetDto {
  @ApiProperty()
  @AutoMap()
  Name: string;

  @ApiProperty({ type: GetMediaDto })
  @AutoMap(() => GetMediaDto)
  Image: GetMediaDto;

  @ApiProperty()
  @AutoMap()
  NumberOfUsers: number;
}
