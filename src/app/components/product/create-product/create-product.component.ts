import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import product from 'src/app/interfaces/product';
import { MessageService } from 'primeng/api';
import { format } from 'date-fns';

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

  constructor(private fb: FormBuilder, private client: ClientService, public auth: AuthService,
    private router: Router, private messageService: MessageService) {
    this.form = this.fb.group({
      name_product: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      description_product: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
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
    })
  }

  onSubmit() {

    const dateCreate: string = format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS');
    // const dateCreate: string = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'');
    console.log("currente date rr", dateCreate);
    
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
      formData.append('date_creation', dateCreate)

      this.categoriesCheckbox.forEach(category => {
        formData.append('categories[]', category);
      })
      formData.append('image_product', this.imageFile);

      this.client.postRequest(`${environment.url_logic}/product/create`, formData, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          console.log(response);
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'El producto se ha creado exitosamente' });
          setTimeout(() => {
            this.router.navigate(['manage/products']);
          }, 1500);
        },
        error: (error) => {
          console.log(error);
          this.messageService.clear();
          this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: error.error });
        },
        complete: () => console.log('complete'),
      });

    } else {
      console.log("Error");
      this.messageService.clear();
      this.messageService.add({
        key: 'center', severity: 'warn', summary: 'Advertencia',
        detail: 'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.'
      });
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
