import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Transito } from './components/Transito';

@Injectable({
  providedIn: 'root'
})
export class TransitosService {

  //URLs transitos
  // URLs tripulantes 
  // local
  //urlApi = "http://localhost:8080/ProyectoIntermodularPuerto/server/app/controller/transitosController.php";
  //URL pruebas
  //urlApi = "http://aut-puerto.proyectos-2daw.es/app/controller/transitosController.php";
  //urlApi = "http://localhost:8080/server/app/controller/tripulantesController.php";
  //URL pruebas
  urlApi = "https://uat-puerto.proyectos-2daw.es/app/controller/tripulantesController.php";
  //URL producción
  //urlApi = "https://puerto.proyectos-2daw.es/app/controller/tripulantesController.php";


  httpOptions = {
    headers: new HttpHeaders()
  }

  constructor(private http: HttpClient) { }
  //Inicio Sección Tránsitos-----------------------------------------------------

  getAllTransitos(): Observable<any> {
    console.log("entrando a getAllTransitos");
    return this.http.get(`${this.urlApi}/transitos`).pipe(
      tap(response => console.log("Respuesta del servidor:", response))
    )
  }

  getTransito(idtransito: number): Observable<any> {
    console.log("entrando a getTransito");
    return this.http.get(`${this.urlApi}/transito/${idtransito}`).pipe(
      tap(response => console.log("respuesta servidor:", response))
    )
  }

  desecharTransito(embarcacion: number): Observable<any> {
    console.log("entrando en desecharTransito");
    const URLDELETE = this.urlApi + "?embarcacion=" + embarcacion;
    return this.http.delete(`${URLDELETE}`).pipe(
      tap(response => console.log("Respuesta del servidor:", response))
    );
  }

  nuevoTransito(transito: Transito): Observable<any> {
    console.log("entrando en nuevoTransito");
    console.log(JSON.stringify(transito));
    return this.http.post<any>(this.urlApi, JSON.stringify(transito), this.httpOptions).pipe(
      tap(response => console.log("Respuesta del servidor:", response))
    );
  }

  updateTransito(transito: Transito) {
    console.log("entrando a updateTransito");
    const updateURL = this.urlApi + "?embarcacion=" + transito.embarcacion;
    return this.http.put<any>(updateURL, JSON.stringify(transito)).pipe(
      tap(response => console.log("Respuesta del servidor: ", response))
    );
  }


  // Inicio Sección tripulantes ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getAllTripulantes(embarcacion: number): Observable<any> {
    return this.http.get(`${this.urlApi}/tripulantes/${embarcacion}`);
  }

  getTripulante(numeroDocumento: string): Observable<any> {
    return this.http.get(`${this.urlApi}/tripulante/${numeroDocumento}`);
  }

  insertNewTripulante(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/insert`, data);
  }

  updateTripulante(numeroDocumento: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/update/${numeroDocumento}`, data);
  }

  deleteTripulante(numeroDocumento: string): Observable<any> {
    return this.http.delete(`${this.urlApi}/delete/${numeroDocumento}`);
  }

  // Fin Sección tripulantes ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
