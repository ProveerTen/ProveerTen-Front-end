import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import product from '../../../interfaces/product';
import { SharedService } from 'src/app/services/shared/shared.service';

interface order {
  order_delivery_date: Date,
  total_ordered_price: any,
  status: string,
  document_provider: string,
  name_provider: string,
  last_name_provider: string,
  products: any[]
}

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})


export class CreateOrderComponent {

  companies: any[];
  products: any;
  filteredCompanies: any[];
  selectedCompany: any;
  searchTerm: string = '';
  indexPage: number = 1;
  isData = true;
  providers: any;
  product_quantity: number;
  orderProducts: any[] = [];
  total: number = 0;
  data_order: order;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute, private shared: SharedService) { }

  ngOnInit(): void {
    this.client.getRequest(`${environment.url_logic}/order/companies`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.companies = response.companies.map(company => ({ ...company, isSelected: false }));
        this.filteredCompanies = [...this.companies];
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });

    this.shared.companyOrder.subscribe((company: any) => {
      if (company !== null) {
        company.isSelected = true;
        this.updateSelection(company);
        // this.showProducts();
      }
    })
  }

  filterCompanies() {
    this.filteredCompanies = this.companies.filter(company =>
      company.name_company.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updateSelection(company: any) {
    this.isData = false;
    if (this.companies) {
      this.companies.forEach(c => {
        if (c !== company) {
          c.isSelected = false;
        }
      });
      this.selectedCompany = this.companies.find(c => c.isSelected);
    } else {
      this.selectedCompany = company;
    }

    this.showProducts();
    this.getProviders();
  }

  // viewCompany() {
  //   console.log(this.selectedCompany);
  // }

  showProducts() {
    if (this.selectedCompany) {
      this.client.postRequest(`${environment.url_logic}/order/products`, { "nit_company": this.selectedCompany.nit_company }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.products = response.products;
          this.products.forEach(product => {
            product.product_quantity = 0;
          });
          console.log(this.products);
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    }
  }

  getProviders() {
    if (this.selectedCompany) {
      this.client.postRequest(`${environment.url_chat}/provider/city`, { companyId: this.selectedCompany.nit_company, grocerId: this.auth.getId() }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.providers = response.providersbycity[0];
          console.log(this.providers);
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    }
  }

  getData(id_provider: string, provider_name: string, last_name: string) {
    this.data_order = {
      order_delivery_date: new Date(),
      total_ordered_price: null,
      status: "Creado",
      document_provider: id_provider,
      name_provider: provider_name,
      last_name_provider: last_name,
      products: this.orderProducts
    }
    console.log(this.data_order);

  }

  editOrder() {
    this.indexPage = 1;
  }

  nextPage() {
    if (this.indexPage > 2) {
      return
    }
    this.indexPage++;
  }

  returnPage() {
    if (this.indexPage < 1) {
      return
    }
    this.indexPage--;
  }

  cancel() {
    this.indexPage = 1;
    this.orderProducts = [];
    this.data_order = null;
    window.location.reload();
  }

  finish() {
    this.indexPage = 1;
    this.orderProducts = [];
    this.data_order = null;
    window.location.reload();
  }

  confirm() {
    let option = confirm('Confirmar pedido');
    if (option) {
      this.client.postRequest(`${environment.url_logic}/order/create`, this.data_order, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.finish();
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    } else {
      this.cancel();
    }
  }

  increaseProduct(product: any) {
    if (product.product_quantity < 0 || product.stock_product == 0) {
      return;
    }
    product.product_quantity++;
    product.stock_product--;
  }

  decreaseProduct(product: any) {
    if (product.product_quantity == 0) {
      return;
    }
    product.product_quantity--;
    product.stock_product++;
  }

  addProduct(product: any) {
    let pos = this.orderProducts.findIndex(p => p.id_product === product.id_product);
    if (pos !== -1) {
      this.orderProducts[pos].product_quantity += product.product_quantity;
    } else {
      this.orderProducts.push({ ...product });
    }
    this.total += product.product_quantity * product.purchase_price_product;
    product.product_quantity = 0;
    product.add_product = true;
  }

  removeProduct(product: any) {
    let pos = this.orderProducts.findIndex(p => p.id_product === product.id_product);
    this.total -= this.orderProducts[pos].product_quantity * this.orderProducts[pos].purchase_price_product;
    product.stock_product += this.orderProducts[pos].product_quantity;
    this.orderProducts.splice(pos, 1);
    product.add_product = false;
  }

}

