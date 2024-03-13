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

  id!: string;
  description: any;
  showModal: any = false;
  companyInfo: any;

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
    this.client.postRequest(`${environment.url_logic}/view/companies`, { document_grocer: this.auth.getId() }, undefined, undefined).subscribe({
      next: (response: any) => {
        this.companies = response.categoriesByCompanies;;
        console.log("COMPANIES", this.companies);

        this.companies.forEach(company => {
          company.showMore = false
        });

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
        console.log(error.error);
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

  showModalInfo(i: number) {
    this.showModal = true
    this.companyInfo = this.companies[i]
    console.log("compa info", this.companyInfo);
  }
  hideModalInfo() {
    this.showModal = false
  }

  toggleShowMore(company: any) {
    console.log("toggle show more");

    company.showMore = !company.showMore;
    event.stopPropagation();
    // if (company.showMore) {
    //   // Si showMore es true, muestra el mensaje completo
    //   company.description_company = company?.description_company;
    // } else {
    //   // Si showMore es false, muestra solo los primeros 20 caracteres
    //   company?.description_company.slice(0, 20) + '...';
    // }
  }
  // company.description_company = company.description_company.slice(0,21)
  // }
}
