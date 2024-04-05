import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import Grocer from '../../interfaces/grocer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grocer-info',
  templateUrl: './grocer-info.component.html',
  styleUrls: ['./grocer-info.component.css']
})
export class GrocerInfoComponent implements OnInit {
  form: FormGroup;
  grocer: Grocer = {} as Grocer;

  constructor(private toastr: ToastrService, private fb: FormBuilder, private client: ClientService, private router: Router) {
    this.form = this.fb.group({
      dni_grocer: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      email_grocer: ['', [Validators.email]],
      name_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      last_name_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      name_store: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      city_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      password_grocer: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      neighborhood: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      number_street: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      number_grocer: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.grocer = {
       dni_grocer: this.form.value.dni_grocer,
        email_grocer: this.form.value.email_grocer,
        name_grocer: this.form.value.name_grocer,
        last_name_grocer: this.form.value.last_name_grocer,
        name_store: this.form.value.name_store,
        city_grocer: this.form.value.city_grocer,
        password_grocer: this.form.value.password_grocer,
        number_grocer: this.form.value.number_grocer,
        neighborhood: this.form.value.neighborhood,
        street: this.form.value.street,
        number_street: this.form.value.number_street
      }
      console.log(this.grocer);

      this.client.postRequest('http://localhost:3000/register/grocer', this.grocer).subscribe({
        next: (data: any) => {
          console.log(data);
          // localStorage.setItem('token', data.token);
          this.toastr.success(data.Status, '¡Registro existoso!');
        },
        error: (e) => {
          console.log(e);
          this.toastr.error("Error al registrar la cuenta", '¡Error!');
        },
        complete: () => console.log('complete'),
      });
    } else {
      console.log('hhh');
      
      this.toastr.error('Verifique la información ingresada', '¡Error!');
    }
  }
}
