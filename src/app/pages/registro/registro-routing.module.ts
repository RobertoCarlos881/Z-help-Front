import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPage } from './registro.page';
import { isNotAuthenticatedGuard } from 'src/app/auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [isNotAuthenticatedGuard],
    component: RegistroPage
  },
  {
    path: 'codigo',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./codigo/codigo.module').then( m => m.CodigoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPageRoutingModule {}
