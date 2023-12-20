import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.scss'],
})
export class TelefonosComponent  implements OnInit {
  buttonFill = 'outline'; // Valor predeterminado
  constructor() { }

  ngOnInit() {
    this.checkDarkMode();
  }

  checkDarkMode() {
    // Comprueba si el dispositivo está en modo oscuro
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Cambia el valor de buttonFill dependiendo del modo
    if (prefersDark.matches) {
      this.buttonFill = 'outline';
    } else {
      this.buttonFill = 'solid';
    }
  }

  llamar(numero: string) {
    window.open(`tel:${numero}`, '_system');
  }

}
