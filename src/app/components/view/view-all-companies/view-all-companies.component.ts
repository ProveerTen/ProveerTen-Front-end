import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-view-all-companies',
  templateUrl: './view-all-companies.component.html',
  styleUrls: ['./view-all-companies.component.css']
})
export class ViewAllCompaniesComponent {

  companies: any;
  value: any;
  data: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute, private shared: SharedService) { }

  ngOnInit() {
    this.shared.valueRoute.subscribe(value => {
      this.value = value;
    })
    this.getCompanies();
  }

  getCompanies() {
    this.client.getRequest(`${environment.url_logic}/profile/allCompaniesUserCero`, undefined, undefined).subscribe({
      next: (response: any) => {
        this.data = response.data;
        console.log(this.data);

      },
      error: (error) => {
        console.log(error.error.Status);
        console.log('No hay productos por mostrar');

      },
      complete: () => console.log('complete'),
    });
  }

  viewCompany(id: string) {
    this.router.navigate(['profile/company/', id]);
  }
}
