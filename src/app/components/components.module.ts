import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComentarComponent } from './comentar/comentar.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { LoginComponent } from './login/login.component';
import { NombreComponent } from './edit/nombre/nombre.component';
import { EscuelaComponent } from './edit/escuela/escuela.component';
import { CorreoComponent } from './edit/correo/correo.component';
import { BoletaComponent } from './edit/boleta/boleta.component';
import { NumeroComponent } from './edit/numero/numero.component';
import { UbicacionComponent } from './publicacion/ubicacion/ubicacion.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ComentarComponent,
    NombreComponent,
    EscuelaComponent,
    CorreoComponent,
    BoletaComponent,
    NumeroComponent,
    PublicacionComponent,
    LoginComponent,
    UbicacionComponent
  ],
  exports:[
    ComentarComponent,
    NombreComponent,
    EscuelaComponent,
    CorreoComponent,
    BoletaComponent,
    NumeroComponent,
    PublicacionComponent,
    LoginComponent,
    UbicacionComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
