import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import product from '../../../interfaces/product';

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

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute) { }

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
  }

  filterCompanies() {
    this.filteredCompanies = this.companies.filter(company =>
      company.name_company.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updateSelection(company: any) {
    this.companies.forEach(c => {
      if (c !== company) {
        c.isSelected = false;
      }
    });

    this.selectedCompany = this.companies.find(c => c.isSelected);

    this.showProducts();
  }

  viewCompany() {
    console.log(this.selectedCompany);
  }

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
}

