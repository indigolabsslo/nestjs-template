import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationPermissionService } from './organization-permission.service';

describe('OrganizationPermissionService', () => {
  let service: OrganizationPermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationPermissionService],
    }).compile();

    service = module.get<OrganizationPermissionService>(
      OrganizationPermissionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
