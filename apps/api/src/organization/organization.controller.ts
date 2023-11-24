import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Crud, CrudController, Feature } from '@indigolabs/crud';
import { Organization } from '@lib/organization/organization.entity';
import { OrganizationService } from '@lib/organization/organization.service';
import { CreateOrganizationDto } from '@lib/organization/dtos/create-organization.dto';
import { GetOrganizationDto } from '@lib/organization/dtos/get-organization.dto';
import { ReplaceOrganizationDto } from '@lib/organization/dtos/replace-organization.dto';
import { UpdateOrganizationDto } from '@lib/organization/dtos/update-organization.dto';
import { EApiTags } from '@lib/shared/enums/api-tags.enum';
import { EControllers } from '@lib/shared/enums/controllers.enum';
import { ECrudFeatures } from '@lib/shared/enums/crud-features.enum';
import { ERouteParams } from '@lib/shared/enums/route-params.enum';
import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: Organization,
  },
  dto: {
    create: CreateOrganizationDto,
    replace: ReplaceOrganizationDto,
    update: UpdateOrganizationDto,
  },
  serialize: {
    create: GetOrganizationDto,
    replace: GetOrganizationDto,
    update: GetOrganizationDto,
    get: GetOrganizationDto,
    delete: GetOrganizationDto,
  },
  params: {
    [ERouteParams.OrganizationId]: {
      field: 'Id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      Image: {
        alias: 'Image',
        eager: true,
      },
      OrganizationUsers: {
        alias: 'OrganizationUsers',
        eager: true,
      },
    },
  },
})
@ApiTags(EApiTags.Organization)
@Feature(ECrudFeatures.Organization)
@ApiBearerAuth()
@Controller(EControllers.Organization)
export class OrganizationController
  implements
    CrudController<
      Organization,
      CreateOrganizationDto,
      ReplaceOrganizationDto,
      UpdateOrganizationDto,
      GetOrganizationDto
    >
{
  constructor(
    readonly service: OrganizationService,
    @InjectMapper()
    readonly mapper: Mapper,
  ) {}
}
