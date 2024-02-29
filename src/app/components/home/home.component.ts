import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  publicaciones: any[] = [];
  companies: any[] = []
  newDataPub: any[] = [];
  finish: any = false;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private shared: SharedService) { }

  ngOnInit(): void {

    this.client.getRequest(`${environment.url_logic}/publication/view`, undefined).subscribe({
      next: (response: any) => {
        // console.log(response);

        this.publicaciones = response.publications

        for (let k = 0; k < this.publicaciones.length; k++) {
          const element = this.publicaciones[k].date;
          this.publicaciones[k].date = new Date(element)
        }

        this.publicaciones = this.orderByDate(this.publicaciones)
        // console.log("despues deordenar", this.publicaciones);

      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {

        this.client.getRequest(`${environment.url_logic}/profile/allCompaniesUserCero`, undefined).subscribe({
          next: (response: any) => {
            // console.log(response.data);
            this.companies = response.data
          },
          error: (error: any) => {
            console.log(error);
          },
          complete: () => {
            console.log("complete");
            this.newData();
          }
        });
      }
    });
  }

  orderByDate(publications: any[]) {
    return publications.sort((a, b) => b.date - a.date);
  }

  newData() {
    for (let i = 0; i < this.publicaciones.length; i++) {
      const nit_publicacion = this.publicaciones[i].nit_company
      // console.log("this.publicaciones[i].nit_company", nit_publicacion);
      for (let j = 0; j < this.companies.length; j++) {
        const nit_company = this.companies[j].nit_company
        if (nit_publicacion === nit_company) {
          this.newDataPub.push({
            name_company: this.companies[j].name_company,
            profile_photo: this.companies[j].profile_photo_company
          })
          // console.log("new data", this.newDataPub);
          break
        }
      }
      this.finish = i === this.publicaciones.length - 1 ? true : false;
    }
  }

  viewProfile(id: string) {
    this.router.navigate(['profile/company', id])
  }

  viewCompanies() {
    // this.router.navigate(['viewAllcompanies'])
    this.router.navigate(['search', 'companies'])
    this.shared.changeSearchOption('companies');
  }
  viewProducts() {
    // this.router.navigate(['viewAllProducts'])
    this.router.navigate(['search', 'products'])
    this.shared.changeSearchOption('products');
  }

  isVideo(url: string): boolean {
    return url.endsWith('.mp4'); // Cambia la condición según el formato del video
  }
}

