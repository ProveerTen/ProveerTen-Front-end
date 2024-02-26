import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-view-profile-grocer',
  templateUrl: './view-profile-grocer.component.html',
  styleUrls: ['./view-profile-grocer.component.css']
})
export class ViewProfileGrocerComponent {

  id!: string;
  data: any;
  chat: any;
  messageText: any;
  messages: any[] = [];
  showChat: boolean = false;
  selectedChatId: string | null = null;
  chats: string[] = [];

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute,
    private chatService: ChatService) { }

  ngOnInit(): void {
    /*
    this.messageSubscription = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
      console.log(message);

      console.log(this.messages);
    }); */
    
    this.id = this.routerActivate.snapshot.params['id'];
    this.client.getRequest(`${environment.url_logic}/profile/grocers/${this.id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.data = response.data;
      },
      error: (error) => {
        console.log(error.error.Status);
        this.router.navigate(['404']);
      },
      complete: () => console.log('complete'),
    });
  }
  /*
  chatear() {
    this.client.postRequest(`${environment.url_chat}/chat/find`, { grocerId: this.id, providerId: this.auth.getId() }, undefined, undefined).subscribe({
      next: (response: any) => {
        console.log(response)
        this.chat = response

        if (response.chat.length === 0) {
          this.client.postRequest(`${environment.url_chat}/chat/create`, { grocerId: this.id, providerId: this.auth.getId() }, undefined, undefined).subscribe({
            next: (response: any) => {
              console.log(response);
              this.chatService.joinChat(this.auth.getId(), response.chat[0]._id)
            },
            error: (error) => {
              console.log(error);
            }
          })
        } else {
          this.chatService.joinChat(this.auth.getId(), this.chat.chat[0]._id)
        }
      },
      error: (error) => {
        console.log(error);
      }
    })

  }
  */
  chatear() {
    this.client.postRequest(`${environment.url_chat}/chat/find`, { grocerId: this.id, providerId: this.auth.getId() }, undefined, undefined).subscribe({
      next: (response: any) => {
        console.log(response)
        this.chat = response
        if (response.chat.length === 0) {
          this.client.postRequest(`${environment.url_chat}/chat/create`, { grocerId: this.id, providerId: this.auth.getId() }, undefined, undefined).subscribe({
            next: (response: any) => {
              console.log(response);
              this.chats.push(response.chat._id);
              this.selectedChatId = response.chat._id;
              this.showChat = true;
            },
            error: (error) => {
              console.log(error, "a");
            }
          })
        } else {
          this.showChat = true;
          this.selectedChatId = response.chat[0]._id;
          this.chats.push(response.chat._id);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  sendMessage(): void {

    if (this.messageText.trim() !== '') {
      const messageData = {
        user: this.auth.getId(),
        mensaje: this.messageText
      };
      this.chatService.sendMessage(messageData, this.chat.chat[0]._id)
      this.messageText = ''; // Limpiar el campo de texto después de enviar el mensaje
    }
  }


  closeChat(index: number) {
    this.chats.splice(index, 1);
  }

}
