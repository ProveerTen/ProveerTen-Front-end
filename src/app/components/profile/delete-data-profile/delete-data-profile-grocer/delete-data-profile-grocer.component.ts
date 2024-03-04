import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-delete-data-profile-grocer',
  templateUrl: './delete-data-profile-grocer.component.html',
  styleUrls: ['./delete-data-profile-grocer.component.css']
})
export class DeleteDataProfileGrocerComponent {
  loading : boolean = false
  data: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {



    this.client.getRequest(`${environment.url_logic}/profile/${this.auth.getRole()}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.data = response.data;
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  deleteValue(value: string) {
    this.loading = true
    setTimeout (()=>{
    this.client.deleteRequest(`${environment.url_logic}/edit_profile/${this.auth.getRole()}`, { deleteField: value }, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.loading = false

      },
      error: (error) => {
        this.loading = false
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  },400)
  }
}
