import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss'],
})
export class RecuperarComponent implements OnInit {
  email: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async enviarSolicitud() {
    if (this.validateEmail(this.email)) {
      // Aquí iría la lógica para enviar el correo de recuperación
      // Por ahora, simularemos que se ha enviado correctamente
      await this.presentSuccessAlert();
      this.email = ''; // Limpia el campo de email
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      await this.presentErrorAlert('Por favor, ingrese un email válido.');
    }
  }

  volver() {
    this.router.navigate(['/login']);
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  async presentSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Se ha enviado un correo de recuperación a su dirección de email.',
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
}
