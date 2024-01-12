import { Component, OnInit, SimpleChanges, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';
import { ChangeDetectorRef } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  private router = inject(Router);
  contactos: any[] = [];
  private ngUnsubscribe = new Subject<void>();
  private refreshInterval: any;
  numContactos?: number = 0;

  constructor(private endpointService: EndpointService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.obtenerDatosContact().then(userData => {
      if (userData) {
        this.contactos = userData;
        this.numContactos = userData.length;
      } else {
        console.error("No se pudieron obtener los contactos");
      }
    });

    this.refreshInterval = interval(6000).subscribe(() => {
      this.actualizarDatos();
    });

    interval(6000).subscribe(() => {
      this.obtenerDatosContact().then(userData => {
        if (userData) {
          this.numContactos = userData.length;
        }
      });
    });
  }

  llamar(numero: string) {
    window.open(`tel:${numero}`, '_system');
  }

  anadirContacto() {
    this.router.navigateByUrl('/contacts/add')
  }
  
  perfil() {
    this.router.navigateByUrl('/perfil')
  }

  async obtenerDatosContact() {
    try {
      const idUser = await this.endpointService.getUserData(); 
      const contactData = await this.endpointService.getContactoAll(idUser);

      return contactData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async borrarContacto(id: number) {
    try {
      await this.endpointService.deleteContacto(id).pipe(takeUntil(this.ngUnsubscribe)).toPromise();

      this.contactos = this.contactos.filter(contacto => contacto.id !== id);
    } catch (error) {
      console.log(error);
      
    }
  }

  ngOnDestroy(): void {
    // Desuscribe para evitar pérdidas de memoria
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.refreshInterval.unsubscribe();
  }

  actualizarDatos() {
    this.obtenerDatosContact().then((userData) => {
      if (userData) {
        this.contactos = userData;
        this.cdr.detectChanges(); // Actualiza la vista
      } else {
        console.error('No se pudieron obtener los contactos');
      }
    });
  }
}
