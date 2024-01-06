import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user$?: Promise<any>;
  private router = inject(Router);
  private storage: Storage | null = null;
  datosUsuario: any;

  constructor(
    private endpointService: EndpointService,
    private storageService: Storage,
    private authService: AuthService) { }

  async ngOnInit() {
    const storage = await this.storageService.create();
    this.storage = storage;
    this.obtenerDatosUser().then(userData => {
      this.datosUsuario = userData;
    });
  }

  perfilEdit() {
    this.router.navigateByUrl('/perfil/edit')
  }

  async obtenerDatosUser() {
    try {
      const idUser = await this.endpointService.getUserData(); 
      const userData = await this.endpointService.getUser(idUser);
      
      console.log("Datos del usuario:", userData);
      return userData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
