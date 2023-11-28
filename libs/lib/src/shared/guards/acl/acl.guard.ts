import { getAction, getFeature } from '@indigolabs/crud';
import { IS_PUBLIC_KEY } from '@lib/shared/constants/constants';
import { ERouteParams } from '@lib/shared/enums/route-params.enum';
import { EUserRole } from '@lib/user/enums/user-role.enum';
import { User } from '@lib/user/user.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ACLGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

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

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      handler,
      controller,
    ]);
    if (isPublic) {
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
