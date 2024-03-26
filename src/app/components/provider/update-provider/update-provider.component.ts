import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';

import provider from '../../../interfaces/provider';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-provider',
  templateUrl: './update-provider.component.html',
  styleUrls: ['./update-provider.component.css']
})
export class UpdateProviderComponent {
  loading: boolean = false
  form: FormGroup;
  provider: provider = {} as provider;
  data: any;
  dataProvider: any;
  id!: string;
  formPassword: FormGroup;
  dataPassword: any;

  departments: any = [];
  cities: any;
  id_department: any;
  department: any = [];
  city: any;

  isSelected: boolean = false;

  constructor(private fb: FormBuilder, private client: ClientService, private router: Router, private auth: AuthService,
    private routerActivate: ActivatedRoute, private messageService: MessageService) {
    this.form = this.fb.group({
      document_provider: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      name_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      last_name_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      email_provider: ['', [Validators.email]],
      // city_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      neighborhood: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      number_street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      number_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
      department: ['', Validators.required],
      city_provider: ['', Validators.required]
    });

    this.formPassword = this.fb.group({
      password_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
    })

    this.client.getRequest(`https://api-colombia.com/api/v1/Department`, undefined, undefined).subscribe({
      next: (response) => {
        this.departments = response;
        console.log(this.departments);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete')

        this.id = this.routerActivate.snapshot.params['id'];
        this.client.getRequest(`${environment.url_logic}/profile/providers/${this.id}`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
          next: (response: any) => {
            this.data = response.data;
            console.log(this.data);
            this.form.patchValue({
              document_provider: this.data.document_provider,
              name_provider: this.data.name_provider,
              last_name_provider: this.data.last_name_provider,
              email_provider: this.data.email_provider,
              // city_provider: this.data.city_provider,
              neighborhood: this.data.neighborhood,
              street: this.data.street,
              number_street: this.data.number_street,
              number_provider: this.data.number_provider,
              department: this.data.department,
              city_provider: this.data.city_provider
            });
          },
          error: (error) => {
            console.log(error.error.Status);
            this.router.navigate(['404']);
          },
          complete: () => console.log('complete'),
        });
      },
    });
  }

  onSubmit() {

    this.loading = true

    setTimeout(() => {


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
          number_provider: this.form.value.number_provider,
          department: this.form.value.department
        };
        console.log(this.dataProvider);

        this.client.postRequest(`${environment.url_logic}/provider/update`, this.dataProvider, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
          next: (response) => {
            this.loading = false
            console.log(response);
            this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'Actualización exitosa del trabajador' });
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
        console.log('error');
        this.messageService.clear();
        this.messageService.add({ key: 'center', severity: 'warn', summary: 'Advertencia', detail: 'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.' });
      }
    }, 400)
  }

  onSubmitPassword() {
    this.loading = true
    setTimeout(() => {
      if (this.formPassword.valid) {
        this.dataPassword = {
          password_provider: this.formPassword.value.password_provider,
          email_provider: this.form.value.email_provider,
          document_provider: this.id
        }
        this.client.postRequest(`${environment.url_logic}/provider/update/password`, this.dataPassword, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
          next: (response) => {
            this.loading = false
            console.log(response);
            this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'Actualización de la contraseña exitosa del trabajador' });
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
        console.log('error');
        this.messageService.add({ key: 'center', severity: 'warn', summary: 'Advertencia', detail: 'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.' });
      }
    }, 400)
  }

  click() {
    this.isSelected = true;
  }

  selected_department(nameDepartment: any) {

    this.department = this.departments.find(department => department.name === nameDepartment);

    this.client.getRequest(`https://api-colombia.com/api/v1/Department/${this.department.id}/cities`, undefined, undefined).subscribe({
      next: (response) => {
        this.cities = response;
        console.log(this.cities);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('Complete'),
    });

    if (this.isSelected) {
      this.form.patchValue({
        city_provider: ''
      });
    }
  }

  cancel() {
    this.router.navigate(['manage/providers']);
  }
}
