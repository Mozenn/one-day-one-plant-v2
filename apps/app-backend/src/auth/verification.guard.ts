import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import RequestWithUser from './requestWithUser.interface';

@Injectable()
export class VerificationGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request: RequestWithUser = context.switchToHttp().getRequest();

    if (!request.user?.verified) {
      throw new UnauthorizedException('Confirm your email first');
    }

    return true;
  }
}
