import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';

import provider from '../../../interfaces/provider';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent {

  form: FormGroup;
  provider: provider = {} as provider;

  constructor(private fb: FormBuilder, private client: ClientService, private router: Router, private auth: AuthService) {
    this.form = this.fb.group({
      document_provider: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      name_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      last_name_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      email_provider: ['', [Validators.email]],
      password_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      city_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      neighborhood: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      number_street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      number_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.provider = {
        document_provider: this.form.value.document_provider,
        name_provider: this.form.value.name_provider,
        last_name_provider: this.form.value.last_name_provider,
        email_provider: this.form.value.email_provider,
        password_provider: this.form.value.password_provider,
        nit_company: this.auth.getId(),
        city_provider: this.form.value.city_provider,
        neighborhood: this.form.value.neighborhood,
        street: this.form.value.street,
        number_street: this.form.value.number_street,
        number_provider: this.form.value.number_provider
      }
      this.client.postRequest(`${environment.url_auth}/register/provider`, this.provider, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => console.log('complete'),
      });
    }
  }

  cancel() {
    this.router.navigate(['manage/providers']);
  }
}
