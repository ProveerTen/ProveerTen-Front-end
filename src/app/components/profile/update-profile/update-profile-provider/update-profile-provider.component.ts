import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile-provider',
  templateUrl: './update-profile-provider.component.html',
  styleUrls: ['./update-profile-provider.component.css']
})
export class UpdateProfileProviderComponent {

  form: FormGroup;
  dataUpdate: any = {};
  data:any;

  constructor(public auth: AuthService, private fb: FormBuilder, private client: ClientService, private router: Router) {

    this.form = this.fb.group({
      document_provider: [''],
      name_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      last_name_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      email_provider: ['', [Validators.required, Validators.email]],
      number_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
      city_provider: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      neighborhood: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      number_street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
    })
  }

  ngOnInit():void {
    this.client.getRequest(`http://localhost:4001/profile/provider`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log("Response", response);
        console.log("Response data", response.data);

        this.data = response.data;
        this.form.get('document_provider')!.disable();
        this.form.patchValue(response.data);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log("complete update provider");
      }
    })
  }

  onSubmit() {
    if (this.form.valid && !this.form.pristine) {
      this.form.updateValueAndValidity();

      console.log("validado", this.form.value.name_provider, "ee");

      this.dataUpdate = {
        name_provider: this.form.value.name_provider,
        last_name_provider: this.form.value.last_name_provider,
        email_provider: this.form.value.email_provider,
        number_provider: this.form.value.number_provider,
        city_provider: this.form.value.city_provider,
        neighborhood: this.form.value.neighborhood,
        street: this.form.value.street,
        number_street: this.form.value.number_street
      }
      console.log("data Update", this.dataUpdate);

      this.client.patchRequest(`http://localhost:4001/edit_profile/provider`, this.dataUpdate, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
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
        },
        complete: () => {
          console.log("complete update profile");
        }
      })

    } else {
      console.log("No se cumplen las validaciones");
    }
  }
}
