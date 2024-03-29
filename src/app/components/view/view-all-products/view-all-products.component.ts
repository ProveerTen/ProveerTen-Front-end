import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClientService } from 'src/app/services/client/client.service';
import { environment } from 'src/environments/environment';
import { SharedService } from '../../../services/shared/shared.service';
import product from '../../../interfaces/product';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css']
})
export class ViewAllProductsComponent {

  products: any;
  value: any;
  filter: any[] = [];
  category: string;
  sub_category: string;
  isOffline: any;
  data_location: any;

  constructor(public auth: AuthService, private router: Router, private client: ClientService, private shared: SharedService) {
    auth.isLoggedIn().subscribe(value => {
      this.isOffline = value;
    });
  }

  ngOnInit() {
    this.getProducts();

    this.shared.searchTerm.subscribe(value => {
      this.value = value;
      if (this.value !== "") {
        if (this.category !== "") {
          this.getProductsByCategoriesAndName();
        } else {
          this.getProductsByName();
        }
      } else if (this.category !== "") {
        this.getProductsByCategories();
      } else {
        this.products = this.filter;
      }
    });

    this.shared.category.subscribe(value => {
      this.category = value;
      console.log(this.category);
      if (this.value === "" && this.category !== "") {
        this.getProductsByCategories();
      } else if (this.value !== "" && this.category !== "") {
        this.getProductsByCategoriesAndName();
      } else {
        this.products = this.filter;
      }
    });

    this.shared.product_sub_category.subscribe(value => {
      this.sub_category = value;
      console.log(value);

      if (this.value === "" && this.category !== "" && this.sub_category.length > 0) {
        this.getProductsByCategoriesAndSubCategories();
        console.log("1");

      } else if (this.value !== "" && this.category !== "" && this.sub_category.length > 0) {
        this.getProductsByCategoriesAndSubCategoriesAndName();
        console.log("2");
      } else {
        this.products = this.filter;
      }
    });
  }

  getProducts() {
    if (!(this.isOffline)) {
      this.shared.department_and_city.subscribe(value => {
        this.data_location = value;
        console.log(this.data_location);
        this.client.postRequest(`${environment.url_logic}/view/products/location`, this.data_location, undefined, undefined).subscribe({
          next: (response: any) => {
            this.products = response.categoriesByProducts;
            console.log(this.products);
            this.filter = this.products.slice();

            if (this.value !== "") {
              this.getProductsByName();
            } else {
              this.products = this.filter;
            }
            if (this.products.length == 0) {
              console.log('No hay productos por mostrar');
            }
          },
          error: (error) => {
            console.log(error.error.Status);
          },
          complete: () => console.log('complete'),
        });
      });
    } else {
      this.client.postRequest(`${environment.url_logic}/view/products`, { document_grocer: this.auth.getId() }, undefined, undefined).subscribe({
        next: (response: any) => {
          this.products = response.categoriesByProducts;
          console.log(this.products);
          this.filter = this.products.slice();

          if (this.value !== "") {
            this.getProductsByName();
          } else {
            this.products = this.filter;
          }
          if (this.products.length == 0) {
            console.log('No hay productos por mostrar');
          }
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    }

  }

  getProductsByName() {
    this.products = this.filter.filter((product: any) => {
      return (
        this.removeAccents(product.name_product).toLowerCase().includes(this.removeAccents(this.value).toLowerCase()) ||
        this.removeAccents(product.description_product).toLowerCase().includes(this.removeAccents(this.value).toLowerCase())
      );
    });
  }

  getProductsByCategories() {
    this.products = this.filter.filter((product: any) => {
      return (
        product.fk_product_category_name_category.includes(this.category)
      );
    });
  }

  getProductsByCategoriesAndName() {
    this.products = this.filter.filter((product: any) => {
      const nameMatch = this.removeAccents(product.name_product).toLowerCase().includes(this.removeAccents(this.value).toLowerCase());
      const descriptionMatch = this.removeAccents(product.description_product).toLowerCase().includes(this.removeAccents(this.value).toLowerCase());
      const categoryMatch = product.fk_product_category_name_category === this.category;

      return (nameMatch || descriptionMatch) && categoryMatch;
    });
  }

 
  getProductsByCategoriesAndSubCategories() {
    this.products = this.filter.filter((product: any) => {
      return (
        product.fk_product_category_name_category.includes(this.category) &&
        product.fk_product_sub_category_name_sub_category.includes(this.sub_category)
      );
    });

  }

  getProductsByCategoriesAndSubCategoriesAndName() {
    this.products = this.filter.filter((product: any) => {

    });
  }

  viewProduct(id: string) {
    this.router.navigate(['view/product/', id]);
  }

  removeAccents(text: string): string {
    if (!text) {
      return '';
    }
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
