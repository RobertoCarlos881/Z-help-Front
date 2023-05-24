import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaestroEmpleadoPage } from './maestro-empleado.page';

const routes: Routes = [
  {
    path: '',
    component: MaestroEmpleadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaestroEmpleadoPageRoutingModule {}
