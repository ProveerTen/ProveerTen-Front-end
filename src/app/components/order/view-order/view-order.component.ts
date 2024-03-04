import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent {

  data_order: any;
  order: any;
  id: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute, private shared: SharedService) { }

  ngOnInit(): void {
    this.id = this.routerActivate.snapshot.params['id'];
    this.client.postRequest(`${environment.url_logic}/order/detail`, { id_order: this.id }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.data_order = response.order;
        this.order = response.order_detail;
        console.log(this.data_order);
        console.log(this.order);

      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  deleteOrder() {
    this.id = this.routerActivate.snapshot.params['id'];
    let option = confirm('¿Seguro qué desea eliminar el pedido?');
    if (option) {
      this.client.postRequest(`${environment.url_logic}/order/delete`, { id_order: this.id }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.router.navigate(['view/orders'])
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    }
  }

  goBack(role: string) {
    if (role === 'grocer') {
      this.router.navigate(['view/orders'])
      return;
    }
    this.router.navigate(['manage/orders'])
  }

}
