import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent {

  form: FormGroup;
  file: any;
  imagePreview: any;
  isValidFile: boolean = true;

  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      file: [null, [Validators.required]],
    });
  }

  onSubmit(): void {

    console.log(this.form.valid && this.isValidFile);
    console.log(this.form.value.file);



    // this.client.postRequest(`${environment.url_logic}/view/subCategories`, {}, undefined, { Authorization: `Bearer ${this.auth.getToken()}` }).subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    //   complete: () => console.log('complete'),
    // });

  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);

    // if (this.file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || this.file.type === 'text/csv' || this.file.type === 'application/vnd.ms-excel') {
    if (this.file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || this.file.type === 'text/csv' || this.file.type === 'application/vnd.ms-excel' || this.file.type === 'application/vnd.ms-excel' || this.file.type === 'application/vnd.ms-excel' || this.file.type === 'application/vnd.ms-excel' || this.file.type === 'application/vnd.ms-excel') {
      console.log('Archivo válido');
      this.isValidFile = true;
    } else {
      console.log('Archivo no válido');
      this.isValidFile = false;
    }
  }

}
