
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recibo } from './recibo';

@Injectable({
  providedIn: 'root'
})
export class RecibosService {
  urlApi1 = "https://puerto.proyectos-2daw.es/app/controller/reciboController.php";
  
  //url local get todos
  //urlApi1 = "http://localhost:8080/PROYECTO_PUERTO/ProyectoIntermodularPuerto/server/app/controller/reciboController.php";

  constructor(private http: HttpClient) { } // Inicializo el servicio con el HttpClient

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }

  obtenerRecibosApi(): Observable<any> {
    return this.http.get(`${this.urlApi1}?opcion=1`); // Obtengo todos los recibos
  }

  actualizarReciboApi(idRecibo: number,recibo: Recibo): Observable<any> {
    return this.http.put<any>(`${this.urlApi1}/${idRecibo}`, JSON.stringify(recibo), this.httpOptions);
  }
}
