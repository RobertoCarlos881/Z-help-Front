import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotLoggedPage } from './not-logged.page';

const routes: Routes = [
  {
    path: '',
    component: NotLoggedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotLoggedPageRoutingModule {}
