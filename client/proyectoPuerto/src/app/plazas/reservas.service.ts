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

  // Obtener todas las reservas
  obtengoReservasApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/reservas");
  }

  // Obtener todas las provincias
  obtengoProvinciasApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/provincia");
  }

  // Obtener provincia por id
  obtengoProvinciaApi(nCcaa:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/provincia/"+nCcaa);
  }

  // Obtener todos los municipios
  obtengoMunicipiosApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/municipio");
  }

  // Obtener municipio por id
  obtengoMunicipiosProvinciaApi(nMunicipio:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/municipio/"+nMunicipio);
  }

  // Obtener titular
  obtengoTitularesApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/titular");
  }

  // Obtener titular por id
  obtengoTitularApi(nTitular:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/titular/"+nTitular);
  }

  // Obtener embarcaciones
  obtengoEmbarcacionesApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/embarcacion");
  }

  // Obtener embarcacion por id
  obtengoEmbarcacionApi(nEmbarcacion:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/embarcacion/"+nEmbarcacion);
  }

  // Obtener embarcacion por id
  obtengoEmbarcacionTitularApi(nEmbarcacion:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/embarcacionTitular/"+nEmbarcacion);
  }

  // Guardar una nueva reserva
  guardaNuevaReservaApi(reserva: Reserva): Observable<any> {
    return this.http.post<any>(this.apiUrl, JSON.stringify(reserva), this.httpOptions);
  }

  // Obtener una reserva por ID
  obtengoReservaApi(nreserva: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reservas/${nreserva}`);
  }
  
  // Modificar una reserva existente
  modificaReservaApi(nreserva: number, reserva: Reserva): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${nreserva}`, JSON.stringify(reserva), this.httpOptions);
  }
  

  // Borrar una reserva
  borraReservaApi(nreserva: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${nreserva}`, this.httpOptions);
  }
  
}

