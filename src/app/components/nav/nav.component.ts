import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public auth: AuthService, private router: Router) { }

  view_profile() {
    let id = localStorage.getItem('id');
    this.router.navigate(['view-my-profile', id]);
  }

}
