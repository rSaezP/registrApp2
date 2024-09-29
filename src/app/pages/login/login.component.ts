import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  usuario: string = ''; // Campo de entrada para el usuario
  clave: string = ''; // Campos de entrada para el usuario y clave

  private authService = inject(AuthService);  // Obtener el servicio de autenticación
  private router = inject(Router);  // Obtener el servicio de navegación

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();
  loginFailed: boolean = false; // Variable para almacenar el estado de loginFailed

  ngOnInit(): void {
    this.authService.loginFailed$.subscribe(loginFailed => this.loginFailed = loginFailed); // Obtener el estado de loginFailed
  }

  constructor() {}
  isLoading: boolean = false;
  async login(usuario: string, clave: string) {

    this.isLoading = true; // Activar el estado de carga
    await this.authService.buscarBD4(usuario, clave); // Intentar hacer login
    this.isLoading = false; // Desactivar el estado de carga una vez que la autenticación termine

    // Suscribirse al observable para verificar el estado de autenticación
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {

      this.authService.usuarioCompleto$.subscribe(usuarioCompleto => {
        if (isAuthenticated) {
          this.usuario = ''; // Limpiar el campo de usuario
          this.clave = ''; // Limpiar el campo de clave

          if (usuarioCompleto && usuarioCompleto.rol === "docente") {
            this.usuario = ''; // Limpiar el campo de usuario
            this.clave = ''; // Limpiar el campo de clave
            this.router.navigate(['/docente']); // Redirigir al usuario docente si el login es exitoso
          }
          else if (usuarioCompleto && usuarioCompleto.rol === "alumno") {
            this.usuario = ''; // Limpiar el campo de usuario
            this.clave = ''; // Limpiar el campo de clave
            this.router.navigate(['/alumno']); // Redirigir al usuario docente si el login es exitoso
          }

        } else {
          this.loginFailed = true; // Mostrar mensaje de error si el login falla
        }

      });

    });
  }

}