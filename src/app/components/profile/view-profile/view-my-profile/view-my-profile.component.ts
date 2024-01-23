import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-view-my-profile',
  templateUrl: './view-my-profile.component.html',
  styleUrls: ['./view-my-profile.component.css']
})
export class ViewMyProfileComponent implements OnInit {

  data: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.client.getRequest(`http://localhost:4001/profile/${this.auth.getRole()}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log(response);
        console.log(response.data);
        this.data = response.data;
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

}
