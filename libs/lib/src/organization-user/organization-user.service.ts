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
    if (organizationUserDto.OrganizationId) {
      const organization = await this.organizationService.findOne({
        where: { Id: organizationUserDto.OrganizationId },
      });
      if (!organization) {
        throw new BadRequestException();
      }
      organizationUser.Organization = organization;
    }

    //User
    if (organizationUserDto.UserId) {
      const user = await this.userService.findOne({
        where: { Id: organizationUserDto.UserId },
      });
      if (!user) {
        throw new BadRequestException();
      }
      organizationUser.User = user;
    }
    return organizationUser;
  }
}
