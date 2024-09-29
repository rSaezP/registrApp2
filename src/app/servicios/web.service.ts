import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private apiUrl = 'https://66f96cccafc569e13a98bf3f.mockapi.io/api/v2/';

   // Inyectar HttpClient para hacer peticiones HTTP.  // Inyectar

  constructor(private httpClient: HttpClient) { }

  request(type: 'POST' | 'GET', url: string, path: string, body: any = {}){ // Crear una promesa para realizar la petición HTTP.  // Crear una pro
    return new Promise((resolve) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ${this.token}'
      }); // Agregar cabeceras personalizadas para la petición HTTP.  // A

      if (type == 'POST') {
        this.httpClient.post(url + '/' + path, body, {headers}).subscribe( data => { // Realizar la petición POST y resolver la promesa con el resultado.  // Real
          resolve(data); // Resuelve la promesa con el resultado.
          return;
        });
      }

      if (type == 'GET') {
        this.httpClient.get(url + '/' + path, {headers}).subscribe( data => {  // Realizar la petición GET y resolver la promesa con el resultado.  // Real
          resolve(data); // Resuelve la promesa con el resultado.
          return;
        });
      }
    });
  }
  getAsignaturaDetalles(nombreAsig: string) {
    return this.httpClient.get<any[]>(`${this.apiUrl}/asignaturas?nombreAsig=${nombreAsig}`);
  }

}
