import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contactos = [//en este arreglo guardas los contactos de la base, los que tengo aqui adentro son puros ejemplos
    { nombre: 'Roberto', numero: '55-5546-8586' },
    { nombre: 'Praxedes', numero: '55-5546-8586' },
    { nombre: 'Bryan', numero: '55-5546-8586' }
  ];
  constructor() { }

  ngOnInit() {
  }

  llamar(numero: string) {
    window.open(`tel:${numero}`, '_system');
  }

  

}
