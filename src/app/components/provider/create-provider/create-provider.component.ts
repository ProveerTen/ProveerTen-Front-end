import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import provider from '../../../interfaces/provider';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.css']
})
export class CreateProviderComponent {
  loading: boolean = false
  form: FormGroup;
  provider: provider = {} as provider;
  departments: any;
  cities: any;
  id_department: any;

  constructor(private fb: FormBuilder, private client: ClientService, private router: Router, private auth: AuthService,
    private messageService: MessageService) {
    this.form = this.fb.group({
      name_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      last_name_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      email_provider: ['', [Validators.email]],
      password_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      // city_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      neighborhood: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      number_street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      number_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
      department: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.client.getRequest(`https://api-colombia.com/api/v1/Department`, undefined, undefined).subscribe({
      next: (response) => {
        this.departments = response;
        console.log(this.departments);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('complete'),
    });
  }

  selected_department(data: any) {
    this.client.getRequest(`https://api-colombia.com/api/v1/Department/${data.id}/cities`, undefined, undefined).subscribe({
      next: (response) => {
        this.cities = response;
        console.log(this.cities);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('complete'),
    });
    this.form.patchValue({
      city: ''
    });
  }

  onSubmit() {
    this.loading = true

    setTimeout(() => {

      if (this.form.valid) {
        this.provider = {
          name_provider: this.form.value.name_provider,
          last_name_provider: this.form.value.last_name_provider,
          email_provider: this.form.value.email_provider,
          password_provider: this.form.value.password_provider,
          nit_company: this.auth.getId(),
          city_provider: this.form.value.city,
          neighborhood: this.form.value.neighborhood,
          street: this.form.value.street,
          number_street: this.form.value.number_street,
          number_provider: this.form.value.number_provider,
          department: this.form.value.department.name
        }
        console.log(this.provider);
        this.client.postRequest(`${environment.url_auth}/register/provider`, this.provider, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
          next: (response) => {
            this.loading = false
            console.log(response);
            this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'El registro se ha realizado correctamente.' });
            setTimeout(() => {
              this.router.navigate(['manage/providers']);
            }, 1500);
          },
          error: (error) => {
            this.loading = false
            console.log(error);
            this.messageService.clear();
            this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: error.error.error });
          },
          complete: () => console.log('complete'),
        });
      } else {
        this.loading = false
        console.log("Error");
        this.messageService.clear();
        this.messageService.add({ key: 'center', severity: 'warn', summary: 'Advertencia', detail: 'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.' });
      }
    }, 400)
  }

  cancel() {
    this.router.navigate(['manage/providers']);
  }

}

