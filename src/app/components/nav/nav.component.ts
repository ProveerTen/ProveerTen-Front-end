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
  searchType: string = "products";
  searchTerm: string;

  constructor(public auth: AuthService, private router: Router, private fb: FormBuilder, private shared: SharedService) {
    this.form = this.fb.group({
      searchType: ['products'],
      searchTerm: ['']
    });
  }

  view_profile() {
    this.router.navigate(['profile']);
  }

  update_profile() {
    let id = this.auth.getId();
    this.router.navigate(['update-profile/', id]);
  }

  allCompanies() {
    this.router.navigate(['viewAllcompanies/']);
  }

  deleteData_profile() {
    let id = this.auth.getId();
    this.router.navigate(['deleteData-profile/', id]);
  }

  search(): void {
    this.searchTerm = this.form.get('searchTerm').value;
    if (this.searchTerm === "") {
      this.router.navigate(['search', this.searchType]);
    } else {
      this.router.navigate(['search', this.searchType, this.searchTerm]);
      this.shared.searchTerm.next(this.searchTerm);
    }
  }

  onSearchInput(): void {
    const searchTerm = this.form.get('searchTerm').value;
    this.shared.searchTerm.next(searchTerm);
  }

  onSearchTypeChange(newValue: string) {
    this.shared.type.next(newValue);
  }

}
