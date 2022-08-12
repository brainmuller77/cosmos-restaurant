import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodmenuPageRoutingModule } from './foodmenu-routing.module';

import { FoodmenuPage } from './foodmenu.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FoodmenuPageRoutingModule
  ],
  declarations: [FoodmenuPage]
})
export class FoodmenuPageModule {}
