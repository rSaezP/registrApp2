import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from 'src/app/servicios/web.service'
import * as QRCode from 'qrcode';
@Component({
  selector: 'app-asig-docente',
  templateUrl: './asig-docente.component.html',
  styleUrls: ['./asig-docente.component.scss'],
})
export class AsigDocenteComponent  implements OnInit {
  asignatura: string = '';
  fecha: string = '';
  hora: string = '';
  sala: string = '';
  codigoQRVisible: boolean = false; // Controla la visibilidad del QR
  qrCodeDataUrl: string = '';


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

  generarQR() {
    const qrData = `Asignatura: ${this.asignatura}\nSala: ${this.sala}`;
    QRCode.toDataURL(qrData, (err, url) => {
      if (err) {
        console.error('Error al generar el código QR:', err);
        return;
      }
      this.qrCodeDataUrl = url;
      this.codigoQRVisible = true;
    });
  }

  cerrarQRCode() {
    this.codigoQRVisible = false;
  }



logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirigir al login después de cerrar sesión
  }
  volver() {
    this.router.navigate(['/docente']); // Redirigir a la pantalla de docente
  }
}
