import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZHelpPage } from './z-help.page';

const routes: Routes = [
  
  {
    path: '',
    component: ZHelpPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule )
      },
      {
        path: 'contacts',
        loadChildren: () => import('../contacts/contacts.module').then( m => m.ContactsPageModule )
      },
      {
        path: 'foro',
        loadChildren: () => import('../foro/foro.module').then( m => m.ForoPageModule)
      },
      {
        path: 'actividad',
        loadChildren: () => import('../actividad/actividad.module').then( m => m.ActividadPageModule)
      },
      {
        path: '',
        redirectTo: '/z-help/inicio',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZHelpPageRoutingModule {}
