import { Logger } from '@nestjs/common';

export function OnlyDevelop(): MethodDecorator {
  return function (target: any, propertyKey: string) {
    Logger.error(
      `Method ${propertyKey} in ${target.constructor.name} was created for development only. Delete it for security reasons`,
    );
  };
}
