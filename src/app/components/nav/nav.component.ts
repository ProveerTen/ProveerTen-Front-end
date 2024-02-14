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
    this.router.navigate(['profile']);
  }

  delete_data_profile() {
    let id = this.auth.getId();
    this.router.navigate(['delete/data/grocer', id]);
  }
}
