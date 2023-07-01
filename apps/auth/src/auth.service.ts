import { FirebaseService } from '@app/firebase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  listUsers(maxResults?: number, pageToken?: string) {
    return this.firebaseService.auth.listUsers(maxResults, pageToken);
  }

  setCustomUserClaims(uid: string, claims: any) {
    return this.firebaseService.auth
      .setCustomUserClaims(uid, claims)
      .then(() => ({
        uid,
        claims,
      }));
  }
}
