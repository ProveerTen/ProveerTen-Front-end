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
export class ChatComponent implements OnInit {

  list_chat: any;
  isLogin: any;
  chats: string[] = [];

  data: any;
  nameSender: any = '';
  messages: any[] = [];
  messageText: string = '';

  chatId: any;

  constructor(private client: ClientService, private chatService: ChatService, public auth: AuthService, public shared: SharedService) {

    this.auth.isLoggedIn().subscribe((value: any) => {
      this.isLogin = value;
    });
    this.shared.chatList.subscribe((value: any) => {
      this.chats = value;

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

  chatear(data: any) {

    console.log(data);

    this.chatId = data._id;

    // console.log(document);

    let filterObject = this.auth.getRole() === 'grocer' ? { grocerId: this.auth.getId(), providerId: data.participants.providerId } : { grocerId: data.participants.grocerId, providerId: this.auth.getId() }
    this.client.postRequest(`${environment.url_chat}/chat/find`, filterObject, undefined, undefined).subscribe({
      next: (response: any) => {
        if (this.chats.indexOf(response.chat[0]._id) === -1) {
          this.chats.push(response.chat[0]._id);
          localStorage.setItem('chats', this.chats.toString())
        }
        this.shared.chatList.next(this.chats)
      },
      error: (error) => {
        console.log(error);
      }
    })

    this.client.postRequest(`${environment.url_chat}/chat/chatunic`, { chatId: this.chatId }, undefined, undefined).subscribe({
      next: (response: any) => {
        console.log(response);
        this.data = response
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.loadMessages();

    this.chatService.joinChat(this.auth.getId(), this.chatId);
    this.chatService.getMessages(this.chatId).subscribe(
      (message: any) => {
        console.log(message);
        this.messages.push(message);
      }
    );
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

  loadMessages() {
    this.client.postRequest(`${environment.url_chat}/chat/getmessages`, { chatId: this.chatId }, undefined, undefined).subscribe({
      next: (response: any) => {
        console.log(response.chat.messages);
        this.messages = response.chat.messages;
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

  ngOnDestroy() {
    this.messages = [];
    this.nameSender = '';
    this.chats = [];
  }

}
