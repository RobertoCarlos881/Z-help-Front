import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'not-logged',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'contacts',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./pages/contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: 'z-help',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./pages/z-help/z-help.module').then( m => m.ZHelpPageModule)
  },
  {
    path: 'foro',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./pages/foro/foro.module').then( m => m.ForoPageModule)
  },
  {
    path: 'actividad',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./pages/actividad/actividad.module').then( m => m.ActividadPageModule)
  },
  {
    path: 'perfil',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'registro',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'not-logged',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./pages/not-logged/not-logged.module').then( m => m.NotLoggedPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
