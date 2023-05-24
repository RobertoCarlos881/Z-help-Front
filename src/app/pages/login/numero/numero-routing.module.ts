import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NumeroPage } from './numero.page';

const routes: Routes = [
  {
    path: '',
    component: NumeroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NumeroPageRoutingModule {}
