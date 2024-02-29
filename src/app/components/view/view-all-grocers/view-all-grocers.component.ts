import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-view-all-grocers',
  templateUrl: './view-all-grocers.component.html',
  styleUrls: ['./view-all-grocers.component.css']
})
export class ViewAllGrocersComponent {
  // id!: string;
  // products: any;

  // constructor(private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute) { }

  // ngOnInit(): void {
  //   console.log('Hola');

  //   // this.id = this.routerActivate.snapshot.params['id'];
  //   this.client.getRequest(`${environment.url_logic}/view/companies`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
  //     next: (response: any) => {
  //       this.products = response.categoriesByCompanies;
  //       console.log(response.categoriesByCompanies);
  //       console.log(response);
        
  //     },
  //     error: (error) => {
  //       console.log(error.error);
  //       // this.router.navigate(['404']);
  //     },
  //     complete: () => console.log('complete'),
  //   });
  // }

  // viewProfile(id: string) {
  //   console.log("fff", id);
    
  //   this.router.navigate(['profile/company', id])
  // }
}

