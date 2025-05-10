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
  urlApiTransitos = "https://uat-puerto.proyectos-2daw.es/app/controller/transitosController.php";
  //urlApi = "http://localhost:8080/server/app/controller/tripulantesController.php";
  //URL pruebas
  urlApiTripulantes = "https://uat-puerto.proyectos-2daw.es/app/controller/tripulantesController.php";
  //URL producción
  //urlApi = "https://puerto.proyectos-2daw.es/app/controller/tripulantesController.php";


  

  httpOptions = {
    headers: new HttpHeaders()
  }

  constructor(private http: HttpClient) { }
  //Inicio Sección Tránsitos-----------------------------------------------------

  getAllTransitos(): Observable<any> {
    //console.log("entrando a getAllTransitos");
    return this.http.get(`${this.urlApiTransitos}/transitos`).pipe(
      tap(response => console.log("Respuesta del servidor:", response))
    )
  }

  getTransito(idtransito: number): Observable<any> {
    // console.log("entrando a getTransito");
    return this.http.get(`${this.urlApiTransitos}/transito/${idtransito}`).pipe(
      tap(response => console.log("respuesta servidor:", response))
    )
  }

  desecharTransito(embarcacion: number): Observable<any> {
    // console.log("entrando en desecharTransito");
    const URLDELETE = this.urlApiTransitos + "?embarcacion=" + embarcacion;
    return this.http.delete(`${URLDELETE}`).pipe(
      tap(response => console.log("Respuesta del servidor:", response))
    );
  }

  nuevoTransito(transito: Transito): Observable<any> {
    // console.log("entrando en nuevoTransito");
    // console.log(JSON.stringify(transito));
    return this.http.post<any>(this.urlApiTransitos, JSON.stringify(transito), this.httpOptions).pipe(
      tap(response => console.log("Respuesta del servidor:", response))
    );
  }

  updateTransito(transito: Transito) {
    // console.log("entrando a updateTransito");
    const updateURL = this.urlApiTransitos + "?embarcacion=" + transito.embarcacion;
    return this.http.put<any>(updateURL, JSON.stringify(transito)).pipe(
      tap(response => console.log("Respuesta del servidor: ", response)
    )
    );
  }


  // Inicio Sección tripulantes ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getAllPaises(): Observable<any> {
    return this.http.get(`${this.urlApiTripulantes}/paises`);
  }
  
  getAllTripulantesEmbarcacion(embarcacion: number): Observable<any> {
    return this.http.get(`${this.urlApiTripulantes}/tripulantesEmbarcacion/${embarcacion}`);
  }

  getAllTripulantes(): Observable<any> {
    return this.http.get(`${this.urlApiTripulantes}/tripulantes`);
  }

  getTripulante(numeroDocumento: string): Observable<any> {
    return this.http.get(`${this.urlApiTripulantes}/tripulante/${numeroDocumento}`);
  }

  insertNewTripulante(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlApiTripulantes}/insert`, data);
  }

  updateTripulante(numeroDocumento: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.urlApiTripulantes}/update/${numeroDocumento}`, data);
  }

  deleteTripulante(numeroDocumento: string): Observable<any> {
    return this.http.delete(`${this.urlApiTripulantes}/delete/${numeroDocumento}`);
  }

  // Fin Sección tripulantes ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}
