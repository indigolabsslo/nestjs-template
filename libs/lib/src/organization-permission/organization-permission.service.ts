import getOrganizationPermissions from '@lib/shared/utils/get-organization-permissions.util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationPermissionService {
  constructor() {}

  getMany(): string[] {
    return getOrganizationPermissions();
  }
}
