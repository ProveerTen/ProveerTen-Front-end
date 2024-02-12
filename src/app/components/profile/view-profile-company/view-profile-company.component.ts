import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-profile-company',
  templateUrl: './view-profile-company.component.html',
  styleUrls: ['./view-profile-company.component.css']
})
export class ViewProfileCompanyComponent {

  id!: string;
  data: any;
  publications: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.routerActivate.snapshot.params['id'];
    this.client.getRequest(`${environment.url_logic}/profile/companies/${this.id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.data = response.data;
        this.getPublications();
      },
      error: (error) => {
        console.log(error.error.Status);
        // this.router.navigate(['404']);
      },
      complete: () => console.log('complete'),
    });
  }


  getPublications() {
    this.client.getRequest(`${environment.url_logic}/publication/view/company/${this.auth.getId()}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.publications = response.publications;
        if (this.publications == '') {
          this.publications = false;
        }

      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

}
