import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-profile-provider',
  templateUrl: './view-profile-provider.component.html',
  styleUrls: ['./view-profile-provider.component.css']
})
export class ViewProfileProviderComponent {
  loading : boolean = false
  id!: string;
  data: any;

  @Input() modalProfile_:string

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute) { }

  ngOnChanges(): void {    
    if (this.modalProfile_) {     
      this.id = this.modalProfile_;
      this.getDataProvider();
    }
  }

  getDataProvider(): void {
      this.loading = true

    // this.id = this.routerActivate.snapshot.params['id'];
    this.client.getRequest(`${environment.url_logic}/profile/providers/${this.id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
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
  }
}
