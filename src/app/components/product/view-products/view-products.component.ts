import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
})
export class ViewProductsComponent {

  loading: boolean = false;
  data: any;
  id!: string;
  product_modal:string;

  constructor(
    private client: ClientService,
    public auth: AuthService,
    private router: Router,
    private routerActivate: ActivatedRoute
  ) {
    this.id = this.routerActivate.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.client
        .postRequest(
          `${environment.url_logic}/order/products`,
          { nit_company: this.id },
          undefined,
          { Authorization: `Bearer ${this.auth.getToken()}` }
        )
        .subscribe({
          next: (response: any) => {
            this.loading = false;
            console.log(response);
            this.data = response.products;
          },
          error: (error) => {
            this.loading = false;
            console.log(error.error.Status);
          },
          complete: () => console.log('complete'),
        });
    }, 400);
  }

  viewProductModal(id: string) {
   this.product_modal = id
  }
}
