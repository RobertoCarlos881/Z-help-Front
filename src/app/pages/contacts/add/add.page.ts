import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EndpointService } from 'src/app/services/endpoint.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  private router = inject(Router);
  private fb = inject( FormBuilder );

  public myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]]
  });
  
  constructor(private endpointService: EndpointService) { }

  ngOnInit() {
  }

  async guardar() {
    const idUser = await this.endpointService.getUserData(); 
    const { nombre, telefono } = this.myForm.value;
    
    this.endpointService.createContacto(nombre, telefono, idUser)
      .subscribe({
        next: () => this.router.navigateByUrl('/z-help/contacts'),
        error: (message) => {
          console.log("Aqui esta el error", message);
        }
      })
  }

  volver() {
    this.router.navigateByUrl('/z-help/contacts')
  }

}
