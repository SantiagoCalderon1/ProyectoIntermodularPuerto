import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstalacionService {
  private urlApi = "http://localhost:8080/ProyectoIntermodularPuerto/ProyectoIntermodularPuerto/server/app/controller/instalacionController.php";

  constructor(private http: HttpClient) {}

  crearInstalacion(instalacion: any): Observable<any> {
    console.log("entrando en creaInstalacion");
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.urlApi, instalacion, { headers }).pipe(
      // visualizar respuesta por consola
      tap(response => console.log("Respuesta del servidor:", response))
    );
  }
}
