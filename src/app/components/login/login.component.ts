import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private authService = inject( AuthService )
  private fb = inject( FormBuilder );
  private router = inject(Router);
  constructor(private popoverController: PopoverController, private toastController: ToastController) {}
  public myForm: FormGroup = this.fb.group({
    telefono: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[0-9]+$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  login() {
    const { telefono, password } = this.myForm.value;
    this.authService.login(telefono, password)
      .subscribe({
        next: () => {
                      this.router.navigateByUrl('/z-help/inicio');
                      this.closePopover();},
        error: (message) => {
          this.presentToast('<h2>Número telefónico o contraseña erróneos</h2>');
          console.log("aqui hay error", message);
        }
      })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1800,
      position: 'middle',
      color: 'danger',
      animated: true,
      cssClass: 'toast-message',
    });
    await toast.present();
  }

  closePopover() {
    this.popoverController.dismiss();
  }

  onSubmit() {
    this.router.navigate(['/z-help/inicio']);
  }

  recuperarContrasena() {
    this.router.navigate(['/auth/login/recovery-password']);
  }

}
