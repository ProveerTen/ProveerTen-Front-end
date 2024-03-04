import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClientService } from 'src/app/services/client/client.service';
import { environment } from 'src/environments/environment';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css']
})
export class ViewAllProductsComponent {

  products: any;
  value: any;
  data: any;

  constructor(public auth: AuthService, private router: Router, private client: ClientService, private shared: SharedService) { }

  ngOnInit() {
    this.shared.valueRoute.subscribe(value => {
      this.value = value;
      if (this.value != null) {
        this.getProductsByName();
        return;
      }
    })

    this.getProducts();
  

  }

  getProducts() {
    this.client.getRequest(`${environment.url_logic}/view/products`, undefined, undefined).subscribe({
      next: (response: any) => {
        this.data = response.categoriesByProducts;
        if (this.data.length == 0) {
          console.log('No hay productos por mostrar');
        }
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  getProductsByName() {
    this.client.postRequest(`${environment.url_logic}/search/products/value`, { value: this.value }, undefined, undefined).subscribe({
      next: (response: any) => {
        this.data = response.values;
        if (this.data.length == 0) {
          console.log('No hay productos por mostrar');
        }
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  viewProduct(id: string) {
    this.router.navigate(['view/product/', id]);
  }

}

