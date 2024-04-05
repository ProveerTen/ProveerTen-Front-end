import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/services/shared/shared.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent {

  data_order: any;
  order: any;
  id: any;
  show_products: boolean = false;
  products: any;
  list_products: any[];
  list_products_delete: any[] = [];
  list_show_products: any[] = [];

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute, private shared: SharedService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.id = this.routerActivate.snapshot.params['id'];
    this.client.postRequest(`${environment.url_logic}/order/detail`, { id_order: this.id }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.data_order = response.order;
        this.order = response.order_detail;
        this.order.forEach(product => {
          product.individual_product_price = product.quantity * product.purchase_price_product;
          product.id_product = product.fk_id_product;
        });
        this.list_products = this.order.slice();
        this.getProducts()
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  increaseProduct(product: any) {
    if (product.quantity < 0 || product.stock_product == 0) {
      return;
    }
    product.quantity++;
    product.individual_product_price = product.quantity * product.purchase_price_product;
    product.stock_product--;
  }

  decreaseProduct(product: any) {
    if (product.quantity == 1) {
      return;
    }
    product.quantity--;
    product.individual_product_price = product.quantity * product.purchase_price_product;
    product.stock_product++;
  }

  getProducts() {
    this.client.postRequest(`${environment.url_logic}/order/addproducts`, { id_order: this.id }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        // console.log(response);
        this.products = response.productsdistint;
        this.list_show_products = this.products.slice();
        // console.log(this.products);

      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  showProducts() {
    this.show_products = true;
  }

  // addProduct(product: any) {
  //   console.log(product);

  //   product.quantity = 1;
  //   product.individual_product_price = product.quantity * product.purchase_price_product;
  //   product.isLocalAdd = true;
  //   this.list_products.push(product);
  //   let i = this.list_show_products.indexOf(product.id_product);
  //   this.list_show_products.splice(i, 1);
  // }

  // removeProduct(product: any) {
  //   if (product.isLocalAdd) {
  //     let i = this.list_products.indexOf(product.id_product);
  //     this.list_products.splice(i, 1);
  //     this.list_show_products.push(product);
  //   } else {
  //     console.log(this.list_products);
  //     this.list_products_delete.push(product);
  //     let i = this.order.indexOf(product.id_product);
  //     console.log(i);

  //     this.list_products.splice(i, 1);
  //     this.list_show_products.push(product);
  //   }
  // }

  addProduct(product: any) {
    product.quantity = 1;
    product.individual_product_price = product.quantity * product.purchase_price_product;
    product.isLocalAdd = true;
    this.list_products.push(product);
    product.stock_product -= product.quantity;
    const index = this.list_show_products.findIndex((p: any) => p.id_product === product.id_product);
    if (index !== -1) {
      this.list_show_products.splice(index, 1);
    }

    const index_delete = this.list_products_delete.findIndex((p: any) => p.id_product === product.id_product);
    if (index !== -1) {
      this.list_products_delete.splice(index_delete, 1);
    }
  }

  removeProduct(product: any) {
    if (product.isLocalAdd) {
      const index = this.list_products.indexOf(product);
      this.list_products.splice(index, 1);
      this.list_show_products.push(product);
      product.stock_product += product.quantity;
    } else {
      //product.stock_product -= product.quantity;
      this.list_products_delete.push(product);
      const index = this.order.findIndex((p: any) => p.id_product === product.id_product);
      if (index !== -1) {
        const productToAddBack = this.order[index];
        this.list_show_products.push(productToAddBack);
      }

      const indexOriginal = this.list_products.findIndex((p: any) => p.id_product === product.id_product);
      if (indexOriginal !== -1) {
        const productToDelete = this.list_products[indexOriginal];
        this.list_products.splice(indexOriginal, 1);
        productToDelete.stock_product += productToDelete.quantity;
      }
    }
  }

  updateOrder() {
    console.log(this.list_products);
    console.log(this.list_products_delete);

    this.client.postRequest(`${environment.url_logic}/order/update`, { id_order: this.id, list_update: this.list_products, list_delete: this.list_products_delete }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: '¡Pedido actualizado exitosamente!' });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error: (error) => {
        console.log(error.error.Status);
        this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error en la actualización del pedido!' });
      },
      complete: () => console.log('complete'),
    });
  }

  closeProducts() {
    this.show_products = false;
  }

  goBack(role: string) {
    if (role === 'grocer') {
      this.router.navigate(['view/orders'])
      return;
    }
    this.router.navigate(['manage/orders'])
  }
}
