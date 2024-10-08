// header.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service'; // Ajusta la ruta si es necesario
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
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
}
