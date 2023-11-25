import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class GetDto {
  @ApiProperty()
  @AutoMap()
  createDate: string;

  @ApiProperty()
  @AutoMap()
  updateDate: string;

  @ApiProperty()
  @AutoMap()
  id: string;
}
