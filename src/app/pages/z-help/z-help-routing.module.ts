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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZHelpPageRoutingModule {}
