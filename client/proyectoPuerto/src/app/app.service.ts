import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private rolSubject = new BehaviorSubject<number | null>(null);
  private rutaSubject = new BehaviorSubject<any | null>(null);

  rol$ = this.rolSubject.asObservable();
  ruta$ = this.rutaSubject.asObservable();
  ApiRuta = 'http://localhost:8080/ProyectoIntermodularPuerto/server/app/controller/controllerRutas.php';
  //ruta:any = '';

  constructor(private http: HttpClient) {
    this.loadRol();
  }

  loadRol() {
    const storedRol = localStorage.getItem('token');
    const rol = storedRol ? parseInt(storedRol, 10) : null;
    this.rolSubject.next(rol);
  }

  // cargaRuta(ubi: string) {
  //   console.log('Llamando a la API con ubi:', ubi); // <-- Verifica que se ejecuta
  //   this.http.get(`${this.Api}/${ubi}`).subscribe({
  //     next: (resultado) => {
  //       console.log('Respuesta de la API:', resultado);
  //       this.rutaSubject.next(resultado);
  //     },
  //     error: (error) => {
  //       console.error('Error al obtener la ruta:', error);
  //     }
  //   });
  // }


  setRol(rol: number) {
    localStorage.setItem('token', rol.toString());
    this.rolSubject.next(rol);
  }

  logout() {
    localStorage.removeItem('token');
    this.rolSubject.next(null);
  }
}
