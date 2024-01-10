import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EndpointService } from 'src/app/services/endpoint.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  datosUsuario: any;

  private router = inject(Router);
  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.minLength(2)]],
    correo_electronico: ['', [Validators.minLength(8), Validators.email]],
    escuela: ['', [Validators.minLength(2)]],
    boleta: ['', [Validators.minLength(10)]]
  });

  constructor(
    private endpointService: EndpointService
  ) { }

  async ngOnInit() {
    await this.obtenerDatosUser().then(userData => {
      this.datosUsuario = userData;

      this.myForm.patchValue({
        nombre: this.datosUsuario.nombre,
        correo_electronico: this.datosUsuario.email,
        escuela: this.datosUsuario.institucion,
        boleta: this.datosUsuario.identificador_politecnico
      });
    });
  }

  async editar() {
    const idUser = await this.endpointService.getUserData();
    const { nombre, correo_electronico, escuela, boleta } = this.myForm.value;

    this.endpointService.updateUser(idUser, nombre, correo_electronico, escuela, boleta)
      .subscribe({
        next: () => this.router.navigateByUrl('/z-help/contacts'),
        error: (message) => {
          console.log("Aqui esta el error", message);
        }
      })
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

}

