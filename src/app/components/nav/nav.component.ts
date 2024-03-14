import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared/shared.service';
import { ClientService } from 'src/app/services/client/client.service';

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

  constructor(public auth: AuthService, private router: Router, private fb: FormBuilder, private client: ClientService, private shared: SharedService) {
    this.form = this.fb.group({
      searchType: ['products'],
      searchTerm: [''],
    });
    this.form_location = this.fb.group({
      department: ['Quindío'],
      city: ['Armenia']
    });
    this.client.getRequest(`https://api-colombia.com/api/v1/Department/25/cities`, undefined, undefined).subscribe({
      next: (response) => {
        this.cities = response;
        console.log(this.cities);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('complete'),
    });

  }

  ngOnInit(): void {
    this.client.getRequest(`https://api-colombia.com/api/v1/Department`, undefined, undefined).subscribe({
      next: (response) => {
        this.departments = response;
        console.log(this.departments);
      },
      error: (error) => {
        console.log(error);
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

  deleteData_profile() {
    let id = this.auth.getId();
    this.router.navigate(['deleteData-profile/', id])
  }

  selected_department(nameDepartment: any) {

    let department = this.departments.find(department => department.name === nameDepartment);

    this.client.getRequest(`https://api-colombia.com/api/v1/Department/${department.id}/cities`, undefined, undefined).subscribe({
      next: (response) => {
        this.cities = response;
        console.log(this.cities);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('complete'),
    });

    this.form.patchValue({
      city: ''
    });
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
}