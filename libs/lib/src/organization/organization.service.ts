import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { TypeOrmCrudService } from '@indigolabs/crud-typeorm';
import { MediaService } from '@lib/media/media.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { ReplaceOrganizationDto } from './dtos/replace-organization.dto';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';

@Injectable()
export class OrganizationService extends TypeOrmCrudService<
  Organization,
  CreateOrganizationDto,
  ReplaceOrganizationDto,
  UpdateOrganizationDto
> {
  constructor(
    @InjectRepository(Organization)
    private readonly repository: Repository<Organization>,
    @InjectMapper()
    readonly mapper: Mapper,
    private readonly mediaService: MediaService,
  ) {
    super(repository, mapper);
  }

  async loadRelations(
    organization: Organization,
    organizationDto:
      | CreateOrganizationDto
      | ReplaceOrganizationDto
      | UpdateOrganizationDto,
  ): Promise<Organization> {
    //Image
    if (organizationDto.ImageId) {
      const image = await this.mediaService.findOne(organizationDto.ImageId);
      if (!image) {
        throw new BadRequestException();
      }
      organization.Image = image;
    }

    return organization;
  }
}
