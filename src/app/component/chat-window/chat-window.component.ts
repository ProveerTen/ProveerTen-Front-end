import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
  @Input() contact: any;
  @Output() closeChatEvent = new EventEmitter<void>();

  messages = [
    { from: 'other', text: 'Hello, how are you?' },
    { from: 'me', text: 'Hi! Im doing well, thanks.' },
  ];

  newMessage: string = '';

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ from: 'me', text: this.newMessage });
      this.newMessage = '';
    }
  }
  closeChat(): void {
    this.closeChatEvent.emit();
  }
}

