// popular-products-slider.component.ts
import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

@Component({
  selector: 'app-popular-products-slider',
  templateUrl: './popular-products-slider.component.html',
  styleUrls: ['./popular-products-slider.component.css']
})
export class PopularProductsSliderComponent implements OnInit {
  currentIndex = 0;
  products: Product[] = [
    { id: 1, name: 'Product 1', imageUrl: 'https://shorter.me/c-BL1', likes: 10, comments: 5 },
    { id: 2, name: 'Product 2', imageUrl: 'https://shorter.me/U6aVm', likes: 15, comments: 8 },
    { id: 3, name: 'Product 3', imageUrl: 'https://shorter.me/q1sOP', likes: 20, comments: 12 },
    { id: 4, name: 'Product 1', imageUrl: 'https://colanta.vtexassets.com/arquivos/ids/156442/7702129001052-1.png?v=638076867057230000', likes: 10, comments: 5 },
    { id: 5, name: 'Product 2', imageUrl: 'https://shorter.me/5TwIi', likes: 15, comments: 8 },
    { id: 6, name: 'Product 3', imageUrl: 'https://shorter.me/mcjfy', likes: 20, comments: 12 },
    
    // Agrega más productos según sea necesario
  ];

  // Cantidad de productos a mostrar a la vez
  productsToShow = 3;

  get visibleProducts(): Product[] {
    const start = this.currentIndex;
    const end = start + this.productsToShow;
    return this.products.slice(start, end);
  }

  constructor() { }

  ngOnInit(): void {}

  likeProduct(product: Product): void {
    console.log('Like:', product.name);
    // Lógica para manejar el "Me gusta" del producto
  }

  commentProduct(product: Product): void {
    console.log('Comment:', product.name);
    // Lógica para manejar el "Comentar" del producto
  }

  shareProduct(product: Product): void {
    console.log('Share:', product.name);
    // Lógica para manejar el "Compartir" del producto
  }

  nextProducts(): void {
    this.currentIndex = Math.min(this.currentIndex + this.productsToShow, this.products.length - this.productsToShow);
  }

  prevProducts(): void {
    this.currentIndex = Math.max(this.currentIndex - this.productsToShow, 0);
  }
}




