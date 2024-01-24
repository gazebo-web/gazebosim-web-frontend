import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WorldBuilderComponent } from './world-builder.component';
import { WorldBuilderRoutingModule } from './world-builder-routing.module';

@NgModule({
  declarations: [ WorldBuilderComponent ],
  imports: [
    CommonModule,
    RouterModule,
    WorldBuilderRoutingModule
  ]
})
export class WorldBuilderModule { }
