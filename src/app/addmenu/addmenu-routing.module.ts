import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmenuPage } from './addmenu.page';

const routes: Routes = [
  {
    path: '',
    component: AddmenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmenuPageRoutingModule {}
