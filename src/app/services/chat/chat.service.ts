import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;

  constructor() { this.socket = io(environment.url_chat) }

  public joinChat(userId: string, chatId: any): void {
    this.socket.emit('join', userId, chatId);
  }
  public sendMessage(message: object, chatId: any): void {
    this.socket.emit('message', message, chatId);
  }

  async getMessages(chatId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.socket.on(`message:${chatId}`, (data: any) => {
        resolve(data);
        console.log(data, 'chat service', 1);
      });
    });
  }

}
