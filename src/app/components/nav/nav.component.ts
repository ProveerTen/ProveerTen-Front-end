import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared/shared.service';
import { ClientService } from 'src/app/services/client/client.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  form: FormGroup;
  form_location: FormGroup;
  searchType: any = "products";
  searchTerm: string;
  departments: any;
  cities: any;
  id_department: any;
  department: any;
  city: any;
  id: any;

  data: any;
  is_online: any;

  data_user: any;
  is_grocer: any;

  city_local: any;
  department_local: any;

  constructor(public auth: AuthService, private router: Router, private fb: FormBuilder, private client: ClientService, private shared: SharedService) {

    this.form = this.fb.group({
      searchType: ['products'],
      searchTerm: [''],
    });

    this.form_location = this.fb.group({
      department: ['Quindío', Validators.required],
      city: ['Armenia', Validators.required]
    });

    if ((localStorage.getItem('data_location_department_name') && (localStorage.getItem('data_location_city'))) &&
      (localStorage.getItem('data_location_department_name') !== 'Quindío' &&
        localStorage.getItem('data_location_city') !== 'Armenia')) {
      let name_department = localStorage.getItem('data_location_department_name');
      this.department = name_department;
      this.city = localStorage.getItem('data_location_city');
      this.id = localStorage.getItem('data_location_department_id');
      this.form_location.patchValue({
        department: this.department,
        city: this.city
      });
    } else {
      this.department = 'Quindío'
      this.city = 'Armenia';
      this.id = 25;
      localStorage.setItem('data_location_department_name', this.department);
      localStorage.setItem('data_location_city', this.city);
      // this.form_location.patchValue({
      //   department: 'Quindío',
      //   city: 'Armenia'
      // });
      this.shared.changeDepartmentCity({ deparment: this.department, city: this.city });
    }

    this.client.getRequest(`https://api-colombia.com/api/v1/Department/${this.id}/cities`, undefined, undefined).subscribe({
      next: (response) => {
        this.cities = response;
        //console.log(this.cities);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('complete'),
    });

  }

  ngOnInit(): void {

    this.auth.isLoggedIn().subscribe(value => {
      this.is_online = value;
      if (this.is_online) {
        if (this.auth.getRole() === "provider") {
          this.getDataProvider();
        }
      }
    });

    this.auth.isGrocer().subscribe(value => {
      this.is_grocer = value;
      if (this.is_grocer) {
        this.client
          .getRequest(
            `${environment.url_logic}/profile/${this.auth.getRole()}`,
            undefined,
            { Authorization: `Bearer ${this.auth.getToken()}` }
          )
          .subscribe({
            next: (response: any) => {
              this.data_user = response.data;
              console.log(this.data_user);
            },
            error: (error) => {

              console.log(error.error.Status);
            },
            complete: () => {
              console.log('complete');
            },
          });
      }
    });

    this.client.getRequest(`https://api-colombia.com/api/v1/Department`, undefined, undefined).subscribe({
      next: (response) => {
        this.departments = response;
        //console.log(this.departments);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('complete'),
    });
  }

  getDataProvider() {
    this.client.getRequest(`${environment.url_logic}/profile/${this.auth.getRole()}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.data = response.data;
        console.log(this.data);
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  view_profile() {
    this.router.navigate(['profile']);
  }

  update_profile() {
    let id = this.auth.getId();
    this.router.navigate(['update-profile/', id])
  }

  allCompanies() {
    this.router.navigate(['viewAllcompanies/'])
  }

  viewPriceProducts() {
    this.router.navigate(['view/price/products']);
  }

  createOrder() {
    this.router.navigate(['create/order'])
  }

  viewOrders() {
    this.router.navigate(['view/orders'])
  }

  deleteData_profile() {
    let id = this.auth.getId();
    this.router.navigate(['deleteData-profile/', id])
  }

  searchProducts() {
    this.router.navigate(['search/', 'products'])
    this.shared.type.next('products')
  }

  searchCompanies() {
    this.router.navigate(['search/', 'companies'])
    this.shared.type.next('companies')
  }

  selected_department(nameDepartment: any) {
    console.log(nameDepartment);

    this.department = this.departments.find(department => department.name === nameDepartment);
    console.log(this.department);

    this.client.getRequest(`https://api-colombia.com/api/v1/Department/${this.department.id}/cities`, undefined, undefined).subscribe({
      next: (response) => {
        this.cities = response;
        console.log(this.cities);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('Complete'),
    });

    this.form_location.patchValue({
      city: ''
    });
  }

  filter_location() {
    if (this.form_location.valid) {
      this.department = this.departments.find(department => department.name === this.form_location.value.department);
      let department_name = this.department.name;
      let department_id = this.department.id;
      localStorage.setItem('data_location_department_name', department_name);
      localStorage.setItem('data_location_department_id', department_id);
      localStorage.setItem('data_location_city', this.form_location.value.city);
      this.shared.changeDepartmentCity({ deparment: this.form_location.value.department, city: this.form_location.value.city });

    }
  }

  search(): void {
    this.searchType = this.form.get('searchType').value;
    this.searchTerm = this.form.get('searchTerm').value;
    if (this.searchTerm === "") {
      this.router.navigate(['search', this.searchType]);
      this.shared.type.next(this.searchType)
    } else {
      this.router.navigate(['search', this.searchType, this.searchTerm]);
      this.shared.type.next(this.searchType)
      this.shared.searchTerm.next(this.searchTerm)
    }
  }

  onSearchInput(): void {
    const searchTerm = this.form.get('searchTerm').value;
    this.shared.searchTerm.next(searchTerm);
  }

  onSearchTypeChange(newValue: string) {
    this.shared.type.next(newValue)
    const searchTerm = this.form.get('searchTerm').value;
    this.shared.searchTerm.next(searchTerm);
  }

  manageProviders() {
    this.router.navigate(['manage/providers']);
  }

  managePublications() {
    this.router.navigate(['manage/publications']);
  }

  manageProducts() {
    this.router.navigate(['manage/products']);
  }

  viewCompany(id: string) {
    console.log(id);

    this.router.navigate(['profile/company', id]);
  }

  manageOrders() {
    this.router.navigate(['manage/orders']);
  }

  viewGrocers() {
    this.router.navigate(['view/grocers']);
  }

  viewProducts(id: string) {
    this.router.navigate(['view/products/', id]);
  }
}