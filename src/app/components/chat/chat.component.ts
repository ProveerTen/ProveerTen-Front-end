import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ClientService } from 'src/app/services/client/client.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  @Input() chatId: string;
  messages: any[] = [];
  messageText: string = '';

  constructor(private chatService: ChatService, private auth: AuthService, private client: ClientService) { }

  ngOnInit(): void {
    this.loadMessages();
    console.log(this.chatId);
    this.chatService.joinChat(this.auth.getId(), this.chatId)
    this.chatService.getMessages(this.chatId).subscribe(
      (message: any) => {
        console.log(message);
        this.messages.push(message);
      }
    );
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
    })
  }

  sendMessage(): void {
    if (this.messageText.trim() !== '') {
      const messageData = {
        sender: this.auth.getId(),
        content: this.messageText
      };
      this.chatService.sendMessage(messageData, this.chatId)
      this.messageText = '';
    }
  }

  ngOnDestroy() {
    this.messages = [];
  }
} 