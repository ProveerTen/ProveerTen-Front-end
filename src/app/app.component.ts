import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProveerTen';
  showScrollButton: boolean = false;

  constructor(public auth: AuthService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.showScrollButton = true;
    } else {
      this.showScrollButton = false;
    }
  }

}
