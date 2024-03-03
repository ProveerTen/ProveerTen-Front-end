import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ChatService } from 'src/app/services/chat/chat.service';

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
  idCompany: any;
  idGrocer: any;
  providers: any;
  messageText: any;
  messages: any[] = [];
  showChat: boolean = false;
  chats: string[] = [];
  dataSocialReds:any
  colorsOfIcons: any[] = [];

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute, private chatService: ChatService) {
    this.auth.isLoggedIn().subscribe((value: any) => {
      this.isLogin = value;
    });
  }

  ngOnInit(): void {
    this.id = this.routerActivate.snapshot.params['id'];
    let localchats = localStorage.getItem('chats');
    if (localchats) {
      this.chats = localchats.split(',');
    }
    
    if (this.isLogin) {
      this.client.getRequest(`${environment.url_logic}/profile/companies/${this.id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.data = response.data;
          const foundationDate = new Date(this.data.foundation_company);
          this.data.foundation_company = foundationDate.toISOString().split('T')[0];
          this.getPublications();
          this.getSocialReds()
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

  getSocialReds() {
    this.client.getRequest(`${environment.url_logic}/edit_profile/socialRed/${this.id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.dataSocialReds = response.status.data;
        console.log("social reds", this.dataSocialReds);            
      },
      error: (error) => {
        console.log(error.error.Status);
        this.router.navigate(['404']);
      },
      complete: () => {
        console.log("Complete");   
        this.getColorIcon()     
      }
    })
  }

  OptionsIcons = [
    { value: '<i class="fa-brands fa-facebook"></i>', color: "color:#1a6eff;" },
    { value: '<i class="fa-brands fa-instagram"></i>', color: "color:#fe2a90" },
    { value: '<i class="fa-brands fa-youtube"></i>', color: "color:#ff1414" },
    { value: '<i class="fa-brands fa-whatsapp"></i>', color: "color:#40a923" },
    { value: '<i class="fa-brands fa-twitch"></i>', color: "color:#b62eff" },
    { value: '<i class="fa-brands fa-discord"></i>', color: "color:#5863fe" },
    { value: '<i class="fa-brands fa-twitter"></i>', color: "color:#2ec0ff" },
    { value: '<i class="fa-brands fa-tiktok"></i>', color: "color:#000000" },
    { value: '<i class="fa-brands fa-google-plus-g"></i>', color: "color:#ff2414" },
    { value: '<i class="fa-solid fa-globe"></i>', color: "color:#e6a800" },
    { value: '<i class="fa-solid fa-location-dot"></i>', color: "color:#b30000" },
    { value: '<i class="fa-solid fa-map-location-dot"></i>', color: "color:#983c25"},
    { value: '<i class="fa-solid fa-compact-disc"></i>', color: "color:#2a3c5a" }       
  ];

  getColorIcon() {
    this.dataSocialReds.forEach(element => {
      let etiqueteIcon = element.icon
      // console.log("element",etiqueteIcon);

      this.OptionsIcons.forEach(icon => {
        let value = icon.value

        if (etiqueteIcon == value) {
          // this.colorIcon = icon.color
          this.colorsOfIcons.push(icon.color)
        }
      })

    });
    console.log(this.colorsOfIcons);
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
        //console.log(response)
        //this.chat = response
        if (response.chat.length === 0) {
          this.client.postRequest(`${environment.url_chat}/chat/create`, { grocerId: this.auth.getId(), providerId: document_provider }, undefined, undefined).subscribe({
            next: (response: any) => {
              //console.log(response);
              this.chats.push(response.chat._id);
              this.showChat = true;
              localStorage.setItem('chats', this.chats.toString())
            },
            error: (error) => {
              console.log(error);
            }
          })
        } else {
          this.showChat = true;
          //console.log(response.chat[0]._id);
          if (this.chats.indexOf(response.chat[0]._id) === -1) {
            this.chats.push(response.chat[0]._id);
            localStorage.setItem('chats', this.chats.toString())
          }
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  closeChat(index: number) {
    this.chats.splice(index, 1);  
    if (this.chats.length === 0) {
      localStorage.removeItem('chats');
    } else {
      localStorage.setItem('chats', this.chats.toString())
    }
    console.log(this.chats);
    
  }

}


