import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-list-chats',
  templateUrl: './list-chats.component.html',
  styleUrls: ['./list-chats.component.css']
})
export class ListChatsComponent {

  data: any;
  isLogin: any;
  chats: string[] = [];

  constructor(private client: ClientService, public auth: AuthService, private router: Router, public shared: SharedService) {
    this.auth.isLoggedIn().subscribe((value: any) => {
      this.isLogin = value;
    });
    this.shared.chatList.subscribe((value: any) => {
      this.chats = value;

      this.client.postRequest(`${environment.url_chat}/chat/getchats`, { role: this.auth.getRole(), id: this.auth.getId() }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.data = response.chatData;
          console.log(this.data);

        },
        error: (error) => {
          console.log(error);
        },
        complete: () => console.log('complete'),
      });

      if (this.chats.length > 2) {
        this.chats.splice(0, 1);
        localStorage.setItem('chats', this.chats.toString())
      }
    });
  }

  ngOnInit(): void {
    if (this.isLogin) {
      let localchats = localStorage.getItem('chats');
      if (localchats) {
        this.chats = localchats.split(',');
      }
    }
  }

  chatear(document: any) {

    let filterObject = this.auth.getRole() === 'grocer' ? { grocerId: this.auth.getId(), providerId: document } : { grocerId: document, providerId: this.auth.getId() }

    this.client.postRequest(`${environment.url_chat}/chat/find`, filterObject, undefined, undefined).subscribe({
      next: (response: any) => {
        if (this.chats.indexOf(response.chat[0]._id) === -1) {
          this.chats.push(response.chat[0]._id);
          if (this.chats.length > 2) {
            this.chats.splice(0, 1);
            localStorage.setItem('chats', this.chats.toString())
          }
          localStorage.setItem('chats', this.chats.toString())
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  closeChat(index: any) {
    this.chats.splice(index, 1);
    if (this.chats.length === 0) {
      localStorage.removeItem('chats');
    } else {
      localStorage.setItem('chats', this.chats.toString())
    }
    console.log(this.chats);
  }

  ngOnDestroy() {
    this.chats = [];
  }

}