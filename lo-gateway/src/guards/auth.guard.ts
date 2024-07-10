import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(SessionService) private sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { sessionId } = request.cookies;

    const userId = await this.sessionService.getUserBySessionId(sessionId);

    



    return true;
  }
}