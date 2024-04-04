import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { dataDecoded } from 'src/app/interfaces/dataDecoded';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SharedService } from '../shared/shared.service';
import { AuthGoogleService } from '../auth-google/auth-google.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggin = new BehaviorSubject<boolean>(false);

  private company = new BehaviorSubject<boolean>(false);
  private provider = new BehaviorSubject<boolean>(false);
  private grocer = new BehaviorSubject<boolean>(false);

  private data!: dataDecoded;
  private helper = new JwtHelperService();

  constructor(private router: Router, private messageService: MessageService, private shared: SharedService,
    private authGoogleService: AuthGoogleService) {
    this.checkAuth();
  }

  public getToken() {
    return localStorage.getItem('token')
  }

  public isExpiredToken() {
    return this.helper.isTokenExpired(this.getToken());
  }

  private loginRole() {
    if (this.data.role === 'company') {
      this.company.next(true);
    } else if (this.data.role === 'provider') {
      this.provider.next(true);
    } else if (this.data.role === 'grocer') {
      this.grocer.next(true);
    }
  }

  private logoutRole() {
    if (this.data.role === 'company') {
      this.company.next(false);
    } else if (this.data.role === 'provider') {
      this.provider.next(false);
    } else if (this.data.role === 'grocer') {
      this.grocer.next(false);
    }
  }

  public getId() {
    return this.data.id;
  }

  public getRole() {
    return this.data.role;
  }

  private checkAuth() {
    const token = this.getToken();
    if (token) {
      this.getData(token);
      this.isLoggin.next(true);
      this.loginRole();
      return;
    }
    this.isLoggin.next(false);
  }

  private getData(token: string) {
    // const decodedPayload = JSON.parse(atob(token.split('.')[1]));
    const decodedToken = this.helper.decodeToken(token);
    this.data = {
      email: decodedToken.email,
      id: decodedToken.id,
      role: decodedToken.role
    }
    return this.data;
  }

  public login(token: string) {
    localStorage.setItem('token', token);
    this.getData(token);
    this.isLoggin.next(true);
    this.loginRole();
  }

  public isLoggedIn() {
    return this.isLoggin.asObservable();
  }

  public isCompany() {
    return this.company.asObservable();
  }

  public isProvider() {
    return this.provider.asObservable();
  }

  public isGrocer() {
    return this.grocer.asObservable();
  }

  public logout() {
    localStorage.removeItem('token');
    this.isLoggin.next(false);
    this.logoutRole();
    this.authGoogleService.logout();
    this.router.navigate(['login']);
    this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'Cierre de sesión exitoso' });
    //localStorage.removeItem('chats')
    //this.shared.changeChatList([])
  }

}
