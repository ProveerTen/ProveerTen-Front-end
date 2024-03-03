import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import product from '../../../interfaces/product';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent {

  companies: any[];
  products: any[];
  filteredCompanies: any[];
  selectedCompany: any;
  searchTerm: string = '';
  indexPage: number = 1;
  isData = true;

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
        this.showProducts();
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
  }

  // viewCompany() {
  //   console.log(this.selectedCompany);
  // }

  showProducts() {
    if (this.selectedCompany) {
      this.client.postRequest(`${environment.url_logic}/order/products`, { "nit_company": this.selectedCompany.nit_company }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.products = response.products;
          console.log(this.products);

        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    }
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
  }
}

