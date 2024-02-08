import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-providers',
  templateUrl: './view-providers.component.html',
  styleUrls: ['./view-providers.component.css']
})
export class ViewProvidersComponent {

  data: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    let id = this.auth.getId();
    this.client.postRequest(`${environment.url_logic}/order/providers`, { nit_company: id }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.data = response.providers;
      },
      error: (error) => {
        console.log(error.error.Status);
        this.router.navigate(['404']);
      },
      complete: () => console.log('complete'),
    });
  }
}
