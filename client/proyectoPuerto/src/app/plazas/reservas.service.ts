import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from './plazas';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  //url local
  private apiUrl = 'http://localhost:8080/server/app/controller/reservasController.php';
  
  //apiUrl = "https://puerto.proyectos-2daw.es/app/controller/reservasController.php";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Obtener todas las plazas
  obtengoReservasApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Guardar una nueva plaza
  guardaNuevaReservaApi(reserva: Reserva): Observable<any> {
    return this.http.post<any>(this.apiUrl, JSON.stringify(reserva), this.httpOptions);
  }

  // Obtener una plaza por ID
  obtengoReservaApi(nreserva: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${nreserva}`); // La API obtiene el ID desde la URL
  }

  // Modificar una plaza existente
  modificaReservaApi(nreserva: number, reserva: Reserva): Observable<any> {
    // Agregar el id dentro del objeto plaza, ya que la API lo requiere
    const plazaConId = { ...reserva, id: nreserva };
  
    return this.http.put<any>(this.apiUrl, JSON.stringify(plazaConId), this.httpOptions);
  }
  

  // Borrar una plaza
  borraReservaApi(nreserva: number): Observable<any> {
    const body = JSON.stringify({ id: nreserva }); // La API espera el ID dentro del cuerpo JSON
    return this.http.request<any>('DELETE', this.apiUrl, { body, ...this.httpOptions });
  }
}

