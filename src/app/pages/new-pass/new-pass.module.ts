import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPassPageRoutingModule } from './new-pass-routing.module';

import { NewPassPage } from './new-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewPassPageRoutingModule
  ],
  declarations: [NewPassPage]
})
export class NewPassPageModule {}
