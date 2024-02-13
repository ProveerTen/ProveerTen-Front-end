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
      element.src = 'https://res.cloudinary.com/ddio1oisb/image/upload/v1707856438/oxp0zsvbcvsfe67wmngr.png';
    } else if (this.imageType === 'cover') {
      element.src = 'https://res.cloudinary.com/ddio1oisb/image/upload/v1707797559/pngvkepjh9pewj1xkek0.jpg';
    }
  }

}
