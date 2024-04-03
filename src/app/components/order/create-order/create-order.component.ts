import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/services/shared/shared.service';
import { MessageService } from 'primeng/api';

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
  selected_provider: boolean = false;
  disabled_checkbox: boolean = false;
  product_modal:string = "";

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute, private shared: SharedService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.client.getRequest(`${environment.url_logic}/order/companies`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.companies = response.companies.map(company => ({ ...company, isSelected: false }));
        console.log(this.companies);
        this.filteredCompanies = [...this.companies];
        console.log(this.filteredCompanies);
        this.shared.companyOrder.subscribe((company: any) => {
          if (company !== null) {
            this.updateSelection(company.nit_company);
          }
        })
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });

  }

  filterCompanies() {
    this.filteredCompanies = this.companies.filter(company =>
      company.name_company.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }



  updateSelection(nit_company: any) {

    this.isData = false;
    if (this.companies) {
      if (this.orderProducts.length === 0) {
        this.companies.forEach(company => {
          if (company.nit_company === nit_company) {
            company.isSelected = true;
            this.selectedCompany = nit_company;
          } else {
            company.isSelected = false;
          }
        });
      } else {
        alert('Para realizar un pedido con otra empresa, por favor termine de realizar el pedido actual o cáncelelo');
      }
    }


    this.showProducts();
    this.getProviders();
  }


  showProducts() {
    if (this.selectedCompany) {
      this.client.postRequest(`${environment.url_logic}/order/products`, { "nit_company": this.selectedCompany }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log("EEE", response);
        
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
      console.log(this.selectedCompany);

      this.client.postRequest(`${environment.url_logic}/order/providers/location`, { companyId: this.selectedCompany, grocerId: this.auth.getId() }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
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
    this.selected_provider = true;
  }

  editOrder() {
    this.indexPage = 1;
  }

  nextPage() {
    if (this.indexPage > 2) {
      return
    }
    if (this.indexPage === 1 && this.orderProducts.length > 0) {
      this.indexPage++;
    } else if (this.indexPage === 2 && this.selected_provider === true) {
      this.indexPage++;
    } else {
      alert('Por favor ingrese los campos requeridos')
    }
  }

  returnPage() {
    if (this.indexPage < 1) {
      return
    }
    this.indexPage--;
  }

  cancel() {
    let option = confirm('¿Cancelar la realización del pedido?');
    if (option) {
      this.indexPage = 1;
      this.orderProducts = [];
      this.data_order = null;
      this.total = 0;
      this.disabled_checkbox = false;
      this.products = null;
      this.isData = true;
      this.companies.forEach(c => {
        c.isSelected = false;
      })
    }
  }

  finish() {
    this.indexPage = 1;
    this.orderProducts = [];
    this.data_order = null;
    this.total = 0;
    this.disabled_checkbox = false;
    this.products.forEach(product => {
      product.add_product = false;
    });
  }

  confirm() {
    let option = confirm('Confirmar pedido');
    if (option) {
      this.client.postRequest(`${environment.url_logic}/order/create`, this.data_order, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: '¡Pedido creado exitosamente!' });
          this.finish();
        },
        error: (error) => {
          console.log(error.error.Status);
          this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error en la creación del pedido!' });
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
    this.disabled_checkbox = true;
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
    if (this.orderProducts.length === 0) {
      this.disabled_checkbox = false;
    }
  }

  viewProductModal(id:string) {
    this.product_modal = id
  }
}

