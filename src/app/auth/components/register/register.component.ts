import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  showGrocerForm: boolean = true;

  toggleForm(role: string){
    if (role === 'grocer') {
      this.showGrocerForm = true; // Mostrar siempre el formulario del tendero
    } else {
      this.showGrocerForm = false; // Cambiar solo al formulario del proveedor
    }
  }
}