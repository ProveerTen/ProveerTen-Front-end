import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

import product from 'src/app/interfaces/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  loading : boolean = false
  form: FormGroup;
  imageFile: any;
  imagePreview: any;
  isValidImage: boolean = true;
  product: product = {} as product;
  dataCategories: any;
  categoriesCheckbox: string[] = []
  id!: string;
  data: any;

  constructor(private fb: FormBuilder, private client: ClientService, public auth: AuthService, private router: Router, private routerActivate: ActivatedRoute, private messageService: MessageService) {
    this.form = this.fb.group({
      name_product: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      description_product: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      purchase_price_product: ['', [Validators.required]],
      unit_purchase_price_product: ['', [Validators.required]],
      suggested_unit_selling_price_product: [''],
      purchase_quantity: ['', [Validators.required]],
      stock_product: ['', [Validators.required]],
      content_product: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      image_product: [''],
    });
  }

  ngOnInit(): void {
      this.loading = true
    this.id = this.routerActivate.snapshot.params['id'];
    this.client.postRequest(`${environment.url_logic}/product/detail`, { id_product: this.id }, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
      next: (response: any) => {
        this.loading = false
        this.data = response.categoriesByProducts[0];
        console.log(this.data);
        this.form.patchValue({
          name_product: this.data.name_product,
          description_product: this.data.description_product,
          purchase_price_product: this.data.purchase_price_product,
          unit_purchase_price_product: this.data.unit_purchase_price_product,
          suggested_unit_selling_price_product: this.data.suggested_unit_selling_price_product,
          purchase_quantity: this.data.purchase_quantity,
          stock_product: this.data.stock_product,
          content_product: this.data.content_product
        })
      },
      error: (error) => {
        this.loading = false
        console.log(error.error.Status);
      },
      complete: () => console.log('complete'),
    });
  }

  onSubmit() {
    this.loading = true;
    setTimeout (()=>{
    if (this.form.valid) {
      this.isValidImage = false;
      const formData = new FormData();
      formData.append('id_product', this.id);
      formData.append('name_product', this.form.value.name_product);
      formData.append('description_product', this.form.value.description_product);
      formData.append('purchase_price_product', this.form.value.purchase_price_product);
      formData.append('unit_purchase_price_product', this.form.value.unit_purchase_price_product);
      formData.append('suggested_unit_selling_price_product', this.form.value.suggested_unit_selling_price_product);
      formData.append('purchase_quantity', this.form.value.purchase_quantity);
      formData.append('stock_product', this.form.value.stock_product);
      formData.append('availability_product', 'Disponible');
      formData.append('content_product', this.form.value.content_product);
      formData.append('image_product', this.imageFile);




      this.client.postRequest(`${environment.url_logic}/product/update`, formData, undefined, { "Authorization": `Bearer ${this.auth.getToken()}` }).subscribe({
        next: (response: any) => {
          this.loading = false
          console.log(response);
          this.messageService.add({ key: 'center', severity: 'success', summary: 'Éxito', detail: 'El producto se ha sido actualizado exitosamente' });
          setTimeout(() => {
            this.router.navigate(['manage/products']);
          }, 1500);
        },
        error: (error) => {
          this.loading = false
          console.log(error);
          this.isValidImage = true;
          this.messageService.add({ key: 'center', severity: 'error', summary: 'Error', detail: error.error });
        },
        complete: () => console.log('complete'),
      });
    } else {
      console.log('error');
      this.loading = false
      this.messageService.clear();
      this.messageService.add({ key: 'center', severity: 'warn', summary: 'Advertencia', detail: 'Los campos ingresados son inválidos. Por favor, revise la información proporcionada.' });
    }
  }, 400)

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
      this.messageService.add({ key: 'center', severity: 'warn', summary: 'Advertencia', detail: 'Los tipo de archivo ingresado es inválido. Por favor, subir una imagen.' });
      this.isValidImage = false;
    }
  }
}
