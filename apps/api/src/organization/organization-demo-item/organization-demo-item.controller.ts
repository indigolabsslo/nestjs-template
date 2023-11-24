import {
  Crud,
  CrudController,
  CrudRequest,
  Feature,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@indigolabs/crud';
import { Controller, Param } from '@nestjs/common';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { DemoItem } from '@lib/demo-item/demo-item.entity';
import { DemoItemService } from '@lib/demo-item/demo-item.service';
import { GetDemoItemDto } from '@lib/demo-item/dtos/get-demo-item.dto';
import { EApiTags } from '@lib/shared/enums/api-tags.enum';
import { EControllers } from '@lib/shared/enums/controllers.enum';
import { ECrudFeatures } from '@lib/shared/enums/crud-features.enum';
import { ERouteParams } from '@lib/shared/enums/route-params.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDemoItemDto } from '@lib/demo-item/dtos/create-demo-item.dto';
import { ReplaceDemoItemDto } from '@lib/demo-item/dtos/replace-demo-item.dto';
import { UpdateDemoItemDto } from '@lib/demo-item/dtos/update-demo-item.dto';
import { CreateOrganizationDemoItemDto } from './dtos/create-organization-demo-item.dto';
import { ReplaceOrganizationDemoItemDto } from './dtos/replace-organization-demo-item.dto';
import { UpdateOrganizationDemoItemDto } from './dtos/update-organization-demo-item.dto';

@Crud({
  model: {
    type: DemoItem,
  },
  dto: {
    create: CreateOrganizationDemoItemDto,
    replace: ReplaceOrganizationDemoItemDto,
    update: UpdateOrganizationDemoItemDto,
  },
  service: {
    create: CreateDemoItemDto,
    replace: ReplaceDemoItemDto,
    update: UpdateDemoItemDto,
  },
  serialize: {
    create: GetDemoItemDto,
    replace: GetDemoItemDto,
    update: GetDemoItemDto,
    get: GetDemoItemDto,
    delete: GetDemoItemDto,
  },
  params: {
    [ERouteParams.OrganizationId]: {
      field: 'Organization.Id',
      type: 'uuid',
    },
    [ERouteParams.DemoItemId]: {
      field: 'Id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      Organization: {
        alias: 'Organization',
        eager: true,
      },
    },
  },
})
@ApiTags(EApiTags.DemoItem)
@Feature(ECrudFeatures.OrganizationDemoItem)
@ApiBearerAuth()
@Controller(
  `${EControllers.Organization}/:${ERouteParams.OrganizationId}/${EControllers.DemoItem}`,
)
export class OrganizationDemoItemController
  implements
    CrudController<
      DemoItem,
      CreateOrganizationDemoItemDto,
      ReplaceOrganizationDemoItemDto,
      UpdateOrganizationDemoItemDto,
      GetDemoItemDto,
      CreateDemoItemDto,
      ReplaceDemoItemDto,
      UpdateDemoItemDto
    >
{
  constructor(
    readonly service: DemoItemService,
    @InjectMapper()
    readonly mapper: Mapper,
  ) {}

  get base(): CrudController<
    DemoItem,
    CreateOrganizationDemoItemDto,
    ReplaceOrganizationDemoItemDto,
    UpdateOrganizationDemoItemDto,
    GetDemoItemDto,
    CreateDemoItemDto,
    ReplaceDemoItemDto,
    UpdateDemoItemDto
  > {
    return this;
  }

  @Override()
  createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateOrganizationDemoItemDto,
    @Param(ERouteParams.OrganizationId) OrganizationId: string,
  ) {
    return this.base.createOneBase(req, dto, { OrganizationId });
  }
}
