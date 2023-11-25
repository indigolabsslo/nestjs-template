import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { TypeOrmCrudService } from '@indigolabs/crud-typeorm';
import { OrganizationService } from '@lib/organization/organization.service';
import { UserService } from '@lib/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationUser } from './organization-user.entity';
import { CreateOrganizationUserDto } from './dtos/create-organization-user.dto';
import { ReplaceOrganizationUserDto } from './dtos/replace-organization-user.dto';
import { UpdateOrganizationUserDto } from './dtos/update-organization-user.dto';
import { OrganizationRoleService } from '@lib/organization-role/organization-role.service';

@Injectable()
export class OrganizationUserService extends TypeOrmCrudService<
  OrganizationUser,
  CreateOrganizationUserDto,
  ReplaceOrganizationUserDto,
  UpdateOrganizationUserDto
> {
  constructor(
    @InjectRepository(OrganizationUser)
    private readonly repository: Repository<OrganizationUser>,
    @InjectMapper()
    readonly mapper: Mapper,
    private readonly organizationService: OrganizationService,
    private readonly userService: UserService,
    private readonly organizationRoleService: OrganizationRoleService,
  ) {
    super(repository, mapper);
  }

  async loadRelations(
    organizationUser: OrganizationUser,
    organizationUserDto:
      | CreateOrganizationUserDto
      | ReplaceOrganizationUserDto
      | UpdateOrganizationUserDto,
  ): Promise<OrganizationUser> {
    //Organization
    if (organizationUserDto.organizationId) {
      const organization = await this.organizationService.findOne({
        where: { id: organizationUserDto.organizationId },
      });
      if (!organization) {
        throw new BadRequestException();
      }
      organizationUser.organization = organization;
    }

    //User
    if (organizationUserDto.userId) {
      const user = await this.userService.findOne({
        where: { id: organizationUserDto.userId },
      });
      if (!user) {
        throw new BadRequestException();
      }
      organizationUser.user = user;
    }

    //Organization Role
    if (organizationUserDto.organizationRoleId) {
      const organizationRole = await this.organizationRoleService.findOne({
        where: { id: organizationUserDto.organizationRoleId },
      });
      if (!organizationRole) {
        throw new BadRequestException();
      }
      organizationUser.organizationRole = organizationRole;
    }
    return organizationUser;
  }
}
