import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { DemoItem } from './demo-item.entity';
import { CreateDemoItemDto } from './dtos/create-demo-item.dto';
import { GetDemoItemDto } from './dtos/get-demo-item.dto';
import { ReplaceDemoItemDto } from './dtos/replace-demo-item.dto';
import { UpdateDemoItemDto } from './dtos/update-demo-item.dto';

@Injectable()
export class DemoItemProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, DemoItem, GetDemoItemDto);
      createMap(mapper, CreateDemoItemDto, DemoItem);
      createMap(mapper, ReplaceDemoItemDto, DemoItem);
      createMap(mapper, UpdateDemoItemDto, DemoItem);
    };
  }
}
