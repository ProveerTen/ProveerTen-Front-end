import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-suggested-product-prices',
  templateUrl: './suggested-product-prices.component.html',
  styleUrls: ['./suggested-product-prices.component.css']
})
export class SuggestedProductPricesComponent {

  products: any;
  suggestedPrice: number;

  constructor(
    private client: ClientService,
    public auth: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.client.getRequest(
      `${environment.url_logic}/view/price/products`,
      undefined,
      { "Authorization": `Bearer ${this.auth.getToken()}` }
    ).subscribe({
      next: (response: any) => {
        this.products = response.categoriesByProductsPrice;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  viewProduct(id: string) {
    this.router.navigate(['view/product/', id]);
  }

  suggestPrice() {
    console.log(this.suggestedPrice);
    
  }
}
