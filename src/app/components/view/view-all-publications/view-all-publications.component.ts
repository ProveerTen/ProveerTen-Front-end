import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-all-publications',
  templateUrl: './view-all-publications.component.html',
  styleUrls: ['./view-all-publications.component.css']
})
export class ViewAllPublicationsComponent {

  publications: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.client.getRequest(`${environment.url_logic}/publication/view`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.publications = response.publications;
        console.log(this.publications);

      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }
}
