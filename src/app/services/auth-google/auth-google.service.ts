import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  private tokenIdSubject: Subject<string> = new Subject<string>();

  constructor(private oauthService: OAuthService) {
    this.initLogin();
  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '688827669354-mgtqulc0g7rv34mrc97bbk47h0gup2vu.apps.googleusercontent.com',
      redirectUri: window.location.origin+"/login",
      scope: 'openid profile email',
    }
    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      this.tokenIdSubject.next(this.oauthService.getIdToken());
    });
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();
  }

  getTokenId(): Observable<string> {
    return this.tokenIdSubject.asObservable();
  }
}
