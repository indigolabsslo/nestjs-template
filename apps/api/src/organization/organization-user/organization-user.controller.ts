import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Crud, CrudController, Feature } from '@indigolabs/crud';
import { OrganizationUser } from '@lib/organization-user/organization-user.entity';
import { OrganizationUserService } from '@lib/organization-user/organization-user.service';
import { CreateOrganizationUserDto } from '@lib/organization-user/dtos/create-organization-user.dto';
import { GetOrganizationUserDto } from '@lib/organization-user/dtos/get-organization-user.dto';
import { ReplaceOrganizationUserDto } from '@lib/organization-user/dtos/replace-organization-user.dto';
import { UpdateOrganizationUserDto } from '@lib/organization-user/dtos/update-organization-user.dto';
import { EApiTags } from '@lib/shared/enums/api-tags.enum';
import { EControllers } from '@lib/shared/enums/controllers.enum';
import { ECrudFeatures } from '@lib/shared/enums/crud-features.enum';
import { ERouteParams } from '@lib/shared/enums/route-params.enum';
import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: OrganizationUser,
  },
  dto: {
    create: CreateOrganizationUserDto,
    replace: ReplaceOrganizationUserDto,
    update: UpdateOrganizationUserDto,
  },
  serialize: {
    create: GetOrganizationUserDto,
    replace: GetOrganizationUserDto,
    update: GetOrganizationUserDto,
    get: GetOrganizationUserDto,
    delete: GetOrganizationUserDto,
  },
  params: {
    [ERouteParams.OrganizationId]: {
      field: 'organization.id',
      type: 'uuid',
    },
    [ERouteParams.OrganizationUserId]: {
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
      user: {
        alias: 'user',
        eager: true,
      },
      organizationRole: {
        alias: 'organizationRole',
        eager: true,
      },
    },
  },
})
@ApiTags(EApiTags.OrganizationUser)
@Feature(ECrudFeatures.OrganizationUser)
@ApiBearerAuth()
@Controller(
  `${EControllers.Organization}/:${ERouteParams.OrganizationId}/${EControllers.OrganizationUser}`,
)
export class OrganizationUserController
  implements
    CrudController<
      OrganizationUser,
      CreateOrganizationUserDto,
      ReplaceOrganizationUserDto,
      UpdateOrganizationUserDto,
      GetOrganizationUserDto
    >
{
  constructor(
    readonly service: OrganizationUserService,
    @InjectMapper()
    readonly mapper: Mapper,
  ) {}
}
