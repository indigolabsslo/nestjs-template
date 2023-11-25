import { CrudActions } from '@indigolabs/crud';
import { ECrudFeatures } from '@lib/shared/enums/crud-features.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrganizationPermissionService {
  constructor() {}

  getMany(): string[] {
    const res: string[] = [];
    [
      ECrudFeatures.OrganizationRole,
      ECrudFeatures.OrganizationUser,
      ECrudFeatures.OrganizationDemoItem,
    ].forEach((cf) => {
      [
        CrudActions.CreateOne,
        CrudActions.ReadAll,
        CrudActions.ReadOne,
        CrudActions.ReplaceOne,
        CrudActions.UpdateOne,
        CrudActions.DeleteOne,
      ].forEach((ca) => {
        res.push(cf + '-' + ca);
      });
    });
    return res;
  }
}
