import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBrokenImageProfile]'
})
export class BrokenImageProfileDirective {

  constructor(private elementRef: ElementRef) { }

  @Input() imageType!: string;

  @HostListener('error')
  load_default_image() {
    const element = this.elementRef.nativeElement;
    if (this.imageType === 'photo') {
      element.src = 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg';
    } else if (this.imageType === 'cover') {
      element.src = 'https://wallpapers.com/images/featured/solid-grey-ew5fya1gh2bgc49b.jpg';
    }
  }

}
