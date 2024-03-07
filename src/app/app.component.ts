import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { SharedService } from './services/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProveerTen';
  chats: string[] = [];
  isLogin: any;
  listChatsActive: boolean = true;

  constructor(public auth: AuthService, private shared: SharedService) {

    this.auth.isLoggedIn().subscribe((value: any) => {
      this.isLogin = value;
    });
    this.shared.chatList.subscribe((value: any) => {
      this.chats = value;
      console.log(this.chats);


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

  closeChat(index: any) {
    this.chats.splice(index, 1);
    if (this.chats.length === 0) {
      localStorage.removeItem('chats');
    } else {
      localStorage.setItem('chats', this.chats.toString())
    }
    console.log(this.chats);
  }

  changeStyle() {
    this.listChatsActive = !this.listChatsActive;
  }

  ngOnDestroy() {
    this.chats = [];
  }
}
