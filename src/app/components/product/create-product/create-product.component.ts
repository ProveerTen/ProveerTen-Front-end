import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

import product from 'src/app/interfaces/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})

export class CreateProductComponent {

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

  onSubmit() {
    if (this.form.valid && this.categoriesCheckbox.length > 0) {
      this.isValidImage = false;
      const formData = new FormData();
      formData.append('name_product', this.form.value.name_product);
      formData.append('description_product', this.form.value.description_product);
      formData.append('purchase_price_product', this.form.value.purchase_price_product);
      formData.append('unit_purchase_price_product', this.form.value.unit_purchase_price_product);
      formData.append('suggested_unit_selling_price_product', this.form.value.suggested_unit_selling_price_product);
      formData.append('purchase_quantity', this.form.value.purchase_quantity);
      formData.append('stock_product', this.form.value.stock_product);
      formData.append('availability_product', 'Disponible');
      formData.append('content_product', this.form.value.content_product);
      this.categoriesCheckbox.forEach(category => {
        formData.append('categories[]', category);
      })
      formData.append('image_product', this.imageFile);

      this.client.postRequest(`${environment.url_logic}/product/create`, formData, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.router.navigate(['manage/products']);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => console.log('complete'),
      });

    } else {
      console.log('ÑO');
    }
  }

  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
    if (this.imageFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.imageFile);
      this.isValidImage = true;
    } else {
      this.isValidImage = false;
    }
  }

  verifyCheckbox(value: string) {
    let pos = this.categoriesCheckbox.indexOf(value);
    if (pos === -1) {
      this.categoriesCheckbox.push(value);
    } else {
      this.categoriesCheckbox.splice(pos, 1)
    }
  }

}
