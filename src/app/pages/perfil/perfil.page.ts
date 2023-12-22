import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user$?: Promise<any>;
  private router = inject(Router);
  private storage: Storage | null = null;

  constructor(private endpointService: EndpointService,
    private storageService: Storage,) { }

  async ngOnInit() {
    const storage = await this.storageService.create();
    this.storage = storage;

    this.user$ = this.storage.get('user')
      .then(user => user)
      .catch(error => {
        console.error("Error al obtener el usuario:", error);
        return null;
      });

    const user = await this.user$;
    if (user) {
      const data = this.endpointService.getUser(user.id_usuario);
      console.log("data", data);
      
    }

  }

  perfilEdit() {
    this.router.navigateByUrl('/perfil/edit')
  }

  obtenerDatosUser() {

  }
}
