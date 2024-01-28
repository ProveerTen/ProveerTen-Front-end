import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { dataDecoded } from 'src/app/interfaces/dataDecoded';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggin = new BehaviorSubject<boolean>(false);

  private company = new BehaviorSubject<boolean>(false);
  private provider = new BehaviorSubject<boolean>(false);
  private grocer = new BehaviorSubject<boolean>(false);

  private data!: dataDecoded;

  constructor() {
    this.checkAuth();

    // if (!(this.getToken())) {
    //   window.addEventListener('storage', () => {
    //     this.logout();
    //   });
    // }
  }

  public getToken() {
    return localStorage.getItem('token')
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

  getId() {
    return this.data.id;
  }

  getRole() {
    return this.data.role;
  }

  checkAuth() {
    const token = this.getToken();
    if (token) {
      this.getData(token);
      this.isLoggin.next(true);
      this.loginRole();
      return;
    }
    this.isLoggin.next(false);
  }

  getData(token: string) {
    const decodedPayload = JSON.parse(atob(token.split('.')[1]));
    this.data = {
      email: decodedPayload.email,
      id: decodedPayload.id,
      role: decodedPayload.role
    }
    return this.data;
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.getData(token);
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
