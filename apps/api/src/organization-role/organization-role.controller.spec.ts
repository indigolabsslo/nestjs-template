import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationRoleController } from './organization-role.controller';

describe('OrganizationRoleController', () => {
  let controller: OrganizationRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationRoleController],
    }).compile();

    controller = module.get<OrganizationRoleController>(OrganizationRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
