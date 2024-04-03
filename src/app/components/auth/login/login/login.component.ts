import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedRole: string = "grocer";

  constructor() {
    if (localStorage.getItem('role')) {
      this.setRole(localStorage.getItem('role'))
    }
  }

  
  setRole(role: string): void {
    this.selectedRole = role;
  }

  isRole(role: string): boolean {
    return this.selectedRole === role;
  }

}
