import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private client: ClientService, public auth: AuthService, private fb: FormBuilder, private router: Router) {

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

    this.client.getRequest(`http://localhost:4001/profile/company`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log("Response", response);
        console.log("Response data", response.data);
        this.data = response.data;


        this.form.get('nit_company')!.disable();
        this.form.patchValue(response.data);
        // this.disableInput("nit_company")
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete company'),
    });
  }

  onSubmitUpdate() {

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


      this.client.patchRequest(`http://localhost:4001/edit_profile/company`, this.dataUpdate, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log("response patch", response);
          Swal.fire({
            title: "Datos actualizados con éxito",
            icon: "success"
          });
          this.router.navigate(['/profile', this.auth.getId()])
        },
        error: (error) => {
          console.log(error);
          Swal.fire({
            title: error.error.errors[0].msg,
            icon: "error"
          });
        },
        complete: () => {
          console.log("complete update profile");
        }
      })

    } else if (!this.form.valid) {
      console.log("No se cumplen las validaciones");
    }
  }

  deleteField(deleteField: string) {
    console.log("DELETE FIELD", deleteField);

    this.client.deleteRequest(`http://localhost:4001/edit_profile/company`, { deleteField }, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log("RESPOnse", response);
        
        this.form.get(deleteField)!.setValue(null)

        Swal.fire({
          title: "Dato Eliminado",
          icon: "success"
        });
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log("Complete delete data Profile");
      }
    })
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
