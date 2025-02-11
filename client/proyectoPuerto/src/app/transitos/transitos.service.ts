import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransitosService {

  //URLs transitos





  // URLs tripulantes 
  // local
  urlApi = "http://localhost:8080/server/app/controller/tripulantesController.php";
  //URL pruebas
  //urlApi = "http://aut-puerto.proyectos-2daw.es/app/controller/tripulantesController.php";
  //URL producción
  //urlApi = "https://puerto.proyectos-2daw.es/app/controller/tripulantesController.php";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }







  

  // Inicio Sección tripulantes ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getAllTripulantes(): Observable<any> {
    return this.http.get(`${this.urlApi}/tripulantes`);
  }

  getTripulante(numeroDocumento: string): Observable<any> {
    return this.http.get(`${this.urlApi}/tripulante/${numeroDocumento}`);
  }

  insertNewTripulante(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/insert`, JSON.stringify(data), this.httpOptions);
  }

  updateTripulante(numeroDocumento: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.urlApi}/update/${numeroDocumento}`, JSON.stringify(data), this.httpOptions);
  }

  deleteTripulante(numeroDocumento: string): Observable<any> {
    return this.http.delete(`${this.urlApi}/delete/${numeroDocumento}`);
  }
  // Fin Sección tripulantes ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
