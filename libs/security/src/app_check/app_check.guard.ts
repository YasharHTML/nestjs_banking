import { FirebaseService } from '@app/firebase';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AppCheckGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.validate(context.switchToHttp().getRequest());
  }

  async validate(req: Request) {
    const header = req.headers['X-Firebase-AppCheck'] as string;

    if (!header) {
      throw new UnauthorizedException();
    }

    try {
      await this.firebaseService.appCheck.verifyToken(header);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
