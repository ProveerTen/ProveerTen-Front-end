import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  form: FormGroup
  data: Object = {};

  constructor(private fb: FormBuilder, private client: ClientService,) {
    this.form = this.fb.group({
      emailResestPassword: ['', [Validators.email]]
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.data = {
        emailReset: this.form.value.emailResestPassword
      }


      this.client.postRequest (`${environment.url_auth}/`)
    }


  }
}
