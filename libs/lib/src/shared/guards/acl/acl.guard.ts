import { getAction, getFeature } from '@indigolabs/crud';
import { ECrudFeatures } from '@lib/shared/enums/crud-features.enum';
import { ERouteParams } from '@lib/shared/enums/route-params.enum';
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

    if (user.role == EUserRole.ADMIN) {
      // Superadmin can access everythiing
      return true;
    }

    if ([ECrudFeatures.Media].includes(feature)) {
      // Public controllers
      // TODO: Prepare @Public() decorator for this
      return true;
    }

    const organizationIdParam = params[ERouteParams.OrganizationId];
    if (!organizationIdParam) {
      // If organizationId is not present in route, disable call
      return false;
    }

    const organizationUser = user.organizationUsers.find(
      (ou) => ou.organization.id == organizationIdParam,
    );

    if (!organizationUser) {
      // User doesn't belong to organization
      return false;
    }

    const requiredPermission = `${feature}-${action}`;

    return organizationUser.organizationRole.permissions.includes(
      requiredPermission,
    );
  }
}
