import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {

  data: any;
  id!: string;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.routerActivate.snapshot.params['id'];
    console.log(this.id);

    this.client.postRequest(`${environment.url_logic}/product/detail`, { id_product: this.id }, undefined, undefined).subscribe({
      next: (response: any) => {
        console.log(response);
        this.data = response.categoriesByProducts[0];
        console.log(this.data);

      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  viewCompany(id: string) {
    this.router.navigate(['profile/company', id])
  }
}
