import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaestroEmpleadoPageRoutingModule } from './maestro-empleado-routing.module';

import { MaestroEmpleadoPage } from './maestro-empleado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaestroEmpleadoPageRoutingModule
  ],
  declarations: [MaestroEmpleadoPage]
})
export class MaestroEmpleadoPageModule {}
