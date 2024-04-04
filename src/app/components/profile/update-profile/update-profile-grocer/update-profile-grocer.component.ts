import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-profile-grocer',
  templateUrl: './update-profile-grocer.component.html',
  styleUrls: ['./update-profile-grocer.component.css']
})
export class UpdateProfileGrocerComponent {

  data: any;
  form: FormGroup;
  dataUpdate: any = {};
  err: any;
  loading: boolean = false

  departments: any;
  cities: any;
  id_department: any;
  department: any;
  city: any;
  id: any;

  isSelected: boolean = false;


  constructor(private client: ClientService, public auth: AuthService, private fb: FormBuilder, private router: Router,
    private messageService: MessageService) {
    this.loading = true
    this.form = this.fb.group({
      document_grocer: [''],
      name_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      last_name_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      email_grocer: ['', [Validators.required, Validators.email]],
      name_store: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      // city_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      neighborhood: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      number_street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      // apartment: ['', [Validators.maxLength(25)]],
      number_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
      department: ['', Validators.required],
      city_grocer: ['', Validators.required]
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
        this.client.getRequest(`${environment.url_logic}/profile/grocer`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
          next: (response: any) => {
            console.log("Response data oninit", response.data);
            this.data = response.data;
      
            this.form.get('document_grocer')!.disable();
            this.form.patchValue({
              document_grocer: response.data.document_grocer,
              name_grocer: response.data.name_grocer,
              last_name_grocer: response.data.last_name_grocer,
              email_grocer: response.data.email_grocer,
              name_store: response.data.name_store,
              neighborhood: response.data.neighborhood,
              street: response.data.street,
              number_street: response.data.number_street,
              number_grocer: response.data.number_grocer,
              department: response.data.department,
              city_grocer: response.data.city_grocer,
            })
            this.loading = false;
          },
          error: (error) => {
            console.log(error.error.Status);
          },
          complete: () => console.log('complete grocer'),
        });
      },
    });
  }

  onSubmit() {

    this.loading = true

    setTimeout(() => {

      if (this.form.valid && !this.form.pristine) {
        this.form.updateValueAndValidity();

        console.log("validado", this.form.value.name_grocer, "--");

        this.dataUpdate = {
          name_grocer: this.form.value.name_grocer,
          last_name_grocer: this.form.value.last_name_grocer,
          email_grocer: this.form.value.email_grocer,
          name_store: this.form.value.name_store,
          // city_grocer: this.form.value.city_grocer,
          neighborhood: this.form.value.neighborhood,
          street: this.form.value.street,
          number_street: this.form.value.number_street,
          // apartment: this.form.value.apartment,
          department: this.form.value.department,
          city_grocer: this.form.value.city_grocer,
          number_grocer: this.form.value.number_grocer
        }

        console.log(this.dataUpdate);

        this.client.patchRequest(`${environment.url_logic}/edit_profile/grocer`, this.dataUpdate, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
          next: (response: any) => {
            this.loading = false
            console.log("response patch", response);
            this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'La informacion del perfil ha sido actualizado exitosamente' });
            // setTimeout(() => {
            //   this.router.navigate(['/profile'])
            // }, 1500);
          },
          error: (error) => {
            this.loading = false
            this.err = error.error.errors[0];
            console.log(error);
            this.messageService.clear();
            this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: this.err });
          },
          complete: () => {
            console.log("complete update profile");
          }
        })

      } else {
        this.loading = false
        console.log("No se cumplen las validaciones");
        this.messageService.clear();
        this.messageService.add({
          key: 'center', severity: 'warn', summary: 'Advertencia',
          detail: 'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.'
        });
      }
    }, 400)
  }

  async deleteField(deleteField: string) {
    console.log("DELETE FIELD", deleteField);
    let res = confirm('¿Seguro qué desea eliminar esta información?');
    if (res) {
      this.client.deleteRequest(`${environment.url_logic}/edit_profile/company`, { deleteField }, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log("RESPOnse delete", response);

          this.form.get(deleteField)!.setValue(null);
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
        city_grocer: ''
      });
    }

  }

  isvalid(nameField: string) {
    return this.form.get(nameField)?.valid;
  }

  // async confirmationWindow():Promise<boolean> {
  //   let answer:any;
  //   const result = await Swal.fire({
  //     title: "Seguro que deseas salir?",
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: "Salir y guardar",
  //     denyButtonText: `Salir`
  //   });

  //   if (result.isConfirmed) {
  //     return true;
  //   } else if (result.isDenied) {
  //     return false;
  //   }
  // return false
  // }

  // let result = await this.confirmationWindow()
  // console.log(result);

  // if (!result) {
  //   this.router.navigate(['/login'])
  //   return
  // }
}
