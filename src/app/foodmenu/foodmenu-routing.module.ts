import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodmenuPage } from './foodmenu.page';

const routes: Routes = [
  {
    path: '',
    component: FoodmenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodmenuPageRoutingModule {}
