import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

export function IsTimeString(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsTimeString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTimeStringConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsTimeString', async: false })
export class IsTimeStringConstraint implements ValidatorConstraintInterface {
  validate(time: any) {
    if (typeof time !== 'string') {
      return false;
    }
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    return regex.test(time);
  }

  defaultMessage(args: ValidationArguments) {
    return (
      args.property + ' must be a valid time string in the format HH:MM:SS'
    );
  }
}
