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
      this.type = type;
      this.setOption(type);
    })


  }

  ngOnInit(): void {
    this.type = this.routerActivate.snapshot.params['type'];
    this.value = this.routerActivate.snapshot.params['value'];
    this.client.getRequest(`${environment.url_logic}/category/categories`, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.categories = response.categories[0].map(category => ({ ...category, isSelected: false }));
        this.filter = this.categories.slice();

        this.shared.home_category.subscribe((category: any) => {
          if (category !== null) {
            this.updateSelectionCategory(category)
          }
        })


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
      if (name_category === this.selectedCategory) {
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

    this.shared.sub_category.next(name_subCategory)
  }



  showSubcategories() {
    if (this.selectedCategory) {
      this.client.postRequest(`${environment.url_logic}/view/subCategories`, { "name_category": this.selectedCategory }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.subCategories = response.categories.map(sub_category => ({ ...sub_category, isSelected: false }));
        },
        error: (error) => {
          console.log(error.error.Status);
        },
        complete: () => console.log('complete'),
      });
    }
    this.shared.sub_category.next('');
  }


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