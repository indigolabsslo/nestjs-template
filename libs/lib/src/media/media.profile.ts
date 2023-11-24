import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dtos/create-media.dto';
import { GetMediaDto } from './dtos/get-media.dto';
import { ReplaceMediaDto } from './dtos/replace-media.dto';
import { UpdateMediaDto } from './dtos/update-media.dto';
import { Media } from './media.entity';

@Injectable()
export class MediaProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Media, GetMediaDto);
      createMap(mapper, CreateMediaDto, Media);
      createMap(mapper, ReplaceMediaDto, Media);
      createMap(mapper, UpdateMediaDto, Media);
    };
  }
}
