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
  isLogin: any;
  idCompany : any;
  idGrocer:any;
  dataChat:any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute) {
    this.auth.isLoggedIn().subscribe((value: any) => {
      this.isLogin = value;
    });
  }

  ngOnInit(): void {
    this.id = this.routerActivate.snapshot.params['id'];
    if (this.isLogin) {
      this.client.getRequest(`${environment.url_logic}/profile/companies/${this.id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.data = response.data;
          const foundationDate = new Date(this.data.foundation_company);
          this.data.foundation_company = foundationDate.toISOString().split('T')[0];
          this.getPublications();
        },
        error: (error) => {
          console.log(error.error.Status);
          this.router.navigate(['404']);
        },
        complete: () => console.log('complete'),
      });
    } else {
      this.client.getRequest(`${environment.url_logic}/profile/data/companies/${this.id}`, undefined, undefined).subscribe({
        next: (response: any) => {
          this.data = response.data;
          const foundationDate = new Date(this.data.foundation_company);
          this.data.foundation_company = foundationDate.toISOString().split('T')[0];
          this.getPublications();
        },
        error: (error) => {
          console.log(error.error.Status);
          this.router.navigate(['404']);
        },
        complete: () => console.log('complete'),
      });
    }
  }

  getPublications() {
    if (this.isLogin) {
      this.client.getRequest(`${environment.url_logic}/publication/view/company/${this.id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.publications = response.publications;
          console.log(this.publications);

          if (this.publications == '') {
            this.publications = false;
          }

        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    } else {
      this.client.getRequest(`${environment.url_logic}/publication/data/view/company/${this.id}`, undefined, undefined).subscribe({
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


  getId (){

    this.idCompany = this.id;
    this.idGrocer = this.auth.getId();

    this.dataChat ={
     companyId: this.idCompany,
      grocerId: this.idGrocer
    }

    this.client.postRequest(`${environment.url_chat}/provider/getproviders`, this.dataChat, undefined, undefined).subscribe({
    next:(response) =>{
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  }


