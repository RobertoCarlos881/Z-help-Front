import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPage } from './add.page';

const routes: Routes = [
  {
    path: '',
    component: AddPage
  },
  {
    path: 'codigo',
    loadChildren: () => import('./codigo/codigo.module').then( m => m.CodigoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPageRoutingModule {}
