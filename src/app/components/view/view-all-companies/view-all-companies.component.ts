import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedService } from '../../../services/shared/shared.service';

@Component({
  selector: 'app-view-all-companies',
  templateUrl: './view-all-companies.component.html',
  styleUrls: ['./view-all-companies.component.css']
})
export class ViewAllCompaniesComponent {

  companies: any; // Cambia 'any' por el tipo de dato Company
  value: string;
  filter: any[] = [];

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute, private shared: SharedService) { }

  ngOnInit() {
    this.getCompanies();

    this.shared.searchTerm.subscribe(value => {
      this.value = value;
      if (this.value !== "") {
        console.log(this.value);
        this.getCompaniesByName();
      } else {
        this.companies = this.filter; // Restablecer la lista de compañías si el término de búsqueda está vacío
      }
    });
  }

  getCompanies() {
    this.client.getRequest(`${environment.url_logic}/profile/allCompaniesUserCero`, undefined, undefined).subscribe({
      next: (response: any) => {
        this.companies = response.data;
        this.filter = this.companies.slice();
        if (this.value !== "") {
          this.getCompaniesByName();
        } else {
          this.companies = this.filter; // Restablecer la lista de compañías si el término de búsqueda está vacío
        }
        if (this.companies.length == 0) {
          console.log('No hay compañías por mostrar');
        }
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  getCompaniesByName() {
    if (this.value !== "") {
      this.companies = this.filter.filter((company: any) => {
        return (
          this.removeAccents(company.name_company).toLowerCase().includes(this.removeAccents(this.value).toLowerCase()) ||
          this.removeAccents(company.description_company).toLowerCase().includes(this.removeAccents(this.value).toLowerCase())
        );
      });
    }
  }

  viewCompany(id: string) {
    this.router.navigate(['profile/company/', id]);
  }

  removeAccents(text: string): string {
    if (!text) {
      return '';
    }
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  /*
  ngOnDestroy() {
    this.shared.searchTerm.unsubscribe();
  }
  */
}
