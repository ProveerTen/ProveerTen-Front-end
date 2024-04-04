import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent {

  data_order: any;
  order: any;
  selectedStatus: any = '';
  selectedDate: any = '';
  minPrice: any;
  maxPrice: any;
  filter: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute, private shared: SharedService) { }

  ngOnInit(): void {
    if (this.auth.getRole() === 'company') {
      this.client.getRequest(`${environment.url_logic}/order/company`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.data_order = response.order;
          this.filter = this.data_order.slice();
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    } else {
      this.client.getRequest(`${environment.url_logic}/order/provider`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.data_order = response.order;
          this.filter = this.data_order.slice();
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    }
  }

  deleteOrder(id: string) {
    let option = confirm('¿Seguro qué desea eliminar el pedido?');
    if (option) {
      this.client.postRequest(`${environment.url_logic}/order/delete`, { id_order: id }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    }
  }

  viewOrder(id_order: string) {
    this.router.navigate(['view/order/', id_order]);
  }

  goBack() {
    this.router.navigate(['panel'])
  }

  applyFilters() {

    if (this.selectedStatus !== "" && this.selectedDate === "") {
      this.data_order = this.filter.filter(order => { return order.status === this.selectedStatus })
    } else if (this.selectedDate !== "" && this.selectedStatus === "") {
      const selectedDateISO = new Date(this.selectedDate).toISOString();
      this.data_order = this.filter.filter(order => {
        return new Date(order.order_date).toISOString().slice(0, 10) === selectedDateISO.slice(0, 10);
      });
    } else if (this.selectedStatus !== "" && this.selectedDate !== "") {
      const selectedDateISO = new Date(this.selectedDate).toISOString();
      this.data_order = this.filter.filter(order => {
        return (new Date(order.order_date).toISOString().slice(0, 10) === selectedDateISO.slice(0, 10)
          &&
          order.status === this.selectedStatus
        );
      });
    }

    if (this.selectedDate === "" && this.selectedStatus === "") {
      this.data_order = this.filter;
    }

  }



}
