import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InstalacionService {
 urlApi = "../../../server/app/controller/instalacionController.php";
  constructor(private http: HttpClient) { }

  crearInstalacion(instalacion: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.urlApi, instalacion, { headers });
  }
}