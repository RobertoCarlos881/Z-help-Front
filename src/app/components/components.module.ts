import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComentarComponent } from './comentar/comentar.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { LoginComponent } from './login/login.component';
import { UbicacionComponent } from './publicacion/ubicacion/ubicacion.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TelefonosComponent } from './telefonos/telefonos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ComentarComponent,
    PublicacionComponent,
    LoginComponent,
    UbicacionComponent,
    TelefonosComponent
  ],
  exports:[
    ComentarComponent,
    PublicacionComponent,
    LoginComponent,
    UbicacionComponent,
    TelefonosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
