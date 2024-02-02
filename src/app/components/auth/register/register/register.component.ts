import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  selectedRole = "company";


  setRole(role: string): void {
    this.selectedRole = role;
  }

  isRole(role: string): boolean {
    console.log(role);
    
    return this.selectedRole === role;
  }
}
