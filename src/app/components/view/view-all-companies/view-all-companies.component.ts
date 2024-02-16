import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-view-all-companies',
  templateUrl: './view-all-companies.component.html',
  styleUrls: ['./view-all-companies.component.css']
})
export class ViewAllCompaniesComponent {

  id!: string;
  companies: any;
  description:any;
  showModal:any = false;
  companyInfo:any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('Hola');

    // this.id = this.routerActivate.snapshot.params['id'];
    this.client.getRequest(`${environment.url_logic}/view/companies`, undefined, undefined).subscribe({
      next: (response: any) => {
        this.companies = response.categoriesByCompanies;

        this.companies.forEach(company => {
          company.showMore = false 
        });

        console.log(response.categoriesByCompanies);
        console.log(this.companies);        
      },
      error: (error) => {
        console.log(error.error);
        // this.router.navigate(['404']);
      },
      complete: () => console.log('complete'),
    });
  }

  viewProfile(id: string) {
    event.stopPropagation();
    this.router.navigate(['profile/company', id])
  }

  showModalInfo(id: number) {
    this.showModal = true
    this.companyInfo = this.companies[id]
    console.log("compa info", this.companyInfo);
    
    // this.router.navigate(['profile/company', id])
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
