import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-publication',
  templateUrl: './view-publication.component.html',
  styleUrls: ['./view-publication.component.css']
})
export class ViewPublicationComponent {

  publication: any = null;
  id!: string;

  @Input() publicationModal: any;
  @Input() showModal: boolean = false;

  constructor(private client: ClientService, public auth: AuthService, private router: Router) { }

  ngOnChanges(): void {
    if (this.publicationModal) {
      this.id = this.publicationModal;
      this.fetchPublicationDetails();
    }
    if (this.showModal) {
      this.showModal = true;
    }
  }

  fetchPublicationDetails() {
    this.publication = null;
    this.client.getRequest(`${environment.url_logic}/publication/view/${this.id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.publication = response.publication;
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

}
