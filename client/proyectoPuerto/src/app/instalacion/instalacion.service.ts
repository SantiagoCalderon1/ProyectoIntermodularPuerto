import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstalacionService {

  //private urlApi = "http://localhost/ProyectoIntermodularPuerto/server/app/controller/instalacionController.php";
  
  //url local
  //private urlApi = "http://localhost:8080/server/app/controller/instalacionController.php";
  
  urlApi = "http://uat-puerto.proyectos-2daw.es/app/controller/instalacionController.php";


  constructor(private http: HttpClient) { }

  crearInstalacion(instalacion: any): Observable<any> {
    console.log("entrando en creaInstalacion");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.urlApi, instalacion, { headers }).pipe(
      // visualizar respuesta por consola
      tap(response => console.log("Respuesta del servidor:", response))
    );
  }

  deshecharInstalacion(id: number): Observable<any> {
    console.log("entrando en deshecharInstalacion");
    const URLDelete = this.urlApi + "?id_instalacion=" + id;
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http.delete<any>(URLDelete).pipe(
      // visualizar respuesta por consola
      tap(response => console.log("Respuesta del servidor:", response))
    );
  }

  getInstalaciones(): Observable<any> {
    console.log("entrando en getInstalaciones");
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http.get<any>(this.urlApi).pipe(
      tap(response => console.log("Respuesta del servidor:", response))
    )
  }

  getInstalacion(idInstalacion: number): Observable<any> {
    const URLIdModificar = this.urlApi + "?id_instalacion=" + idInstalacion;
    return this.http.get<any>(URLIdModificar);
  }

  modifyInstalacion(instalacion: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<any>(this.urlApi, JSON.stringify(instalacion), { headers }).pipe(
      // visualizar respuesta por consola
      tap(response => console.log("Respuesta del servidor:", response))
    );
  }
}

