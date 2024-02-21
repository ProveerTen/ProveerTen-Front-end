import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClientService } from 'src/app/services/client/client.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css']
})
export class ViewAllProductsComponent {

  products:any;
  companies:any;
  newDataProduct: any[] = [];
  finish: any = false;
  estado:boolean = false;
  id_product_:string;
  data_company:any

  constructor(public auth:AuthService, private router:Router, private client:ClientService) {}

  ngOnInit() {

    this.client.getRequest(`${environment.url_logic}/view/products`, undefined, undefined).subscribe({
      next: (response:any) => {
        console.log("products", response.categoriesByProducts);    
        this.products = response.categoriesByProducts;    
      },
      error: (error:any) => {
        console.log(error);        
      },
      complete: () => {
        // console.log("Complete");   

        this.client.getRequest(`${environment.url_logic}/profile/allCompaniesUserCero`, undefined).subscribe({
          next: (response: any) => {
            console.log("companies", response.data);
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
    })
  }

  newData() {
    for (let i = 0; i < this.products.length; i++) {
      const nit_publicacion = this.products[i].fk_product_nit_company
      // console.log("this.publicaciones[i].nit_company", nit_publicacion);

      for (let j = 0; j < this.companies.length; j++) {
        const nit_company = this.companies[j].nit_company

        if (nit_publicacion === nit_company) {
          this.newDataProduct.push({
            name_company: this.companies[j].name_company,
            profile_photo_company: this.companies[j].profile_photo_company
          })
          // console.log("new data", this.newDataPub);
          break
        }
      }
      this.finish = i === this.products.length - 1 ? true : false;
    }
    console.log("new data", this.newDataProduct); 
  }
  
  viewProfile(id: string) {
    this.router.navigate(['profile/company', id])
  }

  viewInfoProduct(id:string, data_company:any) {
    this.estado = true
    this.id_product_ = id
    this.data_company = data_company
    console.log("id desde el padre", this.id_product_);
    console.log("estado padre", this.estado);
    
  }
  handleEvent(value: boolean) {
    this.estado = value;
  }
}
