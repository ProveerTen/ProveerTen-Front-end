import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  selectedRole = "grocer";

  setRole(role: string): void {
    this.selectedRole = role;
  }

  isRole(role: string): boolean {
    return this.selectedRole === role;
  }
}
