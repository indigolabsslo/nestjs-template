import { CrudActions } from '@indigolabs/crud';
import { ECrudFeatures } from '../enums/crud-features.enum';

export default function getOrganizationPermissions() {
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
      res.push(`${cf}-${ca}`);
    });
  });
  return res;
}
