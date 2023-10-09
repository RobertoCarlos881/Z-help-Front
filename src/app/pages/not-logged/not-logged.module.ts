import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotLoggedPageRoutingModule } from './not-logged-routing.module';

import { NotLoggedPage } from './not-logged.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotLoggedPageRoutingModule
  ],
  declarations: [NotLoggedPage]
})
export class NotLoggedPageModule {}
