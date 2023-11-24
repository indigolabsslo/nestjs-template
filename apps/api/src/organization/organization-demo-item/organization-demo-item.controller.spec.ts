import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationDemoItemController } from './organization-demo-item.controller';

describe('OrganizationDemoItemController', () => {
  let controller: OrganizationDemoItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationDemoItemController],
    }).compile();

    controller = module.get<OrganizationDemoItemController>(
      OrganizationDemoItemController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
