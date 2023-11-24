import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class GetDto {
  @ApiProperty()
  @AutoMap()
  CreateDate: string;

  @ApiProperty()
  @AutoMap()
  UpdatedDate: string;

  @ApiProperty()
  @AutoMap()
  Id: string;
}
