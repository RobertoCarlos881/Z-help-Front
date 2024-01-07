import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  private router = inject(Router);
  private storage: Storage | null = null;
  datosUsuario: any;

  constructor(
    private endpointService: EndpointService,
    private storageService: Storage,
    private authService: AuthService,
    private popoverCtrl: PopoverController) { }

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
      
      return userData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  onLogout() {
    this.authService.logout();
  }

  async eliminarUser() {
    try {
      const idUser = await this.endpointService.getUserData();
      console.log(idUser);
      this.endpointService.deleteUser(idUser).subscribe(
        response => {
            console.log(response);
            this.authService.logout();
        },
        error => {
            console.error("Error al eliminar usuario", error);
            throw error;
        }
    );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
