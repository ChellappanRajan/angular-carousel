import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appcarouselItem]'
})
export class CarouselItemDirective implements AfterViewInit{


  constructor(public element: ElementRef<HTMLElement>) { }


  ngAfterViewInit() {
    // clientWidth
    // It exclude borders, margin, vertical scrollbar, it only includes innerWidth
    // It will be zero for inline element.
    console.log(this.element.nativeElement.clientWidth);
  }
}
