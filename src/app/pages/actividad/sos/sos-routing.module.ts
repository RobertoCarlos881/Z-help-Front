import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SOSPage } from './sos.page';

const routes: Routes = [
  {
    path: '',
    component: SOSPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SOSPageRoutingModule {}
