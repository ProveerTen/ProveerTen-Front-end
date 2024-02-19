import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClientService } from 'src/app/services/client/client.service';
import { environment } from 'src/environments/environment';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-view-all-companies',
  templateUrl: './view-all-companies.component.html',
  styleUrls: ['./view-all-companies.component.css']
})
export class ViewAllCompaniesComponent {

  products: any;
  value: any;

  constructor(public auth: AuthService, private router: Router, private client: ClientService, private shared: SharedService) { }

  ngOnInit() {
    this.shared.valueRoute.subscribe(value => {
      this.value = value;
    })
  }
}
