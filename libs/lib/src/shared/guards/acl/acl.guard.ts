import { CrudActions, getAction, getFeature } from '@indigolabs/crud';
import { ECrudFeatures } from '@lib/shared/enums/crud-features.enum';
import { EUserRole } from '@lib/user/enums/user-role.enum';
import { User } from '@lib/user/user.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ACLGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler();
    const controller = context.getClass();

    const feature = getFeature(controller);
    const action = getAction(handler);

    const { user, params }: { user: User; params: any } = context
      .switchToHttp()
      .getRequest();

    console.log('Params');
    console.log(params);
    console.log('User');
    console.log(user);

    switch (feature) {
      case ECrudFeatures.Organization:
        return this.canActivateOrganization(action, user);

      default:
        console.log(`${feature} not supported`);
        return true;
        break;
    }

    return true;
  }

  belongsToOrganization(organizationId: string, user: User) {
    return true;
  }

  canActivateOrganization(action: CrudActions, user: User): boolean {
    switch (action) {
      case CrudActions.ReadAll:
      case CrudActions.ReadOne:
        return true;
      default:
        return user.role === EUserRole.ADMIN;
    }
  }

  canActivateOrganizationLocation(user: User): boolean {
    return user.role === EUserRole.ADMIN;
  }
}
