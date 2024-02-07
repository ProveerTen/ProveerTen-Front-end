import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';

import provider from '../../../interfaces/provider';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-update-provider',
  templateUrl: './update-provider.component.html',
  styleUrls: ['./update-provider.component.css']
})
export class UpdateProviderComponent implements OnInit {

  form: FormGroup;
  provider: provider = {} as provider;
  data: any;
  dataProvider: any;
  id!: string;
  formPassword: FormGroup;
  dataPassword: any;

  constructor(private fb: FormBuilder, private client: ClientService, private router: Router, private auth: AuthService, private routerActivate: ActivatedRoute) {
    this.form = this.fb.group({
      document_provider: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      name_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      last_name_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      email_provider: ['', [Validators.email]],
      city_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      neighborhood: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      number_street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      number_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
    });
    this.formPassword = this.fb.group({
      password_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
    })
  }

  ngOnInit(): void {
    this.id = this.routerActivate.snapshot.params['id'];
    this.client.getRequest(`${environment.url_logic}/profile/providers/${this.id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.data = response.data;
        this.form.patchValue({
          document_provider: this.data.document_provider,
          name_provider: this.data.name_provider,
          last_name_provider: this.data.last_name_provider,
          email_provider: this.data.email_provider,
          city_provider: this.data.city_provider,
          neighborhood: this.data.neighborhood,
          street: this.data.street,
          number_street: this.data.number_street,
          number_provider: this.data.number_provider,
        });
      },
      error: (error) => {
        console.log(error.error.Status);
        this.router.navigate(['404']);
      },
      complete: () => console.log('complete'),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dataProvider = {
        document_provider: this.id,
        name_provider: this.form.value.name_provider,
        last_name_provider: this.form.value.last_name_provider,
        email_provider: this.form.value.email_provider,
        nit_company: this.auth.getId(),
        city_provider: this.form.value.city_provider,
        neighborhood: this.form.value.neighborhood,
        street: this.form.value.street,
        number_street: this.form.value.number_street,
        number_provider: this.form.value.number_provider
      };
      console.log(this.dataProvider);

      this.client.postRequest(`${environment.url_logic}/provideru/update`, this.dataProvider, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['manage/providers']);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => console.log('complete'),
      });
    } else {
      console.log('error');
    }
  }

  onSubmitPassword() {
    if (this.formPassword.valid) {
      this.dataPassword = {
        password_provider: this.formPassword.value.password_provider,
        email_provider: this.form.value.email_provider,
        document_provider: this.id
      }
      this.client.postRequest(`${environment.url_logic}/provideru/update/password`, this.dataPassword, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['manage/providers']);
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