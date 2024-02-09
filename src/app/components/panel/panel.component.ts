import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {

  data: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router) { }

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

  manageProviders() {
    this.router.navigate(['manage/providers']);
  }

  managePublications() {
    this.router.navigate(['manage/publications']);
  }

  manageProducts() {
    this.router.navigate(['manage/products']);
  }

  viewCompany(id: string) {
    this.router.navigate(['profile/company', id]);
  }

}
