import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-profile-grocer',
  templateUrl: './update-profile-grocer.component.html',
  styleUrls: ['./update-profile-grocer.component.css']
})
export class UpdateProfileGrocerComponent {

  data: any;
  form: FormGroup;
  dataUpdate: any = {};
  err:any;

  constructor(private client: ClientService, public auth: AuthService, private fb: FormBuilder, private router: Router,
    private messageService: MessageService) {

    this.form = this.fb.group({
      document_grocer: [''],
      name_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      last_name_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      email_grocer: ['', [Validators.required, Validators.email]],
      name_store: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      city_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      neighborhood: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      number_street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      apartment: ['', [Validators.maxLength(25)]],
      number_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]],
    })
  }


  ngOnInit(): void {
    this.client.getRequest(`http://localhost:4001/profile/grocer`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log("Response data oninit", response.data);
        this.data = response.data;
        this.form.get('document_grocer')!.disable();
        this.form.patchValue(response.data);
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete grocer'),
    });

  }

  onSubmit() {
    if (this.form.valid && !this.form.pristine) {
      this.form.updateValueAndValidity();

      console.log("validado", this.form.value.name_grocer, "--");

      this.dataUpdate = {
        name_grocer: this.form.value.name_grocer,
        last_name_grocer: this.form.value.last_name_grocer,
        email_grocer: this.form.value.email_grocer,
        name_store: this.form.value.name_store,
        city_grocer: this.form.value.city_grocer,
        neighborhood: this.form.value.neighborhood,
        street: this.form.value.street,
        number_street: this.form.value.number_street,
        apartment: this.form.value.apartment,
        number_grocer: this.form.value.number_grocer
      }
      console.log("data Update apartment", this.dataUpdate.apartment);

      this.client.patchRequest(`http://localhost:4001/edit_profile/grocer`, this.dataUpdate, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log("response patch", response);

          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'La informacion del perfil ha sido actualizado exitosamente' });
          setTimeout(() => {
            this.router.navigate(['/profile', this.auth.getId()])
          }, 1500);
        },
        error: (error) => {
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
      console.log("No se cumplen las validaciones");
      this.messageService.clear();
      this.messageService.add({
        key: 'center', severity: 'warn', summary: 'Advertencia',
        detail: 'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.'
      });
    }
  }

  async deleteField (deleteField: string) {
    console.log("DELETE FIELD", deleteField);

    this.client.deleteRequest(`http://localhost:4001/edit_profile/company`, { deleteField }, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log("RESPOnse delete", response);

        this.form.get(deleteField)!.setValue(null);
      },  
      error: (error: any) => {
        console.log(error);
        // Swal.fire({
        //   title: error,
        //   icon: "error"
        // });
      },
      complete: () => {
        console.log("Complete delete data Profile");
      }
    })
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