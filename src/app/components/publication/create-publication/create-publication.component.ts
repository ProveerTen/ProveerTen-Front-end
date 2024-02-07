import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.css']
})
export class CreatePublicationComponent {

  form: FormGroup;
  imageFile: any;
  imagePreview: any;
  isValidImage: boolean = true;

  constructor(private fb: FormBuilder, private client: ClientService, public auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      text: [''],
      image: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid && this.isValidImage) {
      this.isValidImage = false;
      const formData = new FormData();
      formData.append('text', this.form.value.text);
      formData.append('image', this.imageFile);

      this.client.postRequest(`${environment.url_logic}/publication/create`, formData, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
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

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    if (this.imageFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
      this.isValidImage = true;
    } else {
      this.isValidImage = false;
    }
  }

}
