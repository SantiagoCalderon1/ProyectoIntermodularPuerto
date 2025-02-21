import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecibosService {
  ///url prueba
  urlApi = "https://uat-puerto.proyectos-2daw.es/app/controller/reciboController.php";
  
  //url local
  //urlApi = "http://localhost:8080/ProyectoIntermodularPuerto/server/app/controller/reciboController.php";

  constructor(private http: HttpClient) { } // Inicializo el servicio con el HttpClient

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }

  obtenerRecibosApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`); // Obtengo todos los recibos
  }
}
