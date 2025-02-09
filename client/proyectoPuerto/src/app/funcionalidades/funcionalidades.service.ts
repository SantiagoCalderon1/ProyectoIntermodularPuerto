import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionalidadesService {
  //url local
  //urlApi = 'http://localhost:8080/server/app/controller/controllerFuncionalidades.php';
  urlApi = "http://uat-puerto.proyectos-2daw.es/app/controller/controllerFuncionalidades.php";

  constructor(private http: HttpClient) { } // Inicializo el servicio con el HttpClient

  obtengoFuncionalidadesApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`); // Obtengo todos las funcionalidades
  }
}
