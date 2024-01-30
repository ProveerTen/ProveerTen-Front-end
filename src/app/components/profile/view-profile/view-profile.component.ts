import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

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

  constructor(private client: ClientService, public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.client.getRequest(`${environment.url_logic}/profile/${this.auth.getRole()}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.data = response.data;
        if (this.auth.getRole() === "company") {
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
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => console.log('complete'),
      });
    } else {
      console.log("Error");
    }
  }

  onSubmitCover() {
    if (this.isValidImage) {
      this.isValidImage = false;
      this.formData.append(`cover_photo_${this.auth.getRole()}`, this.imageFile);
      this.client.patchRequest(`${environment.url_logic}/photo/photoCover/${this.auth.getRole()}`, this.formData, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.isValidImage = false;
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => console.log('complete'),
      });
    } else {
      console.log("Error");
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
        window.location.reload();
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

}
