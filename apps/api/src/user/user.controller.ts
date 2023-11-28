import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  Feature,
  ParsedRequest,
} from '@indigolabs/crud';
import { CurrentUser } from '@lib/shared/decorators/current-user.decorator';
import { Public } from '@lib/shared/decorators/public.decorator';
import { EApiTags } from '@lib/shared/enums/api-tags.enum';
import { EControllers } from '@lib/shared/enums/controllers.enum';
import { ECrudFeatures } from '@lib/shared/enums/crud-features.enum';
import { ERouteParams } from '@lib/shared/enums/route-params.enum';
import { CreateUserDto } from '@lib/user/dtos/create-user.dto';
import { GetUserDto } from '@lib/user/dtos/get-user.dto';
import { ReplaceUserDto } from '@lib/user/dtos/replace-user.dto';
import { UpdateUserDto } from '@lib/user/dtos/update-user.dto';
import { User } from '@lib/user/user.entity';
import { UserService } from '@lib/user/user.service';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: User,
  },
  dto: {
    create: CreateUserDto,
    replace: ReplaceUserDto,
    update: UpdateUserDto,
  },
  serialize: {
    create: GetUserDto,
    replace: GetUserDto,
    update: GetUserDto,
    get: GetUserDto,
    delete: GetUserDto,
  },
  params: {
    [ERouteParams.UserId]: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      image: {
        alias: 'image',
        eager: true,
      },
      organizationUsers: {
        alias: 'organizationUsers',
        eager: true,
      },
      'organizationUsers.organization': {
        alias: 'organizationUsersOrganization',
        eager: true,
      },
      'organizationUsers.organizationRole': {
        alias: 'organizationUsersOrganizationRole',
        eager: true,
      },
    },
  },
})
@ApiTags(EApiTags.User)
@Feature(ECrudFeatures.User)
@ApiBearerAuth()
@Controller(`${EControllers.User}`)
export class UserController
  implements
    CrudController<
      User,
      CreateUserDto,
      ReplaceUserDto,
      UpdateUserDto,
      GetUserDto
    >
{
  constructor(
    readonly service: UserService,
    @InjectMapper()
    readonly mapper: Mapper,
  ) {}

  @UseInterceptors(CrudRequestInterceptor)
  @ApiOkResponse({
    description: 'Retrieve a calling User',
    type: GetUserDto,
  })
  @Public()
  @Get('me')
  async me(
    @ParsedRequest() req: CrudRequest,
    @CurrentUser() currentUser: User,
  ) {
    return this.mapper.map(currentUser, User, GetUserDto);
  }
}
