import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss'],
})
export class RecuperarComponent implements OnInit {
  email: string = ''; // Inicializa la variable
  errorMessage: string = ''; // Mensaje de error
  successMessage: string = ''; // Mostrar mensaje éxito

  constructor(private router: Router) {}

  enviarSolicitud() {
    // Resetear mensajes
    this.errorMessage = '';
    this.successMessage = '';

    // Validar si el email es válido
    if (this.validateEmail(this.email)) {
      // Aquí puedes realizar otras acciones necesarias antes de redirigir
      this.successMessage = 'Solicitud enviada correctamente'; // Mensaje de éxito en pantalla
      this.email = ''; // Limpia el campo de email
      // Redirige a login después de un tiempo (opcional)
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000); // Redirige después de 3 segundos
    } else {
      this.errorMessage = 'Ingrese un email válido.'; // Mensaje de error en pantalla
    }
  }

  volver() {
    this.router.navigate(['/login']); // Redirigir a la pantalla de login
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  ngOnInit() {}
}

