import {
  Component,
  OnInit,
  ElementRef,
  ContentChildren,
  AfterContentInit,
  QueryList,ViewChild, NgZone
} from "@angular/core";
import { fromEvent } from 'rxjs';

import { CarouselItemDirective } from "./carousel-item.directive";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent implements OnInit, AfterContentInit {
  element: HTMLElement;
  sliderPosition = 0;
  visibleItem: number;
  disableNext = false;
  showPrevArrow  = false;
  set index(value) {
    this.disableNext = value < (this.carouselItems?.length - this.visibleItem);
    this.showPrevArrow = value > 0;
    this._index = value;
  // tslint:disable-next-line: typedef
  } get index() {
    return this._index;
  }
  // tslint:disable-next-line: variable-name
  private _index = 0;
  @ContentChildren(CarouselItemDirective) carouselItems: QueryList<CarouselItemDirective>;
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef<HTMLElement>;
  constructor({ nativeElement }: ElementRef, private ngZone: NgZone) {
    this.element = nativeElement;
    this.index = 0;
  }

  ngOnInit(): void {
    const scroll$ = fromEvent(window, 'resize');
    this.ngZone.runOutsideAngular(() => {
      scroll$.subscribe(() => {
        this.sliderPosition = this.carouselItems.toArray()[0].element.nativeElement.clientWidth;
        const total = Math.max(1, Math.min(Math.floor(this.element.offsetWidth / 200), this.carouselItems.length));
        this.visibleItem = total;
        this.wrapper.nativeElement.style.width = total * 200 + 'px';
      });
    });
  }

  ngAfterContentInit(): void {
    // offsetWidth
    // It includes padding border vertical height
    setTimeout(() => {

      this.sliderPosition = this.carouselItems.toArray()[0].element.nativeElement.clientWidth;
      const total = Math.max(1, Math.min(Math.floor(this.element.offsetWidth / 200), this.carouselItems.length));
      this.visibleItem = total;
      this.index = 0;
      this.wrapper.nativeElement.style.width = total * 200 + 'px';

    });
  }

  onPrevious(): void {
    this.index = this.index - 1;
    console.log(this.index);
    const zoneListContainer = document.querySelectorAll('.card');
    const sliderPosition  = this.index * this.sliderPosition;
    this.carouselItems.forEach(({ element: {nativeElement} }) =>
    nativeElement.setAttribute(
        'style',
        `transform :translateX(${-sliderPosition}px`
      )
    );
  }


  onNext(): void {
    this.index = this.index + 1;
    const sliderPosition  = this.index * this.sliderPosition;
    this.carouselItems.forEach(({ element: {nativeElement} }) =>
    nativeElement.setAttribute(
        'style',
        `transform :translateX(${-sliderPosition}px`
      )
    );
  }
}
