import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.css']
})
export class ManageProvidersComponent {
  loading: boolean = false
  providers: any;
  modalProfile: string
  searchTerm: any = "";
  cities: any = [];
  selectedCity: any = "";
  selectedDepartment: any = "";
  departments: any;
  department: any;
  filter: any;
  constructor(private client: ClientService, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true
    setTimeout(() => {
      let id = this.auth.getId();
      this.client.postRequest(`${environment.url_logic}/order/providers`, { nit_company: id }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.loading = false
          console.log(response);
          this.providers = response.providers;
          this.filter = this.providers.slice();
        },
        error: (error) => {
          this.loading = false
          console.log(error.error.Status);
          this.router.navigate(['404']);
        },
        complete: () => console.log('complete'),
      });
    }, 400)

    this.client.getRequest(`https://api-colombia.com/api/v1/Department`, undefined, undefined).subscribe({
      next: (response) => {
        this.departments = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('complete'),
    });

  }

  viewProfile(id: string) {
    this.router.navigate(['profile/provider', id]);
  }

  updateProvider(id: string) {
    this.router.navigate(['update/provider', id]);
  }
  createProvider() {
    this.router.navigate(['create/provider']);
  }

  goBack() {
    this.router.navigate(['panel']);
  }

  viewModalProfile(id: string) {
    console.log("eee", id);
    this.modalProfile = id
  }

  selected_department(nameDepartment: any) {
    if (nameDepartment !== "") {
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
    }
    this.cities = "";
    this.selectedCity = '';
  }

  filterProviders() {
    if (this.searchTerm !== "" && this.selectedDepartment === "" && this.selectedCity === "") {
      this.providers = this.filter.filter(provider => {
        return (
          this.removeAccents(provider.name_provider).toLowerCase().includes(this.removeAccents(this.searchTerm).toLowerCase()) ||
          this.removeAccents(provider.last_name_provider).toLowerCase().includes(this.removeAccents(this.searchTerm).toLowerCase())
        )
      });
    } else if (this.searchTerm !== "" && this.selectedDepartment !== "" && this.selectedCity === "") {
      console.log(this.selectedDepartment);
      this.providers = this.filter.filter(provider => {
        return (
          (
            this.removeAccents(provider.name_provider).toLowerCase().includes(this.removeAccents(this.searchTerm).toLowerCase()) ||
            this.removeAccents(provider.last_name_provider).toLowerCase().includes(this.removeAccents(this.searchTerm).toLowerCase())
          )
          && provider.department.includes(this.selectedDepartment)
        )
      });
    } else if (this.searchTerm === "" && this.selectedDepartment !== "" && this.selectedCity === "") {
      this.providers = this.filter.filter(provider => {
        return (
         provider.department.includes(this.selectedDepartment)
        )
      });
    } else if (this.searchTerm !== "" && this.selectedDepartment !== "" && this.selectedCity !== "") {
      this.providers = this.filter.filter(provider => {
        return (
          (
            this.removeAccents(provider.name_provider).toLowerCase().includes(this.removeAccents(this.searchTerm).toLowerCase()) ||
            this.removeAccents(provider.last_name_provider).toLowerCase().includes(this.removeAccents(this.searchTerm).toLowerCase())
          )
          && provider.department.includes(this.selectedDepartment) && provider.city_provider.includes(this.selectedCity)
        )
      });
    } else if (this.searchTerm === "" && this.selectedDepartment !== "" && this.selectedCity !== "") {
      console.log(this.selectedDepartment);
      this.providers = this.filter.filter(provider => {
        return (
          provider.department.includes(this.selectedDepartment) && provider.city_provider.includes(this.selectedCity)
        )
      });
    } 

    if (this.searchTerm === "" && this.selectedDepartment === "" && this.selectedCity === "") {
      this.providers = this.filter;
    }
  }

  removeAccents(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
}
