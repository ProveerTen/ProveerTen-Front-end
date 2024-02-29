import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-reset-password-company',
  templateUrl: './reset-password-company.component.html',
  styleUrls: ['./reset-password-company.component.css']
})
export class ResetPasswordCompanyComponent {
  form: FormGroup
  data: Object = {};
  url: any;
  constructor(private fb: FormBuilder, private client: ClientService) {
    this.form = this.fb.group({
      emailResestPassword: ['', [Validators.email]]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.data = {
        emailCompany: this.form.value.emailResestPassword
      }
      this.client.postRequest(`${environment.url_auth}/reset/company-reset-password`).subscribe({
        next: (Response: any)=>{
          this.url = Response;
          console.log(this.url);
        }, error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      })
    }


  }

}