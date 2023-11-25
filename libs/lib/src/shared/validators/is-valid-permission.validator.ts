import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import getOrganizationPermissions from '../utils/get-organization-permissions.util';

export function IsValidPermission(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidPermission',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPermissionConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsValidPermission', async: false })
export class IsValidPermissionConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: any) {
    const validPermissions = getOrganizationPermissions();
    return validPermissions.includes(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `"${args.value}" is not a valid value.`;
  }
}
