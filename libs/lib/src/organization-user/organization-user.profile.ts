import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { OrganizationUser } from './organization-user.entity';
import { CreateOrganizationUserDto } from './dtos/create-organization-user.dto';
import { GetOrganizationUserDto } from './dtos/get-organization-user.dto';
import { ReplaceOrganizationUserDto } from './dtos/replace-organization-user.dto';
import { UpdateOrganizationUserDto } from './dtos/update-organization-user.dto';

@Injectable()
export class OrganizationUserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, OrganizationUser, GetOrganizationUserDto);
      createMap(mapper, CreateOrganizationUserDto, OrganizationUser);
      createMap(mapper, ReplaceOrganizationUserDto, OrganizationUser);
      createMap(mapper, UpdateOrganizationUserDto, OrganizationUser);
    };
  }
}
