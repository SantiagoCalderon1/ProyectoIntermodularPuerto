import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from './facturas';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
//url local
private apiUrl = 'http://localhost:8888/app/controller/facturasController.php';
apiUrlRecibo = "https://uat-puerto.proyectos-2daw.es/app/controller/reciboController.php";
    
//apiUrl = "https://uat-puerto.proyectos-2daw.es/app/controller/facturasController.php";
//apiUrlRecibo = "https://uat-puerto.proyectos-2daw.es/app/controller/reciboController.php";


httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

constructor(private http: HttpClient) { }

// Obtener todas las facturas
obtengoFacturasApi(): Observable<any> {
  return this.http.get<any>(this.apiUrl+'/facturas');
}

// Obtener una factura por su numero de factura
obtengoFacturaApi(nfactura: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/facturas/${nfactura}`); // La API obtiene el ID desde la URL
}
// Obtener todos los clientes
obtengoClientesApi(): Observable<any> {
  return this.http.get<any>(this.apiUrl+'/clientes');
}

// Obtener un cliente por su nif
obtengoClienteApi(nifcliente: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/clientes/${nifcliente}`); // La API obtiene el ID desde la URL
}
// Obtener todas las reservas
obtengoReservasApi(): Observable<any> {
  return this.http.get<any>(this.apiUrl+'/reservas');
}

// Obtener una reserva por su id
obtengoReservaApi(id_reserva: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/reservas/${id_reserva}`); // La API obtiene el ID desde la URL
}

// Guardar una nueva factura
guardaNuevaFacturaApi(factura: Factura): Observable<any> {
  return this.http.post<any>(this.apiUrl, JSON.stringify(factura), this.httpOptions);
}

// Modificar una factura existente
modificaFacturaApi(nfactura: string, factura: Factura): Observable<any> {
  const facturaConId = { ...factura, num_factura: nfactura };

  return this.http.put<any>(this.apiUrl, JSON.stringify(facturaConId), this.httpOptions);
}

// Borrar una factura
borraFacturaApi(nfactura: string): Observable<any> {
  const body = JSON.stringify({ id: nfactura }); // La API espera el ID dentro del cuerpo JSON
  return this.http.request<any>('DELETE', this.apiUrl, { body, ...this.httpOptions });
}

// Generar un recibo
generaReciboApi(num_reserva: string, dataToday:string): Observable<any> {
  const body = JSON.stringify({ 'n_factura':num_reserva, 'fecha':dataToday });
  return this.http.post<any>(this.apiUrlRecibo, body, this.httpOptions);
}

// Obtener todos los recibos
}
