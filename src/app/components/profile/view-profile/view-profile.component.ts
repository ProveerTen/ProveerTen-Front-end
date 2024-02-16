import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {

  data: any;
  publications: any;
  imageFile: any;
  isValidImage: boolean = false;
  cover: boolean = false;
  photo: boolean = false;
  formData = new FormData();

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.client.getRequest(`${environment.url_logic}/profile/${this.auth.getRole()}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.data = response.data;
        if (this.auth.getRole() === "company") {
          const foundationDate = new Date(this.data.foundation_company);
          this.data.foundation_company = foundationDate.toISOString().split('T')[0];
          this.getPublications();
        }
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  getPublications() {
    this.client.getRequest(`${environment.url_logic}/publication/view/company/${this.auth.getId()}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.publications = response.publications;
        if (this.publications == '') {
          this.publications = false;
        }
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  updatePhoto() {
    this.photo = true;
    this.cover = false;
  }

  updateCover() {
    this.cover = true;
    this.photo = false;
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    if (this.imageFile.type.startsWith('image/')) {
      this.isValidImage = true;
    } else {
      this.isValidImage = false;
    }
  }

  onSubmitPhoto() {
    if (this.isValidImage) {
      this.isValidImage = false;
      this.formData.append(`profile_photo_${this.auth.getRole()}`, this.imageFile);
      this.client.patchRequest(`${environment.url_logic}/photo/photoProfile/${this.auth.getRole()}`, this.formData, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.isValidImage = false;
          console.log(response);
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'La foto se ha actualizado correctamente.' });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        error: (error) => {
          this.messageService.clear();
          this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: error.error.error });
        },
        complete: () => console.log('complete'),
      });
    } else {
      console.log("Error");
      this.messageService.clear();
      this.messageService.add({ key: 'center', severity: 'warn', summary: 'Advertencia', detail: 'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.' });
    }
  }

  onSubmitCover() {
    if (this.isValidImage) {
      this.isValidImage = false;
      this.formData.append(`cover_photo_${this.auth.getRole()}`, this.imageFile);
      this.client.patchRequest(`${environment.url_logic}/photo/photoCover/${this.auth.getRole()}`, this.formData, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.isValidImage = false;
          console.log(response);
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'La foto de portada se ha actualizado correctamente.' });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
        error: (error) => {
          this.messageService.clear();
          this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: error.error.error });
        },
        complete: () => console.log('complete'),
      });
    } else {
      console.log("Error");
      this.messageService.clear();
      this.messageService.add({ key: 'center', severity: 'warn', summary: 'Advertencia', detail: 'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.' });
    }
  }

  cancelPhoto() {
    this.photo = false;
    this.formData.delete(`profile_photo_${this.auth.getRole()}`);
  }

  cancelCover() {
    this.cover = false;
    this.formData.delete(`cover_photo_${this.auth.getRole()}`);
  }

  deleteValue(value: string) {
    this.client.deleteRequest(`${environment.url_logic}/edit_profile/${this.auth.getRole()}`, { deleteField: `${value}_${this.auth.getRole()}` }, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log(response);
        if (value.startsWith('profile')) {
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'La foto de perfil se ha eliminada correctamente.' });
        } else {
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'La foto de portada se ha eliminada correctamente.' });
        }
        setTimeout(() => {
          window.location.reload();
        }, 1500);

      },
      error: (error) => {
        this.messageService.clear();
        this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: error.error.error });
      },
      complete: () => console.log('complete'),
    });
  }

}
