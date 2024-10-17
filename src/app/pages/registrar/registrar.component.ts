import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { Usuario } from '../../models/bd.models';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent {
  @ViewChild('registroForm') registroForm!: NgForm;
  usuario: Usuario = {
    nombreCompleto: '',
    usuario: '',
    clave: '',
    telefono: '',
    email: '',
    rol: '',
    id: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async registrar() {
    if (this.validarFormulario()) {
      const registroExitoso = await this.authService.registrarUsuario(this.usuario);
      if (registroExitoso) {
        this.mostrarAlerta('Éxito', 'Usuario registrado correctamente');
        this.router.navigate(['/login']);
        this.limpiarFormulario();
      }

    }
    this.limpiarFormulario();
  }

  validarFormulario(): boolean {
    const camposRequeridos = ['nombreCompleto', 'usuario', 'clave', 'telefono', 'email', 'rol'];
    const camposVacios = camposRequeridos.filter(campo => !this.usuario[campo as keyof Usuario]);

    if (camposVacios.length > 0) {
      this.mostrarAlerta('Error', 'Todos los campos son obligatorios');
      return false;
    }

    if (!this.validarEmail(this.usuario.email)) {
      this.mostrarAlerta('Error', 'El correo electrónico no es válido');
      return false;
    }

    return true;
  }
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  handleBlur() {
    if (!this.usuario.rol) {
      // Si no se selecciona ningún rol, puedes realizar alguna acción, como mostrar un mensaje de error
      console.log('No se seleccionó ningún rol');
    }
  }
  volver() {
    this.limpiarFormulario();
    this.router.navigate(['/login']);
  }

  limpiarFormulario() {
    this.usuario = this.getUsuarioVacio();
    this.registroForm?.resetForm(this.usuario);
  }

  private getUsuarioVacio(): Usuario {
    return {
      nombreCompleto: '',
      usuario: '',
      clave: '',
      telefono: '',
      email: '',
      rol: '',
      id: ''
    };
  }

  validarEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
