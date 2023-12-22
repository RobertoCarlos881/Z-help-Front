import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private authService = inject( AuthService )
  private fb = inject( FormBuilder );
  private router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  login() {
    const { telefono, password } = this.myForm.value;
    console.log("Ya inicie sesion");
    console.log(telefono);
    console.log(password);
    this.authService.login(telefono, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/z-help/inicio'),
        error: (message) => {
          console.log("aqui hay error", message);
          
          //Swal.fire('Error', message, 'error')
        }
      })
  }

  onSubmit() {
    console.log("Ya inicie sesion");

    this.router.navigate(['/teacher']);
  }

  recuperarContrasena() {
    console.log("Recupera tu contraseña");

    this.router.navigate(['/auth/login/recovery-password']);
  }

}
