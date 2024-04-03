import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent {
  data: any;
  loading: boolean = false;
  product_modal:string;

  constructor(
    private client: ClientService,
    public auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.client
        .postRequest(
          `${environment.url_logic}/order/products`,
          { nit_company: this.auth.getId() },
          undefined,
          { Authorization: `Bearer ${this.auth.getToken()}` }
        )
        .subscribe({
          next: (response: any) => {
            this.loading = false
            console.log(response);
            this.data = response.products;
            console.log('data', this.data);

            for (let k = 0; k < this.data.length; k++) {
              const element = this.data[k].date_creation;
              this.data[k].date_creation = new Date(element);
            }
            this.data = this.orderByDate(this.data);
          },
          error: (error) => {
            this.loading = false
            console.log(error.error.Status);
          },
          complete: () => console.log('complete'),
        });
    }, 400);
  }

  orderByDate(data: any[]) {
    return data.sort((a, b) => b.date_creation - a.date_creation);
  }

  updateProduct(id: string) {
    this.router.navigate(['update/product', id]);
  }

  createProduct() {
    this.router.navigate(['create/product']);
  }

  createProducts() {
    this.router.navigate(['create/products']);
  }

  viewProductModal(id: string) {
    this.product_modal = id
  }

  deleteProduct(id: string) {
    let res = confirm('¿Seguro qué desea eliminar este producto?');
    if (res) {
      this.client
        .postRequest(
          `${environment.url_logic}/product/delete`,
          { id_product: id },
          undefined,
          { Authorization: `Bearer ${this.auth.getToken()}` }
        )
        .subscribe({
          next: (response: any) => {
            this.messageService.add({
              key: 'center',
              severity: 'success',
              summary: 'Éxito',
              detail: 'El producto se ha eliminado exitosamente',
            });
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          },
          error: (error) => {
            console.log(error);
            this.messageService.add({
              key: 'center',
              severity: 'error',
              summary: 'Error',
              detail: error.error,
            });
          },
          complete: () => console.log('complete'),
        });
    }
  }

  goBack() {
    this.router.navigate(['panel']);
  }
}
