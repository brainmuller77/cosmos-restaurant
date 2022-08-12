import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedlistPage } from './feedlist.page';

const routes: Routes = [
  {
    path: '',
    component: FeedlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedlistPageRoutingModule {}
