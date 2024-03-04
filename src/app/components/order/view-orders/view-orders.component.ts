import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import product from '../../../interfaces/product';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent {

  data_orders: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute, private shared: SharedService) { }

  ngOnInit(): void {
    this.client.getRequest(`${environment.url_logic}/order/grocer`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.data_orders = response.order;
        console.log(this.data_orders);

      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  viewOrder(id_order: string) {
    this.router.navigate(['view/order/', id_order]);
  }

  goBack() {
    this.router.navigate([''])
  }

}
