import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationRoleService } from './organization-role.service';

describe('OrganizationRoleService', () => {
  let service: OrganizationRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationRoleService],
    }).compile();

    service = module.get<OrganizationRoleService>(OrganizationRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
