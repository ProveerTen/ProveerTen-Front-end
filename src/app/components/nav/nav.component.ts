import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  form: FormGroup;

  constructor(public auth: AuthService, private router: Router, private fb: FormBuilder, private shared: SharedService) {
    this.form = this.fb.group({
      searchTerm: ['', Validators.required]
    });
  }


  view_profile() {
    this.router.navigate(['profile']);
  }

  update_profile() {
    let id = this.auth.getId();
    this.router.navigate(['update-profile/', id])
  }

  allCompanies() {
    this.router.navigate(['viewAllcompanies/'])
  }

  deleteData_profile() {
    let id = this.auth.getId();
    this.router.navigate(['deleteData-profile/', id])
  }

  search() {
    if (this.form.valid) {
      let value = this.form.value.searchTerm;
      value = value.replace(/ /g, '_').toLowerCase();
      this.shared.changeValueRoute(value);
      // value = value.replace(/ /g, '_').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      this.form.patchValue({
        searchTerm: ''
      })
      this.router.navigate(['search', value]);
    }
  }
}
