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
  categoriesList: any[] = [];

  constructor(public auth: AuthService, private router: Router, private client: ClientService, private shared: SharedService) { }

  ngOnInit() {
    this.getProducts();

    this.shared.searchTerm.subscribe(value => {
      this.value = value;
      if (this.value !== "") {
        if (this.categoriesList.length > 0) {
          this.getProductsByCategoriesAndName();
        } else {
          this.getProductsByName();
        }
      } else if (this.categoriesList.length > 0) {
        this.getProductsByCategories();
      } else {
        this.products = this.filter;
      }
    });

    this.shared.categoriesList.subscribe(value => {
      this.categoriesList = value;
      if (this.value === "" && this.categoriesList.length > 0) {
        this.getProductsByCategories();
      } else if (this.value !== "" && this.categoriesList.length > 0) {
        this.getProductsByCategoriesAndName();
      } else {
        this.products = this.filter;
      }
    });
  }

  getProducts() {
    if (this.auth.isLoggedIn()) {
      this.client.postRequest(`${environment.url_logic}/view/products/location`, { city:'Armenia',deparment: "Quindío" }, undefined, undefined).subscribe({
        next: (response: any) => {
          this.products = response.categoriesByProducts;
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    } else {
      this.client.postRequest(`${environment.url_logic}/view/products`, { document_grocer: this.auth.getId() }, undefined, undefined).subscribe({
        next: (response: any) => {
          this.products = response.categoriesByProducts;
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
      return product.categories.some((productCategory: any) => {
        return this.categoriesList.some((category: string) =>
          this.removeAccents(productCategory.fk_product_category_name_category).toLowerCase().includes(this.removeAccents(category).toLowerCase())
        );
      });
    });
  }

  getProductsByCategoriesAndName() {
    this.products = this.filter.filter((product: any) => {
      const nameMatch = this.removeAccents(product.name_product).toLowerCase().includes(this.removeAccents(this.value).toLowerCase());
      const descriptionMatch = this.removeAccents(product.description_product).toLowerCase().includes(this.removeAccents(this.value).toLowerCase());
      const categoryMatch = product.categories.some((productCategory: any) => {
        return this.categoriesList.some((category: string) =>
          this.removeAccents(productCategory.fk_product_category_name_category).toLowerCase().includes(this.removeAccents(category).toLowerCase())
        );
      });

      return (nameMatch || descriptionMatch) && categoryMatch;
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
