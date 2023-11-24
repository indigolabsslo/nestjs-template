import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { GetOrganizationDto } from './dtos/get-organization.dto';
import { ReplaceOrganizationDto } from './dtos/replace-organization.dto';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';

@Injectable()
export class OrganizationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Organization, GetOrganizationDto);
      createMap(mapper, CreateOrganizationDto, Organization);
      createMap(mapper, ReplaceOrganizationDto, Organization);
      createMap(mapper, UpdateOrganizationDto, Organization);
    };
  }
}
