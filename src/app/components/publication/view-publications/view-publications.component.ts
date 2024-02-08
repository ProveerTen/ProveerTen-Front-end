import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-publications',
  templateUrl: './view-publications.component.html',
  styleUrls: ['./view-publications.component.css']
})
export class ViewPublicationsComponent {

  publications: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.client.getRequest(`${environment.url_logic}/publication/view/company/${this.auth.getId()}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.publications = response.publications;
        if (this.publications == '') {
          this.publications = false;
        }
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  updatePublication(id: string) {
    this.router.navigate(['update/publication', id]);
  }

  deletePublication(id: string) {
    let res = confirm('¿Seguro qué desea eliminar esta publicación?');
    if (res) {
      this.client.deleteRequest(`${environment.url_logic}/publication/delete/${id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          window.location.reload();
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    }
  }
}
