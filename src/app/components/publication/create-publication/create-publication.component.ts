import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { format } from 'date-fns';

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

  constructor(private fb: FormBuilder, private client: ClientService, public auth: AuthService,
    private router: Router, private messageService: MessageService) {
    this.form = this.fb.group({
      text: [''],
      image: [null, [Validators.required]],
    });
  }

  onSubmit() {
    const dateCreate: string = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
    console.log("currente date rr", dateCreate);

    if (this.form.valid && this.isValidImage) {
      this.isValidImage = false;
      
      const formData = new FormData();
      formData.append('text', this.form.value.text);
      formData.append('image', this.imageFile);
      formData.append('date', dateCreate)

      this.client.postRequest(`${environment.url_logic}/publication/create`, formData, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'La publicacion se ha creado exitosamente' });
          setTimeout(() => {
            this.router.navigate(['manage/publications']);
          }, 1500);
        },
        error: (error) => {
          console.log(error);
          this.messageService.clear();
          this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: error.error });
        },
        complete: () => console.log('complete'),
      });
    } else {
      console.log("Error");
      this.messageService.add({ key: 'center', severity: 'warn', summary: 'Advertencia', detail: 'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.' });
    }
  }

  onFileSelected(event: any) {
    /*
    this.imageFile = event.target.files[0];
    if (this.imageFile.type.startsWith('image/'|| this.imageFile.type.startsWith('video/'))) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
      this.isValidImage = true;
    } else {
      this.isValidImage = false;
    }
    */

    this.imageFile = event.target.files[0];
        if (this.imageFile.type.startsWith('image/') || this.imageFile.type.startsWith('video/')) {
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
