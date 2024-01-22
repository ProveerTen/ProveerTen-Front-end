import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public auth: AuthService) {
    this.auth.isCompany().subscribe(companyValue => {
      console.log('Valor actual de company:', companyValue);
      // Hacer algo con el valor, por ejemplo, mostrar u ocultar elementos en el componente
    });
    console.log(this.auth.getRole());


  }

}
