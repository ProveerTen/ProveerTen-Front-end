import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessHomeGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  role: any;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.authService.isGrocer().subscribe((e) => {
      this.role = e;
    });

    if (this.role || !(this.authService.isLoggedIn())) {
      return true;
    }

    let id = localStorage.getItem('id');
    this.router.navigate(['view-my-profile', id]);
    return false;
  }

}
