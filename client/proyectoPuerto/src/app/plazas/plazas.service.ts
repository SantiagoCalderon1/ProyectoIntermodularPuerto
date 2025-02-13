import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plaza } from './plazas';

@Injectable({
  providedIn: 'root'
})
export class PlazasService {
  //url local
  private apiUrl = 'http://localhost/ProyectoIntermodularPuerto/server/app/controller/plazasController.php';
  
  //apiUrl = "https://puerto.proyectos-2daw.es/app/controller/plazasController.php";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Obtener todas las plazas
  obtengoPlazasApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  // Obtener todas las plazas
  obtengoInstalacionesApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/inst");
  }

  // Guardar una nueva plaza
  guardaNuevaPlazaApi(plaza: Plaza): Observable<any> {
    return this.http.post<any>(this.apiUrl, JSON.stringify(plaza), this.httpOptions);
  }

  // Obtener una plaza por ID
  obtengoPlazaApi(nplaza: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${nplaza}`); // La API obtiene el ID desde la URL
  }

  // Modificar una plaza existente
  modificaPlazaApi(nplaza: number, plaza: Plaza): Observable<any> {
    // Agregar el id dentro del objeto plaza, ya que la API lo requiere
    const plazaConId = { ...plaza, id: nplaza };
  
    return this.http.put<any>(this.apiUrl, JSON.stringify(plazaConId), this.httpOptions);
  }
  

  // Borrar una plaza
  borraPlazaApi(nplaza: number): Observable<any> {
    const body = JSON.stringify({ id: nplaza }); // La API espera el ID dentro del cuerpo JSON
    return this.http.request<any>('DELETE', this.apiUrl, { body, ...this.httpOptions });
  }
}
