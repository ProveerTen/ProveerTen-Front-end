import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ClientService } from 'src/app/services/client/client.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  list_chat: any;
  isLogin: any;
  chats: string[] = [];

  data: any;
  nameSender: any = '';
  messages: any[] = [];
  messageText: string = '';

  chatId: any;

  constructor(private client: ClientService, private chatService: ChatService, public auth: AuthService, public shared: SharedService) {

    this.client.postRequest(`${environment.url_chat}/chat/getchats`, { role: this.auth.getRole(), id: this.auth.getId() }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.list_chat = response.chatData;
        console.log(this.list_chat);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('complete'),
    });
  }

  chatear(data: any) {
    this.chatId = data._id;
    this.chatService.joinChat(this.auth.getId(), this.chatId);
    this.loadMessages();
  }

  loadMessages() {
    this.client.postRequest(`${environment.url_chat}/chat/getmessages`, { chatId: this.chatId }, undefined, undefined).subscribe({
      next: (response: any) => {
        this.messages = response.chat.messages;
        console.log(this.messages);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  sendMessage(): void {
    if (this.messageText.trim() !== '') {
      const messageData = {
        sender: this.auth.getId(),
        content: this.messageText
      };
      this.chatService.sendMessage(messageData, this.chatId);
      this.messageText = '';

      setTimeout(() => {
        this.chatService.getMessages(this.chatId).then(data => {
          this.messages.push(data);
        });
      }, 1000)
    }

  }

  isMyMessage(sender: string): boolean {
    if (this.data && this.auth.getRole() === 'grocer') {
      if (sender === this.auth.getId()) {
        this.nameSender = this.data.grocer[0].name_grocer
      } else {
        this.nameSender = this.data.provider[0].name_provider
      }
    }
    if (this.data && this.auth.getRole() === 'provider') {
      if (sender === this.auth.getId()) {
        this.nameSender = this.data.provider[0].name_provider
      } else {
        this.nameSender = this.data.grocer[0].name_grocer
      }
    }

    return sender === this.auth.getId();
  }

}
