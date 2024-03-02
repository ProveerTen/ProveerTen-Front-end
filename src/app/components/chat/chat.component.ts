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
  @Input() chatId: string;
  @Input() value: number;
  messages: any[] = [];
  messageText: string = '';
  chats: string[] = [];
  @ViewChild('messageContainer') messageContainer: ElementRef;

  constructor(private chatService: ChatService, private auth: AuthService, private client: ClientService, public shared: SharedService) { }

  ngOnInit(): void {
    this.loadMessages();
    console.log(this.chatId);
    this.chatService.joinChat(this.auth.getId(), this.chatId);
    this.chatService.getMessages(this.chatId).subscribe(
      (message: any) => {
        console.log(message);
        this.messages.push(message);
        this.scrollToBottom();
      }
    );
  }

  loadMessages() {
    this.client.postRequest(`${environment.url_chat}/chat/getmessages`, { chatId: this.chatId }, undefined, undefined).subscribe({
      next: (response: any) => {
        console.log(response.chat.messages);
        this.messages = response.chat.messages;
        this.scrollToBottom();
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
    return sender === this.auth.getId();
  }

  ngOnDestroy() {
    this.messages = [];
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    });
  }
}
