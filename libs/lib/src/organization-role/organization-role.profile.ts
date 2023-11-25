import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { OrganizationRole } from './organization-role.entity';
import { CreateOrganizationRoleDto } from './dtos/create-organization-role.dto';
import { GetOrganizationRoleDto } from './dtos/get-organization-role.dto';
import { ReplaceOrganizationRoleDto } from './dtos/replace-organization-role.dto';
import { UpdateOrganizationRoleDto } from './dtos/update-organization-role.dto';

@Injectable()
export class OrganizationRoleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, OrganizationRole, GetOrganizationRoleDto);
      createMap(mapper, CreateOrganizationRoleDto, OrganizationRole);
      createMap(mapper, ReplaceOrganizationRoleDto, OrganizationRole);
      createMap(mapper, UpdateOrganizationRoleDto, OrganizationRole);
    };
  }
}
