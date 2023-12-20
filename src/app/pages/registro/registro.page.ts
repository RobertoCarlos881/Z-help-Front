import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro: FormGroup;
  
  constructor(public fb: FormBuilder) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'Correo electronico': new FormControl("", Validators.required),
      'Numero de celular': new FormControl("", Validators.required),
    });
  }
  ngOnInit() {
  }
  async abrirTerminosYCondiciones() {
    await Browser.open({ url: '/assets/TÉRMINOS Y CONDICIONES DE USO DE LA APLICACIÓN.pdf' });
  }

}
