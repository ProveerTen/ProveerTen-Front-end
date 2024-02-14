import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import grocer from '../../../../interfaces/grocer';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-grocer',
  templateUrl: './register-grocer.component.html',
  styleUrls: ['./register-grocer.component.css']
})
export class RegisterGrocerComponent {

  form: FormGroup;
  grocer: grocer = {} as grocer;

  constructor(private fb: FormBuilder, private client: ClientService, private router: Router,
    private messageService: MessageService) {
    this.form = this.fb.group({
      document_grocer: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      name_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      last_name_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      email_grocer: ['', [Validators.email]],
      name_store: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      city_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      password_grocer: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
      neighborhood: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      number_street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      apartment: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      number_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.grocer = {
        document_grocer: this.form.value.document_grocer,
        name_grocer: this.form.value.name_grocer,
        last_name_grocer: this.form.value.last_name_grocer,
        email_grocer: this.form.value.email_grocer,
        name_store: this.form.value.name_store,
        city_grocer: this.form.value.city_grocer,
        password_grocer: this.form.value.password_grocer,
        neighborhood: this.form.value.neighborhood,
        street: this.form.value.street,
        number_street: this.form.value.number_street,
        apartment: this.form.value.apartment,
        number_grocer: this.form.value.number_grocer
      }

      this.client.postRequest(`${environment.url_auth}/register/grocer`, this.grocer).subscribe({
        next: (response) => {
          console.log(response);
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'El registro se ha realizado correctamente.' });
          setTimeout(() => {
            this.router.navigate(["login"]);
          }, 1500);
        },
        error: (error) => {
          console.log(error);
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

}
