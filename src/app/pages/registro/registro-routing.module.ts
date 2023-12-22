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
  },
  // {
  //   path: 'alumno',
  //   loadChildren: () => import('./alumno/alumno.module').then( m => m.AlumnoPageModule)
  // },
  // {
  //   path: 'maestro-empleado',
  //   loadChildren: () => import('./maestro-empleado/maestro-empleado.module').then( m => m.MaestroEmpleadoPageModule)
  // },
  {
    path: 'password',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./password/password.module').then( m => m.PasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPageRoutingModule {}
