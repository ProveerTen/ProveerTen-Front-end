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
  filter: any[] = [];
  category: string;
  sub_category: string;
  isOffline: any;
  data_location: any;
  product_modal: any;

  constructor(public auth: AuthService, private router: Router, private client: ClientService, private shared: SharedService) {
    auth.isLoggedIn().subscribe(value => {
      this.isOffline = value;
    });
  }

  ngOnInit() {
    this.shared.searchTerm.subscribe(value => {
      this.value = value;
      this.handleProductFiltering();
    });

    this.shared.category.subscribe(value => {
      this.category = value;
      this.handleProductFiltering();
    });

    this.shared.sub_category.subscribe(value => {
      this.sub_category = value;
      this.handleProductFiltering();
    });

    this.getProducts();
  }

  handleProductFiltering() {
    if (this.value !== "" && this.category === "" && this.sub_category === "") {
      this.getProductsByName();
    } else if (this.value !== "" && this.category !== "" && this.sub_category === "") {
      this.getProductsByCategoriesAndName();
    } else if (this.value !== "" && this.category !== "" && this.sub_category !== "") {
      this.getProductsByCategoriesAndSubCategoriesAndName();
    } else if (this.value === "" && this.category === "" && this.sub_category === "") {
      this.products = this.filter;
    } else if (this.value === "" && this.category !== "" && this.sub_category === "") {
      this.getProductsByCategories();
    } else if (this.value === "" && this.category !== "" && this.sub_category !== "") {
      this.getProductsByCategoriesAndSubCategories();
    }
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
            this.products.forEach(product => {
              if (product.stock_product === 0) {
                product.availability_product = "No Disponible"
              } else {
                product.availability_product = "Disponible"
              }
            });
            this.filter = this.products.slice();
            this.handleProductFiltering();
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
          this.products.forEach(product => {
            if (product.stock_product === 0) {
              product.availability_product = "No Disponible"
            } else {
              product.availability_product = "Disponible"
            }
          });
          this.filter = this.products.slice();
          this.handleProductFiltering();

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
        product.fk_subcategory_name_subcategory.includes(this.sub_category)
      );
    });
    console.log(this.products);

  }

  getProductsByCategoriesAndSubCategoriesAndName() {
    this.products = this.filter.filter((product: any) => {
      const nameMatch = this.removeAccents(product.name_product).toLowerCase().includes(this.removeAccents(this.value).toLowerCase());
      const descriptionMatch = this.removeAccents(product.description_product).toLowerCase().includes(this.removeAccents(this.value).toLowerCase());
      const categoryMatch = product.fk_product_category_name_category === this.category;
      const subCategoryMatch = this.sub_category.includes(product.fk_subcategory_name_subcategory);
      return (nameMatch || descriptionMatch) && categoryMatch && subCategoryMatch;
    });
  }

  viewProduct(id: string) {
    this.router.navigate(['view/product/', id]);
  }

  viewProductModal(id: string) {
    this.product_modal = id;
  }

  removeAccents(text: string): string {
    if (!text) {
      return '';
    }
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
