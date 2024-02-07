import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-providers',
  templateUrl: './manage-providers.component.html',
  styleUrls: ['./manage-providers.component.css']
})
export class ManageProvidersComponent {

  constructor(private router: Router) { }

  createProvider() {
    this.router.navigate(['create/provider']);
  }

  goBack() {
    this.router.navigate(['panel']);
  }
}
