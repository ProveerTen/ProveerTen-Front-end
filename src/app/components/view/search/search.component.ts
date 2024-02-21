import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client/client.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  selectedOption: string;
  value: string;
  dataCategories: any;
  categoriesCheckbox: string[] = []

  constructor(private client: ClientService, public auth: AuthService, private shared: SharedService, private routerActivate: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.value = this.routerActivate.snapshot.params['value'];
    // this.shared.changeValueRoute(this.value);
    if (this.value != '') {
      this.selectedOption = 'products';
    } else {
      this.shared.searchOption.subscribe(option => {
        this.selectedOption = option;
      })
    }
    this.client.getRequest(`${environment.url_logic}/category/categories`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.dataCategories = response.categories[0];
        console.log(this.dataCategories);
      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  setOption(option: string): void {
    this.selectedOption = option;
    if (option === 'companies') {
      this.shared.changeSearchOption('companies');
      return;
    }
    this.shared.changeSearchOption('products');
  }

  isOption(option: string): boolean {
    return this.selectedOption === option;
  }

  verifyCheckbox(value: string) {
    let pos = this.categoriesCheckbox.indexOf(value);
    if (pos === -1) {
      this.categoriesCheckbox.push(value);
    } else {
      this.categoriesCheckbox.splice(pos, 1)
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.shared.changeValueRoute(null);
  }
}