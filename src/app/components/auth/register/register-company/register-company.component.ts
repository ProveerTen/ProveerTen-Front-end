import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import company from '../../../../interfaces/company';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent {
  loading: boolean = false
  form: FormGroup;
  company: company = {} as company;
  fecha: any;
  departments: any;
  cities: any;
  id_department: any;

  constructor(private fb: FormBuilder, private client: ClientService, private router: Router,
    private messageService: MessageService) {
    this.form = this.fb.group({
      nit_company: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      name_company: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      email_company: ['', [Validators.email]],
      password_company: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
      national_line_company: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      foundation_company: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      description_company: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      // department: ['', Validators.required],
      // city: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    let datapipe = new DatePipe('en-US')
    this.fecha = datapipe.transform(new Date(), 'yyyy-MM-dd');
    // this.client.getRequest(`https://api-colombia.com/api/v1/Department`, undefined, undefined).subscribe({
    //   next: (response) => {
    //     this.departments = response;
    //     console.log(this.departments);

    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    //   complete: () => console.log('complete'),
    // });
  }

  // selected_department(data: any) {
  //   this.client.getRequest(`https://api-colombia.com/api/v1/Department/${data.id}/cities`, undefined, undefined).subscribe({
  //     next: (response) => {
  //       this.cities = response;
  //       console.log(this.cities);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //     complete: () => console.log('complete'),
  //   });
  // }

  onSubmit() {

    this.loading = true

    setTimeout(() => {


      if (this.form.valid) {
        this.company = {
          nit_company: this.form.value.nit_company,
          name_company: this.form.value.name_company,
          email_company: this.form.value.email_company,
          password_company: this.form.value.password_company,
          national_line_company: this.form.value.national_line_company,
          foundation_company: this.form.value.foundation_company,
          description_company: this.form.value.description_company,
        }

        this.client.postRequest(`${environment.url_auth}/register/company`, this.company).subscribe({
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
        this.loading = false
        console.log("Error");
        this.messageService.clear();
        this.messageService.add({ key: 'center', severity: 'warn', summary: 'Advertencia', detail: 'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.' });
      }
    }, 2000)
  }
}
