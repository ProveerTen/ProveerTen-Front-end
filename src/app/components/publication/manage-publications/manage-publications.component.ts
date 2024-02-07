import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-publications',
  templateUrl: './manage-publications.component.html',
  styleUrls: ['./manage-publications.component.css']
})
export class ManagePublicationsComponent {
  constructor(private router: Router) { }

  createPublication() {
    this.router.navigate(['create/publication'])
  }
}
