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

  // data: any;
  nameSender: any = '';
  messages: any[] = [];
  messageText: string = '';

  data_chat: any = null;

  chatId: any;

  page: any = 1;

  is_chat: boolean = false;

  @ViewChild('messageContainer') messageContainer: ElementRef;

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

  changePage(page: any) {
    this.page = page;
    this.is_chat = false;
  }

  chatear(data: any) {
    this.is_chat = true;
    this.chatId = data._id;
    this.data_chat = null;
    this.messages = null;
    this.chatService.joinChat(this.auth.getId(), this.chatId);
    this.loadMessages();
    this.chatService.getMessages(this.chatId).subscribe(
      (message: any) => {
        this.messages.push(message);
      }
    );
    this.client.postRequest(`${environment.url_chat}/chat/chatunic`, { chatId: this.chatId }, undefined, undefined).subscribe({
      next: (response: any) => {
        console.log(response);
        this.data_chat = response;
        console.log(this.data_chat);
        this.scrollToBottom();
      },
      error: (error) => {
        console.log(error);
      }
    });
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
      this.scrollToBottom();
    }

  }

  isMyMessage(sender: string): boolean {
    if (this.data_chat && this.auth.getRole() === 'grocer') {
      if (sender === this.auth.getId()) {
        this.nameSender = this.data_chat.grocer[0].name_grocer
      } else {
        this.nameSender = this.data_chat.provider[0].name_provider
      }
    }
    if (this.data_chat && this.auth.getRole() === 'provider') {
      if (sender === this.auth.getId()) {
        this.nameSender = this.data_chat.provider[0].name_provider
      } else {
        this.nameSender = this.data_chat.grocer[0].name_grocer
      }
    }

    return sender === this.auth.getId();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    }, 2000);
  }

}
