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

  constructor(public auth:AuthService, private router:Router, private client:ClientService) {}

  ngOnInit() {

    this.client.getRequest(`${environment.url_logic}/view/products`, undefined, undefined).subscribe({
      next: (response:any) => {
        console.log("Response", response.categoriesByProducts);    
        this.products = response.categoriesByProducts;    
      },
      error: (error:any) => {
        console.log(error);        
      },
      complete: () => {
        console.log("Complete");        
      }
    })
  }

}
