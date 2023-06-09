import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForoPage } from './foro.page';

const routes: Routes = [
  {
    path: '',
    component: ForoPage
  },
  {
    path: 'publicar',
    loadChildren: () => import('./publicar/publicar.module').then( m => m.PublicarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForoPageRoutingModule {}
