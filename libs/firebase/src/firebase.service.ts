import { Injectable } from '@nestjs/common';
import { App, cert, initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { AppCheck, getAppCheck } from 'firebase-admin/app-check';

@Injectable()
export class FirebaseService {
  private _app: App;
  private _auth: Auth;
  private _appCheck: AppCheck;

  constructor() {
    this._app = initializeApp({
      credential: cert({
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        projectId: process.env.FIREBASE_PROJECT_ID,
      }),
    });

    this._auth = getAuth(this._app);
    this._appCheck = getAppCheck(this._app);
  }

  get app() {
    return this._app;
  }

  get auth() {
    return this._auth;
  }

  get appCheck() {
    return this._appCheck;
  }
}
