import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBrokenImage]'
})
export class BrokenImageDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('error')
  load_default_image() {
    const element = this.elementRef.nativeElement;
    element.src = 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=';
  }

}
