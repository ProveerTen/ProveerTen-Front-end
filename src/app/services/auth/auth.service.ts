import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = new BehaviorSubject<boolean>(this.checkToken());
  company = new BehaviorSubject<boolean>(this.checkRole('company'));
  provider = new BehaviorSubject<boolean>(this.checkRole('provider'));
  grocer = new BehaviorSubject<boolean>(this.checkRole('grocer'));

  constructor() {
    this.initAuthState();
  }

  private initAuthState(): void {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      this.isLogin.next(true);

      if (role === 'company') {
        this.company.next(true);
      } else if (role === 'provider') {
        this.provider.next(true);
      } else if (role === 'grocer') {
        this.grocer.next(true);
      }
    }
  }

  private checkToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private checkRole(role: string): boolean {
    return localStorage.getItem('role') === role;
  }

  login(token: string, role: string, id: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('id', id);

    this.isLogin.next(true);

    if (role === 'company') {
      this.company.next(true);
    } else if (role === 'provider') {
      this.provider.next(true);
    } else if (role === 'grocer') {
      this.grocer.next(true);
    }
  }

  getToken(): string | null {
    return this.checkToken() ? localStorage.getItem('token') : null;
  }

  getRole(): string | null {
    return this.checkToken() ? localStorage.getItem('role') : null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');

    this.isLogin.next(false);
    this.company.next(false);
    this.provider.next(false);
    this.grocer.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

  isCompany(): Observable<boolean> {
    return this.company.asObservable();
  }

  isProvider(): Observable<boolean> {
    return this.provider.asObservable();
  }

  isGrocer(): Observable<boolean> {
    return this.grocer.asObservable();
  }
}
