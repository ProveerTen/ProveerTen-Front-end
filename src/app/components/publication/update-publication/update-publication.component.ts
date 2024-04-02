import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-publication',
  templateUrl: './update-publication.component.html',
  styleUrls: ['./update-publication.component.css']
})
export class UpdatePublicationComponent {

  form: FormGroup;
  imageFile: any;
  imagePreview: any;
  isValidImage: boolean = true;
  data: any;
  id!: string;

  constructor(private fb: FormBuilder, private client: ClientService, public auth: AuthService, private router: Router,
    private routerActivate: ActivatedRoute, private messageService: MessageService) {
    this.form = this.fb.group({
      text: [''],
      image: [null],
    });
  }

  ngOnInit(): void {
    this.id = this.routerActivate.snapshot.params['id'];
    this.client.getRequest(`${environment.url_logic}/publication/view/${this.id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.data = response.publication;
        this.form.patchValue({
          text: this.data.text
        });
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  onSubmit() {
    if (this.form.valid && this.isValidImage) {
      this.isValidImage = false;
      const formData = new FormData();
      formData.append('text', this.form.value.text);
      formData.append('image', this.imageFile);
      formData.append('id', this.id)

      this.client.patchRequest(`${environment.url_logic}/publication/update`, formData, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'La publicacion se ha actualizado exitosamente' });
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
    this.imageFile = event.target.files[0];
    if (this.imageFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
      this.isValidImage = true;
    } else {
      this.messageService.add({ key: 'center', severity: 'warn', summary: 'Advertencia', detail: 'Los tipo de archivo ingresado es inválido. Por favor, revise la información proporcionada.' });
      this.isValidImage = false;
    }
  }

  cancel() {
    this.router.navigate(['manage/publications']);
  }
}
