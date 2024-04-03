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
  loading: boolean = false
  form: FormGroup;
  grocer: grocer = {} as grocer;
  departments: any;
  cities: any;
  id_department: any;

  constructor(private fb: FormBuilder, private client: ClientService, private router: Router,
    private messageService: MessageService) {
    this.form = this.fb.group({
      document_grocer: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      name_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      last_name_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      email_grocer: ['', [Validators.required, Validators.email]],
      name_store: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      // city_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      password_grocer: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
      neighborhood: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      number_street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      // apartment: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      number_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
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

      console.log(this.form);
      console.log(this.form.valid);


      if (this.form.valid) {
        this.grocer = {
          document_grocer: this.form.value.document_grocer,
          name_grocer: this.form.value.name_grocer,
          last_name_grocer: this.form.value.last_name_grocer,
          email_grocer: this.form.value.email_grocer,
          name_store: this.form.value.name_store,
          city_grocer: this.form.value.city,
          password_grocer: this.form.value.password_grocer,
          neighborhood: this.form.value.neighborhood,
          street: this.form.value.street,
          number_street: this.form.value.number_street,
          // apartment: this.form.value.apartment,
          number_grocer: this.form.value.number_grocer,
          department: this.form.value.department.name,
        }

        console.log(this.grocer);


        this.client.postRequest(`${environment.url_auth}/register/grocer`, this.grocer).subscribe({
          next: (response) => {
            this.loading = false
            console.log(response);
            this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'El registro se ha realizado correctamente.' });
            setTimeout(() => {
              this.router.navigate(["login"]);
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
        console.log("Error");
        this.loading = false
        this.messageService.clear();
        this.messageService.add({ key: 'center', severity: 'warn', summary: 'Advertencia', detail: 'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.' });
      }
    }, 2000)
  }

}
