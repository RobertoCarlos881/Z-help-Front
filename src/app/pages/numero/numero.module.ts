import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NumeroPageRoutingModule } from './numero-routing.module';

import { NumeroPage } from './numero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NumeroPageRoutingModule
  ],
  declarations: [NumeroPage]
})
export class NumeroPageModule {}
