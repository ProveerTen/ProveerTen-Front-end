import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-other-profile',
  templateUrl: './view-other-profile.component.html',
  styleUrls: ['./view-other-profile.component.css']
})
export class ViewOtherProfileComponent {

  data: any;
  url_api: string = '';

  constructor(private client: ClientService, public auth: AuthService, private router: Router) {
    if (this.auth.getRole() === 'company') {
      this.url_api = '';
    } else if (this.auth.getRole() === 'provider') {
      this.url_api = '';
    } else if (this.auth.getRole() === 'grocer') {
      this.url_api = '';
    }
  }

  ngOnInit(): void {
    this.client.getRequest(`${environment.url_logic}/profile/${this.auth.getRole()}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.data = response.data;
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }
}
