import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  //urlApi = "http://localhost:8080/server/app/controller/clientesController.php";
  //urlApi = "https://puerto.proyectos-2daw.es/app/controller/clientesController.php";
  urlApi = "https://uat-puerto.proyectos-2daw.es/app/controller/clientesController.php";


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getAllClientes(): Observable<any> {
    return this.http.get(`${this.urlApi}/clientes`);
  }

  getCliente(nif: string): Observable<any> {
    return this.http.get(`${this.urlApi}/cliente/${nif}`);
  }

  insertNewCliente(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/insert`, JSON.stringify(data), this.httpOptions);
  }

  updateCliente(nif: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.urlApi}/update/${nif}`, JSON.stringify(data), this.httpOptions);
  }

  deleteCliente(nif: string): Observable<any> {
    return this.http.delete(`${this.urlApi}/delete/${nif}`);
  }
}