import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  contacts = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
    // Agrega más contactos según sea necesario
  ];

  selectedContact: any;

  openChat(contact: any): void {
    this.selectedContact = contact;
  }
  closeChatWindow(): void {
    this.selectedContact = null;
  }
}

