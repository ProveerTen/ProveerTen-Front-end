import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/services/shared/shared.service';

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
  providers: any;
  chats: string[] = [];

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute, private shared: SharedService) {
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
      this.client.postRequest(`${environment.url_chat}/provider/city`, { companyId: this.id, grocerId: this.auth.getId() }, undefined, undefined).subscribe({
        next: (response: any) => {
          this.providers = response.providersbycity[0]
          console.log(this.providers);

        },
        error: (error) => {
          console.log(error);
        }
      })

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

          for (let k = 0; k < this.publications.length; k++) {
            const element = this.publications[k].date;
            this.publications[k].date = new Date(element)
          }

          this.publications = this.orderByDate(this.publications)

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

          for (let k = 0; k < this.publications.length; k++) {
            const element = this.publications[k].date;
            this.publications[k].date = new Date(element)
          }

          this.publications = this.orderByDate(this.publications)

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
  orderByDate(publications: any[]) {
    return publications.sort((a, b) => b.date - a.date);
  }

  chatear(document_provider: any) {
    this.client.postRequest(`${environment.url_chat}/chat/find`, { grocerId: this.auth.getId(), providerId: document_provider }, undefined, undefined).subscribe({
      next: (response: any) => {
        if (response.chat.length === 0) {
          this.client.postRequest(`${environment.url_chat}/chat/create`, { grocerId: this.auth.getId(), providerId: document_provider }, undefined, undefined).subscribe({
            next: (response: any) => {
              let localchats = localStorage.getItem('chats');
              if (localchats) {
                this.chats = localchats.split(',');
              }
              this.chats.push(response.chat._id);
              this.shared.changeChatList(this.chats);
              localStorage.setItem('chats', this.chats.toString());
            },
            error: (error) => {
              console.log(error);
            }
          })
        } else {
          if (this.chats.indexOf(response.chat[0]._id) === -1) {
            this.chats.push(response.chat[0]._id);
            this.shared.changeChatList(this.chats);
            localStorage.setItem('chats', this.chats.toString());
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  order() {
    this.shared.changeCompanyOrder(this.data);
    this.router.navigate(['create/order']);
  }
}


