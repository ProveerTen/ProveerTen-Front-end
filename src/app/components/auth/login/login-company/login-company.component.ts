import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { AuthGoogleService } from 'src/app/services/auth-google/auth-google.service';

@Component({
  selector: 'app-login-company',
  templateUrl: './login-company.component.html',
  styleUrls: ['./login-company.component.css']
})
export class LoginCompanyComponent {
  loading : boolean = false
  form: FormGroup;
  data: Object = {};
  tokenId: string | null = null;

  constructor(private fb: FormBuilder, private client: ClientService, public auth: AuthService,
    private router: Router, private messageService: MessageService, private authGoogleService: AuthGoogleService) {
    this.form = this.fb.group({
      email_company: ['', [Validators.email, Validators.required]],
      password_company: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
    });
  }

  ngOnInit(): void {
    this.authGoogleService.getTokenId().subscribe(tokenId => {
      this.tokenId = tokenId;
      if (this.tokenId) {
        this.loading = true;
        this.client.postRequest(`${environment.url_auth}/login/google/company`, { "token": this.tokenId }).subscribe({
          next: (response: any) => {
            this.loading = false
            this.auth.login(response.token);
            this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'Inicio de sesión exitoso' });
            this.router.navigate(['panel']);
            this.authGoogleService.logout();
            localStorage.removeItem('role');
          },
          error: (error) => {
            console.log(error);
            this.loading = false
            if (error.status === 401) {
              this.loading = false
              this.messageService.clear();
              this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: 'Error en al iniciar sesion con google' });
              localStorage.removeItem('role');
              this.authGoogleService.logout();
            } else if (error.status === 500) {
              this.loading = false
              this.messageService.clear();
              this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: 'Se ha producido un error. Por favor, inténtelo de nuevo más tarde' });
              localStorage.removeItem('role');
              this.authGoogleService.logout();
            } else if (error.status === 409) {
              this.loading = false
              this.messageService.clear();
              this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: 'El usuario no existe en el sistema.' });
              localStorage.removeItem('role');
              this.authGoogleService.logout();
            }
          },
          complete: () => console.log('complete'),
        });
      }
    });
  }


  onSubmit() {
    this.loading = true

    setTimeout (()=>{
    if (this.form.valid) {
      this.data = {
        email_company: this.form.value.email_company,
        password_company: this.form.value.password_company,
      }

      this.client.postRequest(`${environment.url_auth}/login/company`, this.data).subscribe({
        next: (response: any) => {
          this.loading = false
          this.auth.login(response.token);
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'Inicio de sesión exitoso' });
            this.router.navigate(['panel']);
        },
        error: (error) => {
          this.loading = false
          console.log(error);
          if (error.status === 401) {
            this.messageService.clear();
            this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: 'Correo electrónico o contraseña inválidos' });
          } else if (error.status === 500) {
            this.messageService.clear();
            this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: 'Se ha producido un error. Por favor, inténtelo de nuevo más tarde' });
          } else if (error.status === 409) {
            this.messageService.clear();
            this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: 'El usuario no existe en el sistema. Verifique el correo electrónico o la contraseña.' });
          }
        },
        complete: () => console.log('complete'),
      });
    } else {
      console.log("Error");
      this.loading = false
      this.messageService.clear();
      this.messageService.add({ key: 'center', severity: 'warn', summary: 'Advertencia', detail: 'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.' });
    }
  },300)
  }

  loginGoogle() {
    localStorage.setItem('role','company')
    this.authGoogleService.login();
  }
}
