// header.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service'; // Ajusta la ruta si es necesario
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isAuthenticated: boolean = false;
  rol: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
    });
    
    this.authService.usuarioCompleto$.subscribe(usuario => {
      this.rol = usuario?.rol || null;
    });
  }
  navigateToInicio() {
    if (this.rol === 'docente') {
      this.router.navigate(['/docente']); // Cambia esto por la ruta de inicio para docentes
    } else if (this.rol === 'alumno') {
      this.router.navigate(['/alumno']); // Cambia esto por la ruta de inicio para alumnos
    }
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirigir a la página de login
  }
}
