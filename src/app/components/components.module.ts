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


@NgModule({
  declarations: [
    ComentarComponent,
    NombreComponent,
    EscuelaComponent,
    CorreoComponent,
    BoletaComponent,
    NumeroComponent,
    PublicacionComponent,
    LoginComponent
  ],
  exports:[
    ComentarComponent,
    NombreComponent,
    EscuelaComponent,
    CorreoComponent,
    BoletaComponent,
    NumeroComponent,
    PublicacionComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
