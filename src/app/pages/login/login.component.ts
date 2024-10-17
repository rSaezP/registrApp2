import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { AlertController } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  clave: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private alertController = inject(AlertController);

  loginFailed: boolean = false;
  isLoading: boolean = false;

  ngOnInit(): void {
    // No es necesario suscribirse aquí
  }

  async login(usuario: string, clave: string) {
    this.isLoading = true;
    this.loginFailed = false;

    try {
      await this.authService.buscarBD4(usuario, clave);

      this.authService.isAuthenticated$.pipe(take(1)).subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.authService.usuarioCompleto$.pipe(take(1)).subscribe(usuarioCompleto => {
            this.usuario = '';
            this.clave = '';

            // Eliminamos la llamada a presentSuccessAlert

            if (usuarioCompleto && usuarioCompleto.rol === "docente") {
              this.router.navigate(['/docente']);
            } else if (usuarioCompleto && usuarioCompleto.rol === "alumno") {
              this.router.navigate(['/alumno']);
            }
          });
        } else {
          this.loginFailed = true;
          this.presentErrorAlert('Usuario o clave incorrectos');
        }
      });
    } catch (error) {
      console.error('Error during login:', error);
      this.loginFailed = true;
      this.presentErrorAlert('Error al iniciar sesión');
    } finally {
      this.isLoading = false;
    }
  }


  async logout() {
    try {
      await this.authService.logout();
      this.presentSuccessAlert('Sesión cerrada exitosamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during logout:', error);
      this.presentErrorAlert('Error al cerrar sesión');
    }
  }

  async presentSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  irARegistro() {
    this.router.navigate(['/registrar']);
  }

  async mostrarAlertaOlvidoContrasena() {
    const alert = await this.alertController.create({
      header: '¿Olvidó su contraseña?',
      message: '¿Desea ir a la página de recuperación de contraseña?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Ir a recuperar',
          handler: () => {
            this.router.navigate(['/recuperar-contraseña']);
          }
        }
      ]
    });

    await alert.present();
  }
}
