import { FirebaseService } from '@app/firebase';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.validate(context.switchToHttp().getRequest());
  }

  async validate(req: Request) {
    const header = req.headers.authorization;

    if (!header) {
      throw new UnauthorizedException();
    }

    const token = header.split(' ')[1];

    try {
      const claims = await this.firebaseService.auth.verifyIdToken(
        token,
        true,
      );

      req['claims'] = claims;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
