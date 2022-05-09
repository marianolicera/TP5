import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokelistPage } from './pokelist.page';

const routes: Routes = [
  {
    path: '',
    component: PokelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokelistPageRoutingModule {}
