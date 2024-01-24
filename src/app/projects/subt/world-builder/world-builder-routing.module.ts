import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorldBuilderComponent } from './world-builder.component';

const routes: Routes = [{ path: '', component: WorldBuilderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldBuilderRoutingModule { }
