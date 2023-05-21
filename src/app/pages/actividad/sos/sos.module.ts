import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SOSPageRoutingModule } from './sos-routing.module';

import { SOSPage } from './sos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SOSPageRoutingModule
  ],
  declarations: [SOSPage]
})
export class SOSPageModule {}
