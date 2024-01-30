import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-grocer',
  templateUrl: './login-grocer.component.html',
  styleUrls: ['./login-grocer.component.css']
})

export class LoginGrocerComponent {

  form: FormGroup;
  data: Object = {};

  constructor(private fb: FormBuilder, private client: ClientService, public auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      email_grocer: ['', [Validators.email]],
      password_grocer: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.data = {
        email_grocer: this.form.value.email_grocer,
        password_grocer: this.form.value.password_grocer
      }
      this.client.postRequest(`${environment.url_auth}/login/grocer`, this.data).subscribe({
        next: (response: any) => {
          this.auth.login(response.token);
          this.router.navigate(["/"]);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => console.log('complete'),
      });
    } else {
      console.log("Error");
    }
  }
}
