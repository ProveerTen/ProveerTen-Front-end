import { Component, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-detail-product',
  templateUrl: './view-detail-product.component.html',
  styleUrls: ['./view-detail-product.component.css']
})
export class ViewDetailProductComponent {

  @Input() id_product: any;
  @Input() data_company: any
  @Output() customEvent = new EventEmitter<boolean>();
  product: any;
  showModal: any = true;

  constructor(public auth: AuthService, private router: Router, private client: ClientService) { }

  ngOnInit() {

    this.client.postRequest(`${environment.url_logic}/product/detail`, { id_product: this.id_product }, undefined, undefined).subscribe({
      next: (response: any) => {
        this.product = response.categoriesByProducts[0];

        console.log("product individual", this.product);
        console.log("q", this.product.categories.length > 0);
        
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log("Complete");
      }
    })
  }

  viewProfile(id: string) {
    this.router.navigate(['profile/company', id])
  }

  hideModalInfo() {
    this.showModal = false
    this.customEvent.emit(false)
  }

}


// constructor(public auth:AuthService, private router:Router, private client:ClientService) {}

// ngOnInit() {

//   this.client.getRequest(`${environment.url_logic}/view/products`, undefined, undefined).subscribe({
//     next: (response:any) => {
//       console.log("Response", response.categoriesByProducts);
//       this.products = response.categoriesByProducts;
//     },
//     error: (error:any) => {
//       console.log(error);
//     },
//     complete: () => {
//       console.log("Complete");
//     }
//   })
// }

// }
