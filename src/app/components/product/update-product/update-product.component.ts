import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

import product from 'src/app/interfaces/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  form: FormGroup;
  imageFile: any;
  imagePreview: any;
  isValidImage: boolean = true;
  product: product = {} as product;
  dataCategories: any;
  categoriesCheckbox: string[] = []

  constructor(private fb: FormBuilder, private client: ClientService, public auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      name_product: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      description_product: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(80)]],
      purchase_price_product: ['', [Validators.required]],
      unit_purchase_price_product: ['', [Validators.required]],
      suggested_unit_selling_price_product: [''],
      purchase_quantity: ['', [Validators.required]],
      stock_product: ['', [Validators.required]],
      content_product: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      image_product: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
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


}
