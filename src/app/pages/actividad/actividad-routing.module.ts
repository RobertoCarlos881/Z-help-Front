import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadPage } from './actividad.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadPage
  },
  {
    path: 'sos',
    loadChildren: () => import('./sos/sos.module').then( m => m.SOSPageModule)
  },
  {
    path: 'zone',
    loadChildren: () => import('./zone/zone.module').then( m => m.ZonePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadPageRoutingModule {}
