import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SorteoRoutingModule } from './sorteo-routing.module';
import { SorteoComponent } from './sorteo.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SorteoRoutingModule,

    SorteoComponent
  ]
})
export class SorteoModule { }
