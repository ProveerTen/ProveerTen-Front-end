// advertising-slider.component.ts
import { Component, OnInit } from '@angular/core';

interface Slide {
  id: number;
  content: string;
  imageUrl: string;
}

@Component({
  selector: 'app-advertising-slider',
  templateUrl: './advertising-slider.component.html',
  styleUrls: ['./advertising-slider.component.css']
})
export class AdvertisingSliderComponent implements OnInit {
  currentIndex = 0;
  slides: Slide[] = [
    { id: 1, content: '', imageUrl: 'https://www.ardiseny.es/wordpress/http://wp.ardiseny.es/wp-content/uploads/2017/10/promociones-en-carta.jpg' },
    { id: 2, content: '', imageUrl: 'https://images.unsplash.com/photo-1566769745191-cd26a9147e29?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, content: '', imageUrl: 'https://images.unsplash.com/photo-1570909034071-13a9b29807d3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    // Agrega más slides según sea necesario
  ];

  constructor() { }

  ngOnInit(): void {
    this.startAutoPlay();
  }

  showSlide(index: number): void {
    this.currentIndex = index;
    this.resetAutoPlay();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.resetAutoPlay();
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.resetAutoPlay();
  }

  private startAutoPlay(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private resetAutoPlay(): void {
    // Reinicia el temporizador para evitar cambios automáticos después de la interacción manual
  }
}

