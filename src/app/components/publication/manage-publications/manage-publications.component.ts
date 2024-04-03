import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-publications',
  templateUrl: './manage-publications.component.html',
  styleUrls: ['./manage-publications.component.css']
})
export class ManagePublicationsComponent {
  viewProduct(arg0: any) {
    throw new Error('Method not implemented.');
  }
  loading : boolean = false
  publications: any;
  data: any;
  publicationModal:string;

  constructor(private client: ClientService, public auth: AuthService, private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.loading = true

      setTimeout (()=>{



    this.client.getRequest(`${environment.url_logic}/publication/view/company/${this.auth.getId()}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.loading = false
        console.log(response);
        this.publications = response.publications;

        for (let k = 0; k < this.publications.length; k++) {
          const element = this.publications[k].date;
          this.publications[k].date = new Date(element)
        }
        this.publications = this.orderByDate(this.publications)

        if (this.publications == '') {
          this.publications = false;
        }
      },
      error: (error) => {
        this.loading = false
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  },300)
  }

  orderByDate(publications: any[]) {
    return publications.sort((a, b) => b.date - a.date);
  }

  updatePublication(id: string) {
    this.router.navigate(['update/publication', id]);
  }

  deletePublication(id: string) {
    let res = confirm('¿Seguro qué desea eliminar esta publicación?');
    if (res) {
      this.client.deleteRequest(`${environment.url_logic}/publication/delete/${id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'La publicacion se ha eliminado exitosamente' });
          setTimeout(() => {
            window.location.reload();
          }, 1500);

        },
        error: (error) => {
          console.log(error.error.Status);
          this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: error.error });
        },
        complete: () => console.log('complete'),
      });
    }
  }

  createPublication() {
    this.router.navigate(['create/publication'])
  }

  goBack() {
    this.router.navigate(['panel']);
  }

  isVideo(url: string): boolean {
    return url.endsWith('.mp4'); 
  }

  viewPublicationModal(id:string) {
    this.publicationModal = id
  }
}
