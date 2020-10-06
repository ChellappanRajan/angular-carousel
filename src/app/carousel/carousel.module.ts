import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { CarouselItemDirective } from './carousel-item.directive';


const COMPONENTS = [CarouselComponent,CarouselItemDirective];

@NgModule({
  declarations: [ ...COMPONENTS ],
  imports: [
    CommonModule
  ],
  exports: COMPONENTS
})
export class CarouselModule { }
