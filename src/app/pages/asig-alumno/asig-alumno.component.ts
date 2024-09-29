import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from 'src/app/servicios/web.service'

@Component({
  selector: 'app-asig-alumno',
  templateUrl: './asig-alumno.component.html',
  styleUrls: ['./asig-alumno.component.scss'],
})
export class AsigAlumnoComponent  implements OnInit {
  asignatura: string = '';
  fecha: string = '';
  hora: string = '';
  sala: string = '';
  codigoQRVisible: boolean = false; // Controla la visibilidad del QR


  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private webService: WebService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.asignatura = params.get('asignatura') || 'Asignatura no definida'; // Obtener el valor del parámetro asignatura

      // Llamar al servicio para obtener los detalles de la asignatura
      this.webService.getAsignaturaDetalles(this.asignatura).subscribe(
        (data: any[]) => {
          const asignaturaDetalles = data[0]; // Asumiendo que sólo hay una asignatura con ese nombre
          if (asignaturaDetalles) {
            this.fecha = asignaturaDetalles.fecha;
            this.hora = asignaturaDetalles.hora;
            this.sala = asignaturaDetalles.sala;
          }
        },
        (error) => {
          console.error('Error al obtener los detalles de la asignatura', error);
        }
      );
    });
  }
  simularEscanearQR() {
    console.log(' Código QR generado.');
    this.codigoQRVisible = true;
    // Aquí podrías mostrar una alerta o algo visual si lo deseas
  }
  simularGenerarQR() {
    this.codigoQRVisible = true; // Muestra la imagen del QR
  }
   cerrarQRCode() {
    this.codigoQRVisible = false; // Oculta el QR al cerrar
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirigir al login después de cerrar sesión
  }
  volver() {
    this.router.navigate(['/alumno']); // Redirigir a la pantalla de docente
  }

}
