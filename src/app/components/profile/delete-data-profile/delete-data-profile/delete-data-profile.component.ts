import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-delete-data-profile',
  templateUrl: './delete-data-profile.component.html',
  styleUrls: ['./delete-data-profile.component.css']
})
export class DeleteDataProfileComponent {

  constructor(public auth:AuthService) {
    
  }
}
