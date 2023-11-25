import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Crud,
  CrudController,
  CrudRequest,
  Feature,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@indigolabs/crud';
import { OrganizationRole } from '@lib/organization-role/organization-role.entity';
import { OrganizationRoleService } from '@lib/organization-role/organization-role.service';
import { CreateOrganizationRoleDto } from '@lib/organization-role/dtos/create-organization-role.dto';
import { GetOrganizationRoleDto } from '@lib/organization-role/dtos/get-organization-role.dto';
import { ReplaceOrganizationRoleDto } from '@lib/organization-role/dtos/replace-organization-role.dto';
import { UpdateOrganizationRoleDto } from '@lib/organization-role/dtos/update-organization-role.dto';
import { EApiTags } from '@lib/shared/enums/api-tags.enum';
import { EControllers } from '@lib/shared/enums/controllers.enum';
import { ECrudFeatures } from '@lib/shared/enums/crud-features.enum';
import { ERouteParams } from '@lib/shared/enums/route-params.enum';
import { Controller, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrganizationOrganizationRoleDto } from './dtos/create-organization-organization-role.dto';
import { ReplaceOrganizationOrganizationRoleDto } from './dtos/replace-organization-organization-role.dto';
import { UpdateOrganizationOrganizationRoleDto } from './dtos/update-organization-organization-role.dto';

@Crud({
  model: {
    type: OrganizationRole,
  },
  dto: {
    create: CreateOrganizationOrganizationRoleDto,
    replace: ReplaceOrganizationOrganizationRoleDto,
    update: UpdateOrganizationOrganizationRoleDto,
  },
  service: {
    create: CreateOrganizationRoleDto,
    replace: ReplaceOrganizationRoleDto,
    update: UpdateOrganizationRoleDto,
  },
  serialize: {
    create: GetOrganizationRoleDto,
    replace: GetOrganizationRoleDto,
    update: GetOrganizationRoleDto,
    get: GetOrganizationRoleDto,
    delete: GetOrganizationRoleDto,
  },
  params: {
    [ERouteParams.OrganizationId]: {
      field: 'organization.id',
      type: 'uuid',
    },
    [ERouteParams.OrganizationRoleId]: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      organization: {
        alias: 'organization',
        eager: true,
      },
      role: {
        alias: 'role',
        eager: true,
      },
    },
  },
})
@ApiTags(EApiTags.OrganizationRole)
@Feature(ECrudFeatures.OrganizationRole)
@ApiBearerAuth()
@Controller(
  `${EControllers.Organization}/:${ERouteParams.OrganizationId}/${EControllers.OrganizationRole}`,
)
export class OrganizationRoleController
  implements
    CrudController<
      OrganizationRole,
      CreateOrganizationOrganizationRoleDto,
      ReplaceOrganizationOrganizationRoleDto,
      UpdateOrganizationOrganizationRoleDto,
      GetOrganizationRoleDto,
      CreateOrganizationRoleDto,
      ReplaceOrganizationRoleDto,
      UpdateOrganizationRoleDto
    >
{
  constructor(
    readonly service: OrganizationRoleService,
    @InjectMapper()
    readonly mapper: Mapper,
  ) {}

  get base(): CrudController<
    OrganizationRole,
    CreateOrganizationOrganizationRoleDto,
    ReplaceOrganizationOrganizationRoleDto,
    UpdateOrganizationOrganizationRoleDto,
    GetOrganizationRoleDto,
    CreateOrganizationRoleDto,
    ReplaceOrganizationRoleDto,
    UpdateOrganizationRoleDto
  > {
    return this;
  }

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateOrganizationOrganizationRoleDto,
    @Param(ERouteParams.OrganizationId) organizationId: string,
  ) {
    return this.base.createOneBase(req, dto, { organizationId });
  }
}
