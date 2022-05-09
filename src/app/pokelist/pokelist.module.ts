import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokelistPageRoutingModule } from './pokelist-routing.module';

import { PokelistPage } from './pokelist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokelistPageRoutingModule
  ],
  declarations: [PokelistPage]
})
export class PokelistPageModule {}
