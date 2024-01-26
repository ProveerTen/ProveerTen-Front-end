import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggin = new BehaviorSubject<boolean>(false);

  private company = new BehaviorSubject<boolean>(false);
  private provider = new BehaviorSubject<boolean>(false);
  private grocer = new BehaviorSubject<boolean>(false);

  private role!: string;

  constructor() {
    this.checkAuth();
    if (!(this.getToken())) {
      window.addEventListener('storage', () => {
        this.logout();
      });
    }
  }

  private getToken() {
    return localStorage.getItem('token')
  }

  private loginRole() {
    if (this.role === 'company') {
      this.company.next(true);
    } else if (this.role === 'provider') {
      this.provider.next(true);
    } else if (this.role === 'grocer') {
      this.grocer.next(true);
    }
  }

  private logoutRole() {
    if (this.role === 'company') {
      this.company.next(false);
    } else if (this.role === 'provider') {
      this.provider.next(false);
    } else if (this.role === 'grocer') {
      this.grocer.next(false);
    }
  }

  getId() {
    const token = this.getToken();
    if (token) {
      const decodedPayload = JSON.parse(atob(token.split('.')[1]));
      return decodedPayload.id;
    }
  }

  checkAuth() {
    const token = this.getToken();
    if (token) {
      const decodedPayload = JSON.parse(atob(token.split('.')[1]));
      this.role = decodedPayload.role;
      this.isLoggin.next(true);
      this.loginRole();
      return;
    }
    this.isLoggin.next(false);
  }

  login(token: string) {
    localStorage.setItem('token', token);
    const decodedPayload = JSON.parse(atob(token.split('.')[1]));
    this.role = decodedPayload.role;
    this.isLoggin.next(true);
    this.loginRole();
  }

  isLoggedIn() {
    return this.isLoggin.asObservable();
  }

  isCompany() {
    return this.company.asObservable();
  }

  isProvider() {
    return this.provider.asObservable();
  }

  isGrocer() {
    return this.grocer.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggin.next(false);
    this.logoutRole();
  }

}
