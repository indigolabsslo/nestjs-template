import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { TypeOrmCrudService } from '@indigolabs/crud-typeorm';
import { OrganizationService } from '@lib/organization/organization.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationRole } from './organization-role.entity';
import { CreateOrganizationRoleDto } from './dtos/create-organization-role.dto';
import { ReplaceOrganizationRoleDto } from './dtos/replace-organization-role.dto';
import { UpdateOrganizationRoleDto } from './dtos/update-organization-role.dto';

@Injectable()
export class OrganizationRoleService extends TypeOrmCrudService<
  OrganizationRole,
  CreateOrganizationRoleDto,
  ReplaceOrganizationRoleDto,
  UpdateOrganizationRoleDto
> {
  constructor(
    @InjectRepository(OrganizationRole)
    private readonly repository: Repository<OrganizationRole>,
    @InjectMapper()
    readonly mapper: Mapper,
    private readonly organizationService: OrganizationService,
  ) {
    super(repository, mapper);
  }

  async loadRelations(
    organizationRole: OrganizationRole,
    organizationRoleDto:
      | CreateOrganizationRoleDto
      | ReplaceOrganizationRoleDto
      | UpdateOrganizationRoleDto,
  ): Promise<OrganizationRole> {
    //Organization
    if (organizationRoleDto.organizationId) {
      const organization = await this.organizationService.findOne({
        where: { id: organizationRoleDto.organizationId },
      });
      if (!organization) {
        throw new BadRequestException();
      }
      organizationRole.organization = organization;
    }

    return organizationRole;
  }
}
