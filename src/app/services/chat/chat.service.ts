import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: Socket;

  constructor() { this.socket = io('http://localhost:10101') }

  public joinChat(userId: string, chatId: any): void {
    this.socket.emit('join', userId, chatId);
  }
  public sendMessage(message: object, chatId: any): void {
    this.socket.emit('message', message, chatId);
  }

  getMessages(chatId: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(`message:${chatId}`, (data: any) => {
        observer.next(data);
      });
    });
  }
}
