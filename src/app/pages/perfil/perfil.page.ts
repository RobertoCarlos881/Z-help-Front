import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  private router = inject(Router);
  datosUsuario: any;

  constructor(
    private endpointService: EndpointService,
    private authService: AuthService,
    ) { }

  async ngOnInit() {
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
