import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login-provider',
  templateUrl: './login-provider.component.html',
  styleUrls: ['./login-provider.component.css']
})
export class LoginProviderComponent {

  form: FormGroup;
  data: Object = {};

  constructor(private fb: FormBuilder, private client: ClientService, public auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email_provider: ['', [Validators.email]],
      password_provider: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.data = {
        email_provider: this.form.value.email_provider,
        password_provider: this.form.value.password_provider
      }
      this.client.postRequest('http://localhost:5001/login/provider', this.data).subscribe({
        next: (response: any) => {
          console.log(response);
          this.auth.login(response.token, response.data._role, response.data.id_grocer);
          this.router.navigate(["/"]);
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    } else {
      console.log("Error");
    }
  }

}
