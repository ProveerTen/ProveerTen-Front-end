import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import product from '../../../interfaces/product';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
})
export class ViewProductsComponent {

  loading: boolean = false;
  products: any;
  id!: string;
  product_modal: string;
  value: any;
  filter: any;
  availability_product: string;

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
            this.products = response.products;

            this.products.forEach(product => {
              if (product.stock_product === 0) {
                product.availability_product = "No Disponible"
              } else {
                product.availability_product = "Disponible"
              }
            });
            this.filter = this.products.slice();
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

  viewProduct(id: string) {
    this.router.navigate(['view/product', id])
  }

  searchProducts() {

    this.products = this.filter.filter((product: any) => {
      return (
        this.removeAccents(product.name_product).toLowerCase().includes(this.removeAccents(this.value).toLowerCase()) ||
        this.removeAccents(product.description_product).toLowerCase().includes(this.removeAccents(this.value).toLowerCase())
      );
    });

  }

  removeAccents(text: string): string {
    if (!text) {
      return '';
    }
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
