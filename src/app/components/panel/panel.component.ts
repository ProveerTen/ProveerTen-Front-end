import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
// import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  // public chart: Chart;
  data: any;
  id_company: any;
  modalProfileCompany:string;

  constructor(private client: ClientService, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.client.getRequest(`${environment.url_logic}/profile/${this.auth.getRole()}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.data = response.data;
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });


    // const datad = {
    //   datasets: [{
    //     label: 'First Dataset',
    //     data: [{
    //       x: 20,
    //       y: 30,
    //       r: 15
    //     }, {
    //       x: 40,
    //       y: 10,
    //       r: 10
    //     }],
    //     backgroundColor: 'rgb(255, 99, 132)'
    //   }]
  };

  // this.chart = new Chart("chart", {
  //     type: 'bubble',
  //     data: datad,
  //     options: {}
  //   })
  // }

  manageProviders() {
    this.router.navigate(['manage/providers']);
  }

  managePublications() {
    this.router.navigate(['manage/publications']);
  }

  manageProducts() {
    this.router.navigate(['manage/products']);
  }

  viewCompany(id: string) {
    this.router.navigate(['profile/company', id]);
  }

  manageOrders() {
    this.router.navigate(['manage/orders']);
  }

  viewGrocers() {
    this.router.navigate(['view/grocers']);
  }

  viewProducts(id: string) {
    this.router.navigate(['view/products/', id]);
  }

  viewModalCompany(id: string) {
    this.modalProfileCompany = id;
  }

}
