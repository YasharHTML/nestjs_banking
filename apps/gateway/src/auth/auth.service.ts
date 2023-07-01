import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly natsClient: ClientNats,
  ) {}

  listUsers(maxResults?: number, pageToken?: string) {
    return this.natsClient.send('auth.listUsers', {
      maxResults,
      pageToken,
    });
  }

  setCustomUserClaims(uid: string, claims: any) {
    return this.natsClient.send('auth.setCustomUserClaims', { uid, claims });
  }
}
