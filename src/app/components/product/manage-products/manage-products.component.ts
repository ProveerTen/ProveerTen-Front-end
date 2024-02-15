import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent {
  data: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.client.postRequest(`${environment.url_logic}/order/products`, { nit_company: this.auth.getId() }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.data = response.products;
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  updateProduct(id: string) {
    this.router.navigate(['update/product', id]);
  }
  createProduct() {
    this.router.navigate(['create/product']);
  }

  viewProduct(id: string) {
    this.router.navigate(['view/product/', id])
  }

  deleteProduct(id: string) {
    let res = confirm('¿Seguro qué desea eliminar este producto?');
    if (res) {
      this.client.postRequest(`${environment.url_logic}/product/delete`, { id_product: id }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'El producto se ha eliminado exitosamente' });
          setTimeout(() => {
            window.location.reload();
          }, 1500);

        },
        error: (error) => {
          console.log(error);
          this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: error.error });
        },
        complete: () => console.log('complete'),
      });
    }
  }

  goBack() {
    this.router.navigate(['panel']);
  }
}
