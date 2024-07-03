import { ValidationOptions, registerDecorator } from 'class-validator';
import { IsIsraeliIdConstraint } from './IsIsraeliIdConstraint';

export function IsIsraeliId(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsIsraeliIdConstraint,
    });
  };
}
