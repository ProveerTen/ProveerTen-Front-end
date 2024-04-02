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
  products: any[] = [];
  isOffline: any;
  data_location: any;

  product_modal: any;
  publication_modal: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private shared: SharedService) {
    auth.isLoggedIn().subscribe(value => {
      this.isOffline = value;
    });
  }

  // date_Hour_Pub(datePub: any) {
  //   const format = (date:any, locale:any, options:any) =>
  //     new Intl.DateTimeFormat(locale, options).format(date);
  //   return format(datePub, 'es', { dateStyle: 'medium', timeStyle: "long", timeZone: 'America/Bogota', hour12: true }).slice(0,-5) 
  // }

  ngOnInit(): void {
    if (!(this.isOffline)) {
      this.shared.department_and_city.subscribe(value => {
        this.data_location = value;
        this.client.postRequest(`${environment.url_logic}/view/products/location`, this.data_location, undefined, undefined).subscribe({
          next: (response: any) => {
            this.products = response.categoriesByProducts;
            //console.log(this.products);

          },
          error: (error) => {
            console.log(error.error.Status);
          },
          complete: () => console.log('complete'),
        });
      });
    } else {
      this.client.postRequest(`${environment.url_logic}/view/products`, { document_grocer: this.auth.getId() }, undefined, undefined).subscribe({
        next: (response: any) => {
          this.products = response.categoriesByProducts;

          if (this.products.length == 0) {
            console.log('No hay productos por mostrar');
          }
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    }
    if (this.isOffline) {
      this.client.postRequest(`${environment.url_logic}/publication/view`, { document_grocer: this.auth.getId() }, undefined, undefined).subscribe({
        next: (response: any) => {
          // console.log(response);

          this.publicaciones = response.publications
          //console.log(this.publicaciones);


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
    } else {
      this.shared.department_and_city.subscribe(value => {
        let data_publication = value
        this.client.postRequest(`${environment.url_logic}/publication/view/location`, data_publication, undefined, undefined).subscribe({
          next: (response: any) => {
            // console.log(response);

            this.publicaciones = response.publications
            //console.log(this.publicaciones);


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
      })
    }

  }

  viewProductModal(id: string) {
    this.product_modal = id;
  }

  viewPublicationModal(id: string) {
    this.publication_modal = id;
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


  viewPriceProducts() {
    this.router.navigate(['view/price/products']);
  }

  createOrder() {
    this.router.navigate(['create/order'])
  }

  viewOrders() {
    this.router.navigate(['view/orders'])
  }

  isVideo(url: string): boolean {
    return url.endsWith('.mp4'); // Cambia la condición según el formato del video
  }

  viewProduct(id: string) {
    this.router.navigate(['view/product/', id]);
  }

  viewCategory(name_category: string) {
    this.shared.changeHomeCategory(name_category);
    this.shared.type.next('products')
    this.router.navigate(['search', 'products']);
  }
}

