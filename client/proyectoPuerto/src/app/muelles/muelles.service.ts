import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Muelle } from './muelle';

@Injectable({
  providedIn: 'root'
})
export class MuellesService {
  ///url prueba
  urlApi = "https://uat-puerto.proyectos-2daw.es/app/controller/controllerMuelles.php";
  
  //url local
  //urlApi = "http://localhost:8080/ProyectoIntermodularPuerto/server/app/controller/controllerMuelles.php";

  constructor(private http: HttpClient) { } // Inicializo el servicio con el HttpClient

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8'
    })
  }
  obtengoMuellesApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`); // Obtengo todos los roles
  }
  obtengoMuelleApi(idMuelle: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${idMuelle}`); // Obtengo un muelle por su id
  }
  actualizarMuelleApi(idMuelle: number,muelle: Muelle): Observable<any> {
    return this.http.put<any>(`${this.urlApi}/${idMuelle}`, JSON.stringify(muelle), this.httpOptions);
  }

  agregarMuelleApi(muelle: Muelle): Observable<any> {
    return this.http.post<any>(this.urlApi, JSON.stringify(muelle), this.httpOptions);
  }
  eliminarMuelleApi(idMuelle: number): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}/${idMuelle}`);
  }
}
