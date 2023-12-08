import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZHelpPageRoutingModule } from './z-help-routing.module';

import { ZHelpPage } from './z-help.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZHelpPageRoutingModule
  ],
  declarations: [ZHelpPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ZHelpPageModule {}
