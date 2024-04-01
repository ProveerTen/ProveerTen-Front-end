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
  loading : boolean = false
  data: any;
  id!: string;
  availability:string;
  p:any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute) { }

  ngOnInit(): void {

      this.loading = true

      setTimeout (()=>{


    this.id = this.routerActivate.snapshot.params['id'];
    console.log(this.id);

    this.client.postRequest(`${environment.url_logic}/product/detail`, { id_product: this.id }, undefined, undefined).subscribe({
      next: (response: any) => {
        console.log(response);
        this.loading = false
        this.data = response.categoriesByProducts[0];
        console.log(this.data);

        this.p = document.querySelector('.disponibilidad');
        this.availability = this.data.availability_product;

        if (this.availability == "Disponible"){

          this.p.classList.add('disponible');
        }
        else{
          this.p.classList.add('no-disponible');
        }


      },
      error: (error) => {
        this.loading = false
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  },400)


  }


  disponible(){



  }

  viewCompany(id: string) {
    this.router.navigate(['profile/company', id])
  }
}
