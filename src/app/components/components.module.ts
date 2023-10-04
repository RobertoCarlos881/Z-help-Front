import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComentarComponent } from './comentar/comentar.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    ComentarComponent,
    PublicacionComponent,
    LoginComponent
  ],
  exports:[
    ComentarComponent,
    PublicacionComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
