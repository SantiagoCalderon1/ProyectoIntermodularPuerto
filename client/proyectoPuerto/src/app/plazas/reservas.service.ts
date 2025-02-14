import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from './plazas';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  // URL de la API
  private apiUrl = 'http://localhost:8080/server/app/controller/reservasController.php';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Obtener todas las reservas
  obtengoReservasApi(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reservas`);
  }

  // Obtener todos los titulares
  obtengoTitularesApi(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/titular`);
  }

  // Obtener titular por ID
  obtengoTitularApi(idTitular: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/titular/${idTitular}`);
  }

  // Obtener todas las embarcaciones
  obtengoEmbarcacionesApi(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/embarcacion`);
  }

  // Obtener embarcación por ID
  obtengoEmbarcacionApi(idEmbarcacion: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/embarcacion/${idEmbarcacion}`);
  }

  // Obtener embarcaciones de un titular
  obtengoEmbarcacionTitularApi(idTitular: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/embarcacionTitular/${idTitular}`);
  }

  // Guardar una nueva reserva
  guardaNuevaReservaApi(reserva: Reserva): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, JSON.stringify(reserva), this.httpOptions);
  }

  // Obtener una reserva por ID
  obtengoReservaApi(idReserva: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reservas/${idReserva}`);
  }
  
  // Modificar una reserva existente
  modificaReservaApi(idReserva: number, reserva: Reserva): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reservas/${idReserva}`, JSON.stringify(reserva), this.httpOptions);
  }

  // Borrar una reserva
  borraReservaApi(idReserva: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/reservas/${idReserva}`, this.httpOptions);
  }
}
