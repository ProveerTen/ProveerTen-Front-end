import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ChatService } from 'src/app/services/chat/chat.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-view-profile-grocer',
  templateUrl: './view-profile-grocer.component.html',
  styleUrls: ['./view-profile-grocer.component.css']
})
export class ViewProfileGrocerComponent {
  loading: boolean = false
  id!: string;
  data: any;
  chat: any;
  messageText: any;
  messages: any[] = [];
  chats: string[] = [];

  @Input() modalProfile: string;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute,
    private shared: SharedService) { }

  ngOnChanges(): void {
   
    if (this.modalProfile) {
      this.id = this.modalProfile;
      this.dataProfielGrocer()
    }
  }

  dataProfielGrocer(): void {
    this.loading = true
    setTimeout(() => {
      // this.id = this.routerActivate.snapshot.params['id'];
      this.client.getRequest(`${environment.url_logic}/profile/grocers/${this.id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.loading = false
          this.data = response.data;
        },
        error: (error) => {
          this.loading = false
          console.log(error.error.Status);
          this.router.navigate(['404']);
        },
        complete: () => console.log('complete'),
      });
    }, 400)
  }

  chatear() {
    this.client.postRequest(`${environment.url_chat}/chat/find`, { grocerId: this.id, providerId: this.auth.getId() }, undefined, undefined).subscribe({
      next: (response: any) => {
        this.chat = response
        this.shared.chatear.next(true);
        if (response.chat.length === 0) {
          this.client.postRequest(`${environment.url_chat}/chat/create`, { grocerId: this.id, providerId: this.auth.getId() }, undefined, undefined).subscribe({
            next: (response: any) => {
              this.shared.chatear.next(true);
            },
            error: (error) => {
              console.log(error);
            }
          })
        } 
      },
      error: (error) => {
        console.log(error);
      }
    })
  }



}
