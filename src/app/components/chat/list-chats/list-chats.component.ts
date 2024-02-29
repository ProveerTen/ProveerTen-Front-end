import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-chats',
  templateUrl: './list-chats.component.html',
  styleUrls: ['./list-chats.component.css']
})
export class ListChatsComponent {

  data: any;
  isLogin: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router) {
    this.auth.isLoggedIn().subscribe((value: any) => {
      this.isLogin = value;
    });
  }

  ngOnInit(): void {
    if (this.isLogin) {
      this.client.postRequest(`${environment.url_chat}/chat/getchats`, { role: this.auth.getRole(), id: this.auth.getId() }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.data = response.chats;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => console.log('complete'),
      });
    }
  }

}
