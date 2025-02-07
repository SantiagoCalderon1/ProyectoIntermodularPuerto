import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionalidadesService {
  urlApi = 'http://localhost:8080/ProyectoIntermodularPuerto/server/app/controller/controllerFuncionalidades.php';
  constructor(private http: HttpClient) { } // Inicializo el servicio con el HttpClient

  obtengoFuncionalidadesApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`); // Obtengo todos las funcionalidades
  }
}
