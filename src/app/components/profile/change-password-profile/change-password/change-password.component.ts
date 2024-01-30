import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  form:FormGroup;
  data:any;

  constructor(public auth:AuthService, private fb:FormBuilder, private client:ClientService) {

    this.form = this.fb.group({
      old_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      new_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      new_password_confirmed: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    })
  }

  onSubmitCompany() {

    this.data = {
      old_password: this.form.value.old_password,
      new_password: this.form.value.new_password,
    }

    this.client.postRequest(`${environment.url_logic}/password/changePassword/company`, this.data, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response:any) => {
        console.log("response", response);
        Swal.fire({
          title: "Contraseña actualizada con éxito",
          icon: "success"
        });
        // this.router.navigate(['/profile', this.auth.getId()])        
      },
      error: (error:any) => {
        console.log("error", error);        
      },
      complete: () => {
        console.log("complete");        
      }
    })
  }

  onSubmitProvider() {

    this.data = {
      old_password: this.form.value.old_password,
      new_password: this.form.value.new_password,
    }

    this.client.postRequest(`${environment.url_logic}/password/changePassword/provider`, this.data, undefined, { "Authorization": `Bearer ${this.auth.getToken()}`}).subscribe({
      next: (response:any) => {
        console.log("response", response);
        Swal.fire({
          title: "Contraseña actualizada con éxito",
          icon: "success"
        });        
      },
      error: (error:any) => {
        console.log("error", error);        
      },
      complete: () => {
        console.log("complete");        
      }
    })
  }

  onSubmitGrocer() {

    this.data = {
      old_password: this.form.value.old_password,
      new_password: this.form.value.new_password,
    }

    this.client.postRequest(`${environment.url_logic}/password/changePassword/grocer`, this.data, undefined, { "Authorization": `Bearer ${this.auth.getToken()}`}).subscribe({
      next: (response:any) => {
        console.log("response", response);  
        Swal.fire({
          title: "Contraseña actualizada con éxito",
          icon: "success"
        });      
      },
      error: (error:any) => {
        console.log("error", error);        
      },
      complete: () => {
        console.log("complete");        
      }
    })
  }
}
