import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedService } from '../../../services/shared/shared.service';
import company from '../../../interfaces/company';

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
  category: string;
  sub_category: string;
  companyInfo: any;
  isOffline: any;
  data_location: any;

  company_modal: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute, private shared: SharedService) {
    auth.isLoggedIn().subscribe(value => {
      this.isOffline = value;
    });
  }

  ngOnInit() {
    this.getCompanies();

    this.shared.searchTerm.subscribe(value => {
      this.value = value;
      this.handleCompanyFiltering();
    });

    this.shared.category.subscribe(value => {
      this.category = value;
      this.handleCompanyFiltering();
    });

    this.shared.sub_category.subscribe(value => {
      this.sub_category = value;
      this.handleCompanyFiltering();
    });
  }

  handleCompanyFiltering() {
    if (this.value !== "" && this.category === "" && this.sub_category === "") {
      this.getCompaniesByName();
    } else if (this.value !== "" && this.category !== "" && this.sub_category === "") {
      this.getCompaniesByCategoriesAndName();
    } else if (this.value !== "" && this.category !== "" && this.sub_category !== "") {
      this.getCompaniesByCategoriesAndSubCategoriesAndName();
    } else if (this.value === "" && this.category === "" && this.sub_category === "") {
      this.companies = this.filter;
    } else if (this.value === "" && this.category !== "" && this.sub_category === "") {
      this.getCompaniesByCategories();
    } else if (this.value === "" && this.category !== "" && this.sub_category !== "") {
      this.getCompaniesByCategoriesAndSubCategories();
    }
  }

  getCompanies() {
    if (!(this.isOffline)) {
      this.shared.department_and_city.subscribe(value => {
        this.data_location = value;
        this.client.postRequest(`${environment.url_logic}/view/companies/location`, this.data_location, undefined, undefined).subscribe({
          next: (response: any) => {
            this.companies = response.categoriesByCompanies;
            console.log(this.companies);
            this.companies.forEach(company => {
              company.showMore = false
            });
            this.filter = this.companies.slice();
            this.handleCompanyFiltering()

            if (this.companies.length == 0) {
              console.log('No hay compañías por mostrar');
            }
          },
          error: (error) => {
            console.log(error.error);
          },
          complete: () => console.log('complete'),
        });
      });
    } else {
      this.client.postRequest(`${environment.url_logic}/view/companies`, { document_grocer: this.auth.getId() }, undefined, undefined).subscribe({
        next: (response: any) => {
          this.companies = response.categoriesByCompanies;
          console.log(this.companies);
          this.companies.forEach(company => {
            company.showMore = false
          });
          this.filter = this.companies.slice();
          this.handleCompanyFiltering()

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

  getCompaniesByCategoriesAndName() {
    this.companies = this.filter.filter((company: any) => {
      const nameMatch = this.removeAccents(company.name_company).toLowerCase().includes(this.removeAccents(this.value).toLowerCase());
      const descriptionMatch = this.removeAccents(company.description_company).toLowerCase().includes(this.removeAccents(this.value).toLowerCase());
      const hasMatchingCategory = company.categories.some((category: any) => {
        return category.fk_product_category_name_category === this.category;
      });

      return (nameMatch || descriptionMatch) && hasMatchingCategory;
    });
  }

  getCompaniesByCategories() {
    this.companies = this.filter.filter((company: any) => {
      // Verificar si la compañía tiene productos en la categoría seleccionada
      const hasMatchingCategory = company.categories.some((category: any) => {
        return category.fk_product_category_name_category === this.category;
      });

      return hasMatchingCategory;
    });
  }

  getCompaniesByCategoriesAndSubCategories() {
    this.companies = this.filter.filter((company: any) => {
      const hasMatchingCategory = company.categories.some((category: any) => {
        return category.fk_product_category_name_category === this.category;
      });

      const hasMatchingSubCategory = company.subcategories.some((subcategory: any) => {
        return subcategory.fk_subcategory_name_subcategory === this.sub_category;
      });

      return hasMatchingCategory && hasMatchingSubCategory;
    });
  }


  getCompaniesByCategoriesAndSubCategoriesAndName() {
    this.companies = this.filter.filter((company: any) => {
      const nameMatch = this.removeAccents(company.name_company).toLowerCase().includes(this.removeAccents(this.value).toLowerCase());
      const descriptionMatch = this.removeAccents(company.description_company).toLowerCase().includes(this.removeAccents(this.value).toLowerCase());


      const hasMatchingCategory = company.categories.some((category: any) => {
        return category.fk_product_category_name_category === this.category;
      });

      const hasMatchingSubCategory = company.subcategories.some((subcategory: any) => {
        return subcategory.fk_subcategory_name_subcategory === this.sub_category;
      });

      return (nameMatch || descriptionMatch) && hasMatchingCategory && hasMatchingSubCategory;
    });
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

  showModalInfo(i: number) {
    this.showModal = true
    this.companyInfo = this.companies[i]
    console.log("compa info", this.companyInfo);
  }

  hideModalInfo() {
    this.showModal = false
  }

  viewCompanyModal(id: string) {
    this.company_modal = id;
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
