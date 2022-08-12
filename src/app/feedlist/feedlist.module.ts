import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedlistPageRoutingModule } from './feedlist-routing.module';

import { FeedlistPage } from './feedlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    
    FeedlistPageRoutingModule
  ],
  declarations: [FeedlistPage]
})
export class FeedlistPageModule {}
