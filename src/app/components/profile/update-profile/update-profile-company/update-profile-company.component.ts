import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-profile-company',
  templateUrl: './update-profile-company.component.html',
  styleUrls: ['./update-profile-company.component.css']
})
export class UpdateProfileCompanyComponent {
  fecha: Date = new Date();
  data: any;
  abc: string = "ana"
  form: FormGroup;
  dataUpdate: any = {};
  loading: boolean = false

  constructor(private client: ClientService, public auth: AuthService, private fb: FormBuilder, private router: Router
    , private messageService: MessageService) {

    this.form = this.fb.group({
      nit_company: [''],
      name_company: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]], //1-100
      email_company: ['', [Validators.required, Validators.email]],
      national_line_company: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      foundation_company: ['', [Validators.maxLength(40)]],
      description_company: ['', [Validators.maxLength(255)]]
    })
  }


  ngOnInit(): void {

    this.client.getRequest(`${environment.url_logic}/profile/company`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log("Response", response);
        console.log("Response data", response.data);
        this.data = response.data;
        this.data.national_line_company = Number(response.data.national_line_company);
        const foundationDate = new Date(this.data.foundation_company);
        this.data.foundation_company = foundationDate.toISOString().split('T')[0];
        this.form.get('nit_company')!.disable();
        this.form.patchValue(this.data);
        // this.disableInput("nit_company")
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete company'),
    });
  }

  onSubmitUpdate() {
    this.loading = true

    setTimeout(() => {


      if (this.form.valid && !this.form.pristine) {
        this.form.updateValueAndValidity();

        console.log("validado", this.form.value.foundation_company, "ee");

        this.dataUpdate = {
          name_company: this.form.value.name_company,
          email_company: this.form.value.email_company,
          national_line_company: this.form.value.national_line_company,
          foundation_company: this.form.value.foundation_company,
          description_company: this.form.value.description_company
        }
        console.log("data Update", this.dataUpdate);


        this.client.patchRequest(`${environment.url_logic}/edit_profile/company`, this.dataUpdate, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
          next: (response: any) => {
            this.loading = false
            console.log("response patch", response);
            this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: '¡Informacion actualizada exitosamente!' });
            this.router.navigate(['/profile'])
          },
          error: (error) => {
            this.loading = false
            console.log(error);
            this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error en la actualización de la información!' });
          },
          complete: () => {
            console.log("complete update profile");
          }
        })

      } else if (!this.form.valid) {
        this.loading = false
        console.log("No se cumplen las validaciones");
      }
    }, 400)
  }

  deleteField(deleteField: string) {
    console.log("DELETE FIELD", deleteField);
    let res = confirm('¿Seguro qué desea eliminar esta información?');

    if (res) {
      this.client.deleteRequest(`${environment.url_logic}/edit_profile/company`, { deleteField }, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log("RESPOnse", response);

          this.form.get(deleteField)!.setValue(null)
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          console.log("Complete delete data Profile");
        }
      })
    }

  }


  isvalid(nameField: string) {
    return this.form.get(nameField)?.valid;
  }

  // disableInput(name: string) {
  //   const myInputControl = this.form.get(name);
  //   if (myInputControl) {
  //     myInputControl.disable();
  //   }
  // }

  // disableInput(controlName: string) {
  //   const control = this.form.get(controlName);
  //   console.log(`Intentando deshabilitar ${controlName}`);
  //   if (control) {
  //     control.disable();
  //     console.log(`${controlName} deshabilitado`);
  //   } else {
  //     console.log(`Control ${controlName} no encontrado`);
  //   }
  // }


}
