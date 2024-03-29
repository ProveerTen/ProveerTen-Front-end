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
  /*
  selectedOption: string;
  value: string;
  dataCategories: any;
  categoriesCheckbox: string[] = []

  constructor(private client: ClientService, public auth: AuthService, public shared: SharedService, private routerActivate: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.value = this.routerActivate.snapshot.params['value'];
    // this.shared.changeValueRoute(this.value);
    this.shared.searchOption.subscribe(option => {
      this.selectedOption = option;
    })
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
      this.router.navigate(['search', 'companies']);
      return;
    }
    this.shared.changeSearchOption('products');
    this.router.navigate(['search', 'products']);
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
    this.shared.changeValueRoute(null);
  }
  */

  type: string;
  value: string;
  valueCategory: any
  filter: any;
  categories: any;
  categoriesCheckbox: string[] = []
  selectedCategory: any = '';
  selectedSubCategory: any = '';
  subCategories: any;

  constructor(private client: ClientService, public auth: AuthService, public shared: SharedService, private routerActivate: ActivatedRoute, private router: Router) {
    this.shared.type.subscribe(type => {
      this.type = type
    })


  }

  ngOnInit(): void {
    this.type = this.routerActivate.snapshot.params['type'];
    this.value = this.routerActivate.snapshot.params['value'];
    this.client.getRequest(`${environment.url_logic}/category/categories`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.categories = response.categories[0].map(category => ({ ...category, isSelected: false }));
        this.filter = this.categories.slice();

      },
      error: (error) => {
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  setOption(option: string): void {
    this.type = option;
    if (option === 'companies') {
      this.router.navigate(['search', this.type]);
      return;
    }
    this.router.navigate(['search', this.type]);
  }

  updateSelectionCategory(name_category: any) {
    if (this.categories) {
      console.log(this.selectedCategory);

      if (name_category === this.selectedCategory) {
        console.log(name_category === this.selectedCategory);
        name_category = "";
        this.selectedCategory = "";
      } else {
        this.categories.forEach(category => {
          if (category.name_category === name_category) {
            category.isSelected = true;
            this.selectedCategory = name_category;
          } else {
            category.isSelected = false;
          }
        });
      }
      this.shared.category.next(name_category)
    }
    this.showSubcategories();
  }

  updateSelectionSubCategory(name_subCategory: any) {

    if (name_subCategory === this.selectedSubCategory) {
      name_subCategory = "";
      this.selectedSubCategory = "";
    } else {
      this.subCategories.forEach(sub_category => {
        if (sub_category.name_subcategory === name_subCategory) {
          sub_category.isSelected = true;
          this.selectedSubCategory = name_subCategory;
        } else {
          sub_category.isSelected = false;
        }
      });
    }

    this.shared.product_sub_category.next(name_subCategory)
  }



  showSubcategories() {
    if (this.selectedCategory) {
      this.client.postRequest(`${environment.url_logic}/view/subCategories`, { "name_category": this.selectedCategory }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.subCategories = response.categories.map(sub_category => ({ ...sub_category, isSelected: false }));


        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    }
  }

  /*
  verifyCheckbox(value: string) {
    let pos = this.categoriesCheckbox.indexOf(value);
    if (pos === -1) {
      this.categoriesCheckbox.push(value);
      this.shared.categoriesList.next(this.categoriesCheckbox)
    } else {
      this.categoriesCheckbox.splice(pos, 1)
      this.shared.categoriesList.next(this.categoriesCheckbox)
    }
  }
*/


  searchCategory() {
    if (this.valueCategory !== "") {
      this.categories = this.filter.filter((category: any) => {
        return (
          this.removeAccents(category.name_category).toLowerCase().includes(this.removeAccents(this.valueCategory).toLowerCase())
        );
      });
    } else {
      this.categories = this.filter;
    }
    console.log(this.categoriesCheckbox);
  }

  removeAccents(text: string): string {
    if (!text) {
      return '';
    }
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

}