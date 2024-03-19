import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBrokenImage]'
})
export class BrokenImageDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('error')
  load_default_image() {
    const element = this.elementRef.nativeElement;
    element.src = 'https://res.cloudinary.com/ddio1oisb/image/upload/v1710826205/mk9bis2e6gvqt075hviv.png';
  }

}
