import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit, OnChanges {
  loading: boolean = false;
  data: any = null;
  id!: string;
  availability_product:string

  @Input() productModal: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.fetchProductDetails();
    }
  }

  ngOnChanges(): void {
    console.log("modal");
    
    if (this.productModal) {
      this.id = this.productModal;
      this.fetchProductDetails();
    }
  }

  fetchProductDetails() {
    this.loading = true;
    this.data = null;
    this.client.postRequest(`${environment.url_logic}/product/detail`, { id_product: this.id }, undefined, undefined).subscribe({
      next: (response: any) => {
        console.log(response);
        this.loading = false;
        this.data = response.categoriesByProducts[0];
        console.log(this.data);

        if (this.data.stock_product == "0") {
          this.availability_product = "No Disponible"
        } else {
          this.availability_product ="Disponible"
        }
      },
      error: (error) => {
        this.loading = false;
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  viewCompany(id: string) {
    this.router.navigate(['profile/company', id]);
  }
}
