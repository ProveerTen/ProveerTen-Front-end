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
  value: any;

  constructor(private client: ClientService, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log('Hola');
    this.client.postRequest(`${environment.url_logic}/view/grocers`, { document_provider: this.auth.getId() }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log(response.grocers);
        this.grocers = response.grocers;
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
    if (this.value !== "") {
      this.grocers = this.filter.filter((grocer: any) => {
        return (
          this.removeAccents(grocer.name_grocer).toLowerCase().includes(this.removeAccents(this.value).toLowerCase()) ||
          this.removeAccents(grocer.last_name_grocer).toLowerCase().includes(this.removeAccents(this.value).toLowerCase())
          || this.removeAccents(grocer.name_store).toLowerCase().includes(this.removeAccents(this.value).toLowerCase())
        );
      });
    } else {
      this.grocers = this.filter;
    }

  }

  viewProfile(id: string) {
    console.log("fff", id);
    this.router.navigate(['profile/grocer', id])
  }
}

