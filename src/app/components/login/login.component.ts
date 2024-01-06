import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private authService = inject( AuthService )
  private fb = inject( FormBuilder );
  private router = inject(Router);
  constructor(private popoverController: PopoverController) {}
  public myForm: FormGroup = this.fb.group({
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  login() {
    const { telefono, password } = this.myForm.value;
    this.authService.login(telefono, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/z-help/inicio'),
        error: (message) => {
          console.log("aqui hay error", message);
          
          //Swal.fire('Error', message, 'error')
        }
      })
  }

  closePopover() {
    // Cerrar el Popover
    this.popoverController.dismiss();
  }

  onSubmit() {
    this.router.navigate(['/z-help/inicio']);
  }

  recuperarContrasena() {
    this.router.navigate(['/auth/login/recovery-password']);
  }

}
