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
  grocers: any;
  filter: any[] = [];
  value: any = '';
  neighborhoods: any;
  selectedNeighborhood: string = '';
  modalProfile:string = '';
  nameGrocer:string = '';

  constructor(private client: ClientService, public auth: AuthService, private router: Router) {

    this.client.postRequest(`${environment.url_logic}/view/grocers/neighborhood`, { document_provider: this.auth.getId() }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.neighborhoods = response.neighborhoods;
        console.log(this.neighborhoods);


      },
      error: (error) => {
        console.log(error.error);
      },
      complete: () => console.log('complete'),
    });

  }

  ngOnInit(): void {
    this.client.postRequest(`${environment.url_logic}/view/grocers`, { document_provider: this.auth.getId() }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log(response.grocers);
        this.grocers = response.grocers;
        console.log(this.grocers);
        this.filter = this.grocers.slice();
      },
      error: (error) => {
        console.log(error.error);
        this.router.navigate(['404']);
      },
      complete: () => console.log('complete'),
    });
  }

  removeAccents(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  filterGrocers() {

    if (this.selectedNeighborhood === '' && this.value !== '') {
      this.grocers = this.filter.filter((grocer: any) => {
        return (
          this.removeAccents(grocer.name_grocer).toLowerCase().includes(this.removeAccents(this.value).toLowerCase()) ||
          this.removeAccents(grocer.last_name_grocer).toLowerCase().includes(this.removeAccents(this.value).toLowerCase())
          || this.removeAccents(grocer.name_store).toLowerCase().includes(this.removeAccents(this.value).toLowerCase())
        );
      });
    } else if (this.selectedNeighborhood !== '' && this.value !== '') {
      this.grocers = this.filter.filter((grocer: any) => {
        return (
          (
            this.removeAccents(grocer.name_grocer).toLowerCase().includes(this.removeAccents(this.value).toLowerCase()) ||
            this.removeAccents(grocer.last_name_grocer).toLowerCase().includes(this.removeAccents(this.value).toLowerCase()) ||
            this.removeAccents(grocer.name_store).toLowerCase().includes(this.removeAccents(this.value).toLowerCase())
          ) &&
          this.removeAccents(grocer.neighborhood).toLowerCase().includes(this.removeAccents(this.selectedNeighborhood).toLowerCase())
        );
      });
    } else if (this.selectedNeighborhood !== '' && this.value === '') {
      this.grocers = this.filter.filter(grocer => grocer.neighborhood === this.selectedNeighborhood);
    } else if (this.selectedNeighborhood === '' && this.value === '') {
      this.grocers = this.filter;
    }
  }


  filterByNeighborhood() {
    if (this.selectedNeighborhood !== '' && this.value === '') {
      this.grocers = this.filter.filter(grocer => grocer.neighborhood === this.selectedNeighborhood);
    } else if (this.selectedNeighborhood === '' && this.value === '') {
      this.grocers = this.filter;
    }
  }

  viewProfile(id: string) {
    console.log("fff", id);
    this.router.navigate(['profile/grocer', id])
  }

  viewModalProfile(id:string, nameGrocer:string) {
    console.log("qqq", id);
    
    this.modalProfile = id
    this.nameGrocer = nameGrocer
  }
}

