import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';  // Asegúrate de que la ruta sea correcta
import { Usuario } from 'src/app/models/bd.models'; // Importa el modelo de usuario
import { Router } from '@angular/router';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.scss'],
})
export class DocenteComponent implements OnInit {
  nombreDocente: string = '';
  email: string = '';
  telefono: string = '';
  rol: string = '';

  constructor(private authService: AuthService,  private router: Router) {}

  ngOnInit() {
    this.authService.usuarioCompleto$.subscribe((usuario: Usuario | null) => {
      if (usuario) {
        this.nombreDocente = usuario.nombreCompleto;
        this.email = usuario.email;
        this.telefono = usuario.telefono;
        this.rol = usuario.rol;
      }
    });
  }

  logout() {
    this.authService.logout(); 
    this.router.navigate(['/login']);// Llamamos al método de cerrar sesión del servicio de autenticación
  }

  irADetalle(asignatura: string) {
    this.router.navigate(['/detalle-asignatura-docente', { asignatura }]); // Navegación con el parámetro
  }
}

