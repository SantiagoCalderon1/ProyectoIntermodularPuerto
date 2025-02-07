import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from './rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  urlApi = 'http://localhost:8080/server/app/controller/controllerRoles.php';
  constructor(private http: HttpClient) { } // Inicializo el servicio con el HttpClient

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  obtengoRolesApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`); // Obtengo todos los roles
  }

  obtenerRolApi(idRol: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${idRol}`); // Obtengo un rol por su id
  }

  actualizarRolApi(id: number,rol: Rol): Observable<any> {
    return this.http.put<any>(`${this.urlApi}/${id}`, JSON.stringify(rol), this.httpOptions);
  }
}
