import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { WebService } from './web.service';
import { Usuario } from '../models/bd.models';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private alertController: AlertController) { }

  //para mostrar el estado del login
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private usuarioSubject = new BehaviorSubject<string>('');
  usuario$ = this.usuarioSubject.asObservable();

  private usuarioCompletoSubject = new BehaviorSubject<Usuario | null>(null);
  usuarioCompleto$ = this.usuarioCompletoSubject.asObservable();

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();

  webservice = inject(WebService);

  async buscarBD4(usuario: string, clave: string) {
    const url = 'https://66f75722b5d85f31a342801a.mockapi.io/api/v1/';
    const res = await this.webservice.request('GET', url, 'usuarios') as Array<Usuario>;

    const user = res.find(u => u.usuario === usuario && u.clave === clave);
    if (user) {
      this.isAuthenticatedSubject.next(true);
      this.usuarioSubject.next(user.nombreCompleto);
      this.usuarioCompletoSubject.next(user);
      this.loginFailedSubject.next(false);
    } else {
      this.isAuthenticatedSubject.next(false);
      this.loginFailedSubject.next(true);
    }
  }



  async registrarUsuario(nuevoUsuario: Usuario): Promise<boolean> {
    const url = 'https://66f75722b5d85f31a342801a.mockapi.io/api/v1/';

    // Verificar si el usuario ya existe
    const usuarios = await this.webservice.request('GET', url, 'usuarios') as Array<Usuario>;
    const usuarioExistente = usuarios.find(u => u.usuario === nuevoUsuario.usuario || u.email === nuevoUsuario.email);

    if (usuarioExistente) {
      await this.mostrarAlerta('Error', 'El usuario o email ya existe en el sistema.');
      return false;
    }

    // Si no existe, proceder con el registro
    try {
      const resultado = await this.webservice.request('POST', url, 'usuarios', nuevoUsuario);
      await this.mostrarAlerta('Éxito', 'Usuario registrado correctamente.');
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      await this.mostrarAlerta('Error', 'Hubo un problema al registrar el usuario. Por favor, intente nuevamente.');
      return false;
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  logout(): void {
    this.usuarioSubject.next('');
    this.usuarioCompletoSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.loginFailedSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated$;
  }

}
