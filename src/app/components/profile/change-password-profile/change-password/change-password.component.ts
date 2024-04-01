import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { environment } from 'src/environments/environment';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  loading : boolean = false
  form: FormGroup;
  data: any;
  isGrocer: any;
  constructor(public auth: AuthService, private fb: FormBuilder, private client: ClientService, private router: Router,
    private messageService: MessageService) {

    this.form = this.fb.group({
      old_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      new_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      new_password_confirmed: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    })
  }

  onSubmit() {

    this.auth.isCompany().subscribe(value => {
      if (value) {

        return this.onSubmitCompany();
      }
    })
    this.auth.isGrocer().subscribe(value => {
      if (value) {

        return this.onSubmitGrocer();
      }
    })

  }

  onSubmitCompany() {
    this.loading = true

    setTimeout (()=>{

    if (this.form.valid && !this.form.pristine) {

      this.data = {
        old_password: this.form.value.old_password,
        new_password: this.form.value.new_password,
      }

      this.client.postRequest(`${environment.url_logic}/password/changePassword/company`, this.data, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.loading = false
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: '¡Contraseña actualizada exitosamente!' });
          this.form.reset()
          this.router.navigate(['/profile'])
        },
        error: (error: any) => {
          this.loading = false
          console.log("error", error);  
          if (error.error.error.includes('la contraseña antigua no coincide')) {
            this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error la contraseña ingresada no coindice con la contraseña antigua!' });
          } else {
            this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error en la actualizacion de contraseña!' });
          }
        },
        complete: () => {
          console.log("complete");
        }
      })
    } else {
      this.loading = false
      console.log("Datos no validos");

    }
  }, 400)
  }


  onSubmitGrocer() {
    this.loading   = true
      setTimeout (()=>{
    if (this.form.valid && !this.form.pristine) {

      this.data = {
        old_password: this.form.value.old_password,
        new_password: this.form.value.new_password,
      }

      this.client.postRequest(`${environment.url_logic}/password/changePassword/grocer`, this.data, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log("response", response);
          this.loading = false

          this.form.reset()
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: '¡Contraseña actualizada exitosamente!' });
          // this.router.navigate(['/profile', this.auth.getId()])
          this.router.navigate(['/update-profile', this.auth.getRole()]);
        },
        error: (error: any) => {
          this.loading = false
          console.log("error", error);
          if (error.error.error.includes('la contraseña antigua no coincide')) {
            this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error la contraseña ingresada no coindice con la contraseña antigua!' });
          } else {
            this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error en la actualizacion de contraseña!' });
          }

        },
        complete: () => {
          console.log("complete");
        }
      })
    } else {
      this.loading = false
      console.log("Datos no validos");

    }
  },400)
  }

  isvalid(nameField: string) {
    // console.log("is valid", this.form.get(nameField)?.valid);
    return this.form.get(nameField)?.valid;
  }

  confirmPass(valor?: string) {
    let result;
    const newPassword = this.form.get('new_password')?.value;

    const confirmedPassword = this.form.get('new_password_confirmed')?.value;

    // console.log("chat", newPassword === confirmedPassword);
    // console.log(confirmedPassword)
    // console.log(newPassword === confirmedPassword && confirmedPassword != '');

    if (confirmedPassword != '') {
      if (newPassword === confirmedPassword) {
        result = true;
      } else {
        result = false
      }
    } else if (valor === '0') {
      result = false
    } else if (valor == '1') {
      result = true
    }
    return result;
  }


  // esto esta en otro componente
  onSubmitProvider() {

      this.loading = true

      setTimeout (()=>{


    this.data = {
      old_password: this.form.value.old_password,
      new_password: this.form.value.new_password,
    }

    this.client.postRequest(`${environment.url_logic}/password/changePassword/provider`, this.data, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.loading = false
        console.log("response", response);
        this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: '¡Contraseña actualizada exitosamente!' });

        this.router.navigate(['/profile', this.auth.getId()])
      },
      error: (error: any) => {
        this.loading = false
        console.log("error", error);
        if (error.error.error.includes('la contraseña antigua no coincide')) {
          this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error la contraseña ingresada no coindice con la contraseña antigua!' });
        } else {
          this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: '¡Error en la actualizacion de contraseña!' });
        }

      },
      complete: () => {
        console.log("complete");
      }
    })
  },400)
  }
}
