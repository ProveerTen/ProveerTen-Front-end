import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedRole: string;

  constructor(private shared: SharedService) {
    this.shared.selectedRole.subscribe(value => {
      console.log(value);
      this.setRole(value)
    })
  }

  
  setRole(role: string): void {
    this.selectedRole = role;
  }

  isRole(role: string): boolean {
    return this.selectedRole === role;
  }

}
