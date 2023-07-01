import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.listUsers')
  listUsers(
    @Payload()
    { maxResults, pageToken }: { maxResults?: number; pageToken?: string },
  ) {
    return this.authService.listUsers(maxResults, pageToken);
  }

  @MessagePattern('auth.setCustomUserClaims')
  setCustomUserClaims(
    @Payload() { uid, claims }: { uid: string; claims: any },
  ) {
    return this.authService.setCustomUserClaims(uid, claims);
  }
}
