import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plaza } from './plazas';

@Injectable({
  providedIn: 'root'
})
export class PlazasService {

  private apiUrl = 'http://localhost:8080/server/app/controller/plazasController.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  obtengoPlazasApi(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  guardaNuevaPlazaApi(plaza:Plaza): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, JSON.stringify(plaza), this.httpOptions);
  }
  obtengoPlazaApi(nplaza:number):Observable<any> {
    return this.http.get(`${this.apiUrl}/${nplaza}`);
  }
  modificaPlazaApi(nplaza:number, empleado:Plaza): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${nplaza}`, JSON.stringify(empleado), this.httpOptions);
  }
  borraPlazaApi(nplaza:number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${nplaza}`);
  }
}
