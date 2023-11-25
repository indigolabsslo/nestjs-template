import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { TypeOrmCrudService } from '@indigolabs/crud-typeorm';
import { OrganizationService } from '@lib/organization/organization.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DemoItem } from './demo-item.entity';
import { CreateDemoItemDto } from './dtos/create-demo-item.dto';
import { ReplaceDemoItemDto } from './dtos/replace-demo-item.dto';
import { UpdateDemoItemDto } from './dtos/update-demo-item.dto';

@Injectable()
export class DemoItemService extends TypeOrmCrudService<
  DemoItem,
  CreateDemoItemDto,
  ReplaceDemoItemDto,
  UpdateDemoItemDto
> {
  constructor(
    @InjectRepository(DemoItem)
    private readonly repository: Repository<DemoItem>,
    @InjectMapper()
    readonly mapper: Mapper,
    private readonly organizationService: OrganizationService,
  ) {
    super(repository, mapper);
  }

  async loadRelations(
    demoItem: DemoItem,
    demoItemDto: CreateDemoItemDto | ReplaceDemoItemDto | UpdateDemoItemDto,
  ): Promise<DemoItem> {
    //Organization
    if (demoItemDto.organizationId) {
      const organization = await this.organizationService.findOne({
        where: { id: demoItemDto.organizationId },
      });
      if (!organization) {
        throw new BadRequestException();
      }
      demoItem.organization = organization;
    }

    return demoItem;
  }
}
