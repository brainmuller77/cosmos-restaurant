import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmenuPageRoutingModule } from './addmenu-routing.module';

import { AddmenuPage } from './addmenu.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    AddmenuPageRoutingModule
  ],
  declarations: [AddmenuPage]
})
export class AddmenuPageModule {}
