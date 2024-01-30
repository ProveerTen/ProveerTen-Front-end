import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-delete-data-profile-company',
  templateUrl: './delete-data-profile-company.component.html',
  styleUrls: ['./delete-data-profile-company.component.css']
})
export class DeleteDataProfileCompanyComponent {

  data: any;
  form: FormGroup;

  constructor(private client: ClientService, public auth: AuthService, private router: Router, private fb: FormBuilder) {

    this.form = this.fb.group({
      nit_company: [''],
      name_company: [''],
      email_company: [''],
      national_line_company: [''],
      foundation_company: [''],
      description_company: ['']
    })
  }

  ngOnInit(): void {

    this.client.getRequest(`http://localhost:4001/profile/company`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        console.log("Response", response);
        console.log("Response data", response.data);
        this.data = response.data;
        this.disableForm();
        // this.form.patchValue(response.data);
        // this.disableInput()

      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete company'),
    });
  }

  disableForm() {
    this.form.disable();
  }

  deleteField(deleteField: string) {
    console.log("DELETE FIELD", deleteField);

    this.client.deleteRequest(`http://localhost:4001/edit_profile/company`, deleteField, { deleteField }, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
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
  // disableInput() {
  //   Object.keys(this.form.controls).forEach(key => {
  //     const control: AbstractControl | null = this.form.get(key);
  //     if (control) {
  //       control.disable();
  //     } 
  //   })
  // }

}
