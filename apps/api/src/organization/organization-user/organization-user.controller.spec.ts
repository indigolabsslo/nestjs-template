import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationUserController } from './organization-user.controller';

describe('OrganizationUserController', () => {
  let controller: OrganizationUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationUserController],
    }).compile();

    controller = module.get<OrganizationUserController>(
      OrganizationUserController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
